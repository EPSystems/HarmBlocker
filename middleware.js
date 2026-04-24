// Edge Middleware — guards /success against direct / unpaid access.
//
// Runs on Vercel's Edge runtime BEFORE any static file is served.
// Only lets the request through if Stripe confirms the session is both
// complete and paid. Anything else is redirected to the pricing section.
//
// Fail-closed: missing env var, missing session_id, Stripe error,
// incomplete session, unpaid session — all redirect.

export const config = {
  matcher: '/success',
};

const REDIRECT_TARGET = '/#pricing';

function redirect(request) {
  return Response.redirect(new URL(REDIRECT_TARGET, request.url).toString(), 302);
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('session_id');

  // Basic shape check — real Stripe session IDs are 60+ chars and start with `cs_`.
  if (!sessionId || !/^cs_(test_|live_)?[A-Za-z0-9]{10,}$/.test(sessionId)) {
    return redirect(request);
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    // Without the secret key we cannot verify — refuse.
    return redirect(request);
  }

  try {
    const stripeRes = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        headers: { Authorization: `Bearer ${secretKey}` },
      },
    );

    if (!stripeRes.ok) {
      return redirect(request);
    }

    const session = await stripeRes.json();

    const isComplete = session.status === 'complete';
    const isPaid =
      session.payment_status === 'paid' ||
      session.payment_status === 'no_payment_required';
    const isSubscription = session.mode === 'subscription';

    if (!isComplete || !isPaid || !isSubscription) {
      return redirect(request);
    }

    // Valid — pass through to static success.html.
    return;
  } catch (_err) {
    return redirect(request);
  }
}

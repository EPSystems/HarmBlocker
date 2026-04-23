---
phase: 02-legal-floor
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - privacy.html
  - terms.html
  - index.html
  - success.html
  - styles.css
  - .planning/phases/02-legal-floor/COOKIE-DECISION.md
autonomous: true
requirements: [LEG-01, LEG-02, LEG-03, LEG-05, LEG-06]

must_haves:
  truths:
    - "A visitor clicking the footer 'Поверителност' link from index.html, success.html, privacy.html, or terms.html lands on a Bulgarian Privacy Policy page"
    - "A visitor clicking the footer 'Условия' link from any page lands on a Bulgarian Terms of Service page"
    - "The Terms of Service page contains an explicit, clearly-worded 14-day right-of-withdrawal clause citing Bulgarian ЗЗП / EU Directive 2011/83/EU"
    - "The footer on every page shows the entity name, contact email, and registered address via grep-able placeholders (__ENTITY_NAME__, __CONTACT_EMAIL__, __ENTITY_ADDRESS__)"
    - "A documented cookie-banner decision exists at .planning/phases/02-legal-floor/COOKIE-DECISION.md tying the no-banner choice to the Phase 6 cookieless analytics pick"
    - "Both legal pages visibly mark themselves as drafts requiring lawyer review (visible banner + HTML comment)"
  artifacts:
    - path: "privacy.html"
      provides: "Bulgarian GDPR Privacy Policy draft"
      contains: "ЧЕРНОВА — ИЗИСКВА ПРАВЕН ПРЕГЛЕД"
    - path: "terms.html"
      provides: "Bulgarian Terms of Service draft with 14-day withdrawal clause"
      contains: "14-дневно"
    - path: ".planning/phases/02-legal-floor/COOKIE-DECISION.md"
      provides: "Documented rationale for not shipping a cookie banner"
      contains: "cookieless"
    - path: "styles.css"
      provides: ".legal / .prose styles for long-form legal readability"
      contains: ".legal"
  key_links:
    - from: "index.html footer"
      to: "privacy.html and terms.html"
      via: "<a href=\"/privacy\"> and <a href=\"/terms\"> (cleanUrls resolves)"
      pattern: "href=\"/privacy\"|href=\"/terms\""
    - from: "success.html footer"
      to: "privacy.html and terms.html"
      via: "same footer links"
      pattern: "href=\"/privacy\"|href=\"/terms\""
    - from: "privacy.html and terms.html footers"
      to: "each other + back to home"
      via: "consistent footer block"
      pattern: "href=\"/privacy\"|href=\"/terms\""
    - from: "terms.html body"
      to: "privacy.html"
      via: "inline link in data-protection section"
      pattern: "href=\"/privacy\""
---

<objective>
Ship the legal surface area required to charge Bulgarian consumers: a GDPR-compliant Privacy Policy and a Terms of Service with an explicit 14-day right-of-withdrawal clause, both in Bulgarian, both marked as drafts requiring lawyer review; a consistent footer carrying entity placeholders on all four pages; and a single-page cookie-banner decision doc tied to Phase 6's cookieless analytics commitment.

Purpose: Without this, Phase 4 (Checkout live) cannot legitimately go live — EU consumer-protection and GDPR compliance require the legal floor before real money changes hands. Addresses LEG-01, LEG-02, LEG-03, LEG-05, LEG-06.

Output:
- privacy.html (new) — Bulgarian GDPR privacy policy draft
- terms.html (new) — Bulgarian ToS draft with 14-day withdrawal clause
- index.html, success.html (edited) — updated footer with entity placeholders and legal links
- styles.css (edited) — small .legal / .prose block for long-form body readability
- .planning/phases/02-legal-floor/COOKIE-DECISION.md (new) — one-pager documenting no-banner decision
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/02-legal-floor/02-CONTEXT.md
@CLAUDE.md
@index.html
@success.html
@styles.css

<interfaces>
<!-- Design tokens available in styles.css — reuse, do not invent new ones. -->

Color tokens:
  --paper, --paper-soft, --paper-deep
  --ink, --ink-soft, --ink-muted, --ink-faint
  --hairline, --hairline-strong, --hairline-faint
  --amber, --amber-deep, --amber-soft, --amber-faint

Spacing: --space-1 (4px) … --space-10 (144px)
Radii:   --radius-xs (4px), --radius-sm (6px), --radius-md (10px), --radius-lg (14px)
Type:    --font-display (Instrument Serif), --font-sans (Inter)
Widths:  --max-w (1120px), --max-w-prose (640px)

Existing component classes usable on legal pages:
  .container, .section, .section--tight, .section--surface
  .eyebrow, .eyebrow--centered
  .h1, .h2, .h3, .lead, .serif-italic, .muted
  .nav, .nav__inner, .brand, .brand__mark, .brand__word
  .footer, .footer__inner, .footer__links
  .reveal (animated in by script.js IntersectionObserver)

Footer markup (current — both index.html and success.html, lines 339-348 / 183-192):
  <footer class="footer">
    <div class="container footer__inner">
      <div>© <span id="year">2026</span> HarmBlocker — По-тих интернет за всеки.</div>
      <nav class="footer__links" aria-label="Долен колонтитул">
        <a href="#">Поверителност</a>
        <a href="#">Поддръжка</a>
      </nav>
    </div>
  </footer>

Nav markup variants:
  index.html (lines 24-45): has #pricing CTA button on the right
  success.html (lines 24-37): no CTA, simpler — brand only

Head block pattern (reuse verbatim for privacy.html and terms.html):
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>…</title>
  <meta name="description" content="…" />
  <meta name="theme-color" content="#f6f1e8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />

Placeholders (grep-able, must be exact):
  __ENTITY_NAME__     — company/legal entity name
  __ENTITY_ADDRESS__  — registered address
  __CONTACT_EMAIL__   — data-controller / contact email
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Draft privacy.html — Bulgarian GDPR Privacy Policy</name>
  <files>privacy.html, styles.css</files>
  <read_first>
    - index.html (for nav + footer HTML pattern and head block)
    - success.html (for simpler nav variant — use the success.html nav, not the index.html one, since a legal page has no "Започнете" CTA in the top bar)
    - styles.css (to confirm tokens and component classes; the new .legal block goes at the very end of the file, after the focus-visible block)
    - .planning/phases/02-legal-floor/02-CONTEXT.md (content requirements for the policy)
  </read_first>
  <action>
    Create `privacy.html` at the repo root. The file must be a standalone static HTML page matching the other two pages byte-for-byte in framing (head block, Google Fonts, styles.css, body structure, script.js at the end).

    Structure top-to-bottom:

    1. Standard doctype + `<html lang="bg">` + head block (copy verbatim from success.html head, change title to `Политика за поверителност — HarmBlocker` and description to a one-sentence Bulgarian summary).

    2. **Directly after `<body>`:** Insert the HTML comment `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` — this is mandatory and grep-able (see quality_gate).

    3. Nav: copy verbatim from `success.html` lines 24-37 (the brand-only variant, no CTA). The brand link's `href` should be `index.html` so users can return home.

    4. Main content wrapped in `<main>` with a single `<section class="section">` containing a `<div class="container">`.

    5. **Draft banner** — top of the `<main>`, above the article. Use a new lightweight class `.legal-banner` (add it to styles.css in this same task). Markup:
       ```html
       <aside class="legal-banner" role="note">
         <span class="legal-banner__label"><span class="serif-italic">Чернова.</span></span>
         <p>Този текст е работна чернова и <strong>изисква правен преглед от български адвокат</strong> преди публикуване. До тогава го третирайте като ориентир, не като обвързващ документ.</p>
       </aside>
       ```
       Style in styles.css (new block at file end, labelled `/* ---------- Legal pages ---------- */`):
       - background: var(--paper-soft)
       - border: 1px solid var(--hairline)
       - border-left: 2px solid var(--amber)
       - padding: var(--space-5) var(--space-6)
       - border-radius: var(--radius-sm)
       - max-width: var(--max-w-prose)
       - margin: 0 auto var(--space-7)
       - `.legal-banner__label` — Instrument Serif italic, amber, block display, letter-spacing 0
       - `.legal-banner p` — font-size 0.9375rem, color var(--ink-soft), margin-top var(--space-2)
       - `.legal-banner strong` — font-weight 500 (Inter), color var(--ink)
       No shadow, no tinted-red warning color. Restrained, on-brand.

    6. **Article header** (below the banner):
       - `<span class="eyebrow eyebrow--centered">Поверителност</span>` — but NOT centered since this is a prose page. Use just `.eyebrow` without the centered modifier so it aligns with the prose column. Wrap the eyebrow + h1 in a `<header class="legal__head">` for styling.
       - `<h1 class="h1 legal__title">Политика за <span class="serif-italic">поверителност.</span></h1>`
       - A `<p class="lead">` with one sentence: "Последна актуализация: 2026-04-23. Този документ описва как __ENTITY_NAME__ обработва личните данни на посетителите на този сайт."

    7. **Body** — wrap in `<article class="legal prose">`. Add the `.legal` and `.prose` styles to styles.css in this task:
       ```
       .legal { max-width: var(--max-w-prose); margin-inline: auto; }
       .legal__head { margin-bottom: var(--space-8); }
       .legal__head .eyebrow { margin-bottom: var(--space-5); }
       .legal__title { margin-bottom: var(--space-5); max-width: 16ch; }
       .prose h2 { font-family: var(--font-display); font-size: clamp(1.5rem, 2.4vw, 2rem); line-height: 1.15; font-weight: 400; margin-top: var(--space-8); margin-bottom: var(--space-4); color: var(--ink); }
       .prose h3 { font-family: var(--font-sans); font-size: 1.0625rem; font-weight: 600; margin-top: var(--space-6); margin-bottom: var(--space-3); color: var(--ink); }
       .prose p { color: var(--ink-soft); line-height: 1.75; margin-bottom: var(--space-4); }
       .prose ul { display: grid; gap: var(--space-3); margin-bottom: var(--space-5); padding-left: var(--space-5); }
       .prose ul li { color: var(--ink-soft); line-height: 1.7; list-style: disc; }
       .prose ul li::marker { color: var(--amber); }
       .prose a { color: var(--ink); border-bottom: 1px solid var(--amber); text-decoration: none; padding-bottom: 1px; transition: color 0.2s ease; }
       .prose a:hover { color: var(--amber-deep); }
       .prose strong { font-weight: 500; color: var(--ink); }
       .prose hr { border: 0; border-top: 1px solid var(--hairline); margin-block: var(--space-7); }
       .prose blockquote { border-left: 1px solid var(--amber); padding-left: var(--space-5); color: var(--ink-soft); font-family: var(--font-display); font-style: italic; font-size: 1.125rem; line-height: 1.6; margin: var(--space-5) 0; }
       ```
       Keep these additions tight — no rewriting of the existing design system.

    8. **Content sections** (all Bulgarian, tone: тих, plainspoken, never alarmist; match brand voice in CLAUDE.md). Use `<h2>` for section headings and `<h3>` for subsections. Required sections in order:

       a. **Кой управлява този сайт** — Identifies `__ENTITY_NAME__` (адрес: `__ENTITY_ADDRESS__`, имейл: `__CONTACT_EMAIL__`) as the data controller per GDPR Art. 4(7). One paragraph, calm.

       b. **Какви данни събираме** — State plainly: today, no personal data is collected by the site itself. If the user buys, Stripe receives payment data directly per Stripe's own policy. If the user books a support call on success.html, Cal.com receives the booking data per Cal.com's own policy. Google Fonts loads from Google's CDN and Google may see the IP address of the request. Phase 6 (future) adds cookieless analytics that does not collect personal identifiers — this policy will be updated when that ships.

       c. **Бисквитки (cookies)** — State plainly: the site itself sets no cookies. Stripe and Cal.com may set cookies when you interact with their widgets, under their own policies. No cookie banner is shown because no consent-requiring tracker runs on the site.

       d. **Трети страни (обработващи)** — A short bulleted list:
          - **Google Fonts** — доставя шрифтовете Inter и Instrument Serif; при зареждане на страницата IP адресът ви се предава на Google.
          - **Stripe** — обработва плащанията, ако натиснете бутон за абонамент; към Stripe се предават платежните данни, които въвеждате в техния checkout.
          - **Cal.com** — показва график за резервация на страницата след покупка; към Cal.com се предават данните, които въвеждате в техния embed.
          Each item: one line, plainspoken, no marketing euphemism.

       e. **Вашите права по GDPR** — A bulleted list of the six rights: достъп (Art. 15), корекция (Art. 16), изтриване (Art. 17), ограничаване (Art. 18), преносимост (Art. 20), възражение (Art. 21). One short sentence each, in Bulgarian, plain.

       f. **Как да упражните правата си** — One paragraph: write to `__CONTACT_EMAIL__`; response within 30 days per GDPR Art. 12(3). Mention the right to file a complaint with the Bulgarian Commission for Personal Data Protection (Комисия за защита на личните данни — КЗЛД, kzld.bg).

       g. **Промени в политиката** — One paragraph: when this document changes, the "Последна актуализация" date at the top updates; material changes will be noted.

       h. **Контакт** — One paragraph reiterating `__CONTACT_EMAIL__` and `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`.

    9. **Footer** — reuse the new consolidated footer from Task 3 (see Task 3 for exact markup). Since Task 3 updates the footer in a later step, for this task you may stub the footer as the OLD footer temporarily, OR you can jump ahead and use the new consolidated footer. **Preferred: write the NEW consolidated footer directly** (it's documented in Task 3's action; coordinate with it) so there's no follow-up churn.

    10. `<script src="script.js" defer></script>` at the end of body (enables `.reveal` on any revealed elements and sticky-nav shadow).

    **Voice rules (from CLAUDE.md):**
    - All Bulgarian. No English leak except brand name "HarmBlocker".
    - Тих, plainspoken. No legalese you wouldn't use when talking to a friend. No "ние, HarmBlocker, сме изцяло отдадени на вашата поверителност" — that's SaaS-speak.
    - No shaming, no alarmist language, no fear-mongering about data. State what's true, calmly.
    - Use the serif-italic fragment device **once** in the h1 only. Do not scatter italics through body text.
    - No emoji. No tinted warning boxes. The `.legal-banner` is the only chrome allowed beyond prose + hairlines.
  </action>
  <acceptance_criteria>
    - `privacy.html` exists at repo root
    - `grep -q "LAWYER REVIEW REQUIRED BEFORE LAUNCH" privacy.html` passes
    - `grep -q "ЧЕРНОВА" privacy.html` OR `grep -q "Чернова" privacy.html` passes (the visible banner)
    - `grep -q "__ENTITY_NAME__" privacy.html` passes
    - `grep -q "__ENTITY_ADDRESS__" privacy.html` passes
    - `grep -q "__CONTACT_EMAIL__" privacy.html` passes
    - `grep -q "GDPR" privacy.html` passes
    - `grep -q "Google Fonts" privacy.html` passes
    - `grep -q "Stripe" privacy.html` passes
    - `grep -q "Cal.com" privacy.html` passes
    - `grep -q "styles.css" privacy.html` passes (stylesheet is linked)
    - `grep -q 'lang="bg"' privacy.html` passes
    - `grep -q ".legal" styles.css` passes (new legal block added)
    - `grep -q ".legal-banner" styles.css` passes
    - `grep -q ".prose" styles.css` passes
    - No new colors, fonts, or shadows introduced to styles.css (visual inspection)
    - No English body text in privacy.html except proper nouns (Stripe, Cal.com, HarmBlocker, Google Fonts, Inter, Instrument Serif)
    - Opening the file in a browser renders with the paper background, sticky nav, grain overlay, and legible prose column
  </acceptance_criteria>
  <verify>
    <automated>cd D:/Claude/HarmBlocker &amp;&amp; grep -l "LAWYER REVIEW REQUIRED BEFORE LAUNCH" privacy.html &amp;&amp; grep -l "__ENTITY_NAME__" privacy.html &amp;&amp; grep -l "GDPR" privacy.html &amp;&amp; grep -l ".legal" styles.css &amp;&amp; grep -l ".legal-banner" styles.css &amp;&amp; grep -l ".prose" styles.css</automated>
  </verify>
  <done>
    privacy.html exists with the HTML comment lawyer-review warning, a visible "Чернова" banner, all three entity placeholders grep-ably present, the three third-party processors (Google Fonts, Stripe, Cal.com) named, GDPR rights enumerated, and the new .legal / .legal-banner / .prose blocks appended to styles.css without touching the existing design system. Satisfies LEG-01.
  </done>
</task>

<task type="auto">
  <name>Task 2: Draft terms.html — Bulgarian ToS with 14-day withdrawal clause</name>
  <files>terms.html</files>
  <read_first>
    - privacy.html (just created in Task 1 — reuse exact head/nav/banner/footer structure for consistency)
    - .planning/phases/02-legal-floor/02-CONTEXT.md (ToS content requirements — Article 7 ЗЗП / Directive 2011/83/EU)
    - styles.css (confirm .legal, .legal-banner, and .prose blocks are in place from Task 1)
  </read_first>
  <action>
    Create `terms.html` at the repo root. Byte-for-byte the same framing as privacy.html: same head block (title: `Общи условия — HarmBlocker`; description: one-sentence Bulgarian summary), same HTML comment `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` right after `<body>`, same simple brand-only nav, same `.legal-banner`, same `<article class="legal prose">` structure, same consolidated footer.

    **Article header:**
    - `<span class="eyebrow">Условия</span>`
    - `<h1 class="h1 legal__title">Общи <span class="serif-italic">условия.</span></h1>`
    - `<p class="lead">` with: "Последна актуализация: 2026-04-23. Тези условия уреждат ползването на услугата HarmBlocker, предоставяна от __ENTITY_NAME__."

    **Required sections** (all Bulgarian, тих voice, `<h2>` headings):

    1. **За услугата** — describe HarmBlocker plainly: 3€/месец абонамент, който блокира сайтове за възрастни и приложения за запознанства на устройствата в домакинството на клиента. Уточнете: клиентът сам конфигурира устройствата си по предоставения наръчник (DIY). Не изпращаме хардуер, не инсталираме софтуер от наша страна.

    2. **Кой предоставя услугата** — `__ENTITY_NAME__`, адрес `__ENTITY_ADDRESS__`, контакт `__CONTACT_EMAIL__`.

    3. **Цена и плащане** — 3€/месец, EUR, таксува се автоматично всеки месец чрез Stripe, докато абонаментът е активен. Цените са с включен ДДС, където е приложимо. Методи за плащане: карти, обработвани от Stripe.

    4. **Срок и прекратяване** — абонаментът тече от месечен цикъл до месечен цикъл; клиентът може да прекрати по всяко време от акаунта си в Stripe; при прекратяване достъпът се запазва до края на заплатения период.

    5. **Право на отказ в рамките на 14 дни** — **this is the critical clause**. Use the following structure verbatim (placeholders untouched):

       ```
       <h2>Право на отказ в рамките на 14 дни</h2>

       <p>Като потребител по смисъла на <strong>Закона за защита на потребителите (ЗЗП), чл. 50–57</strong>, и в съответствие с <strong>Директива 2011/83/ЕС</strong>, имате право да се откажете от този договор без да посочвате причина в срок от <strong>14 дни</strong> от сключването му.</p>

       <p>Срокът от 14 дни започва да тече от деня, в който е сключен договорът — тоест от деня на първото успешно плащане.</p>

       <h3>Как да упражните правото си</h3>

       <p>За да упражните правото на отказ, е достатъчно да ни изпратите ясно изявление преди изтичането на 14-дневния срок. Най-лесният начин е по имейл на <a href="mailto:__CONTACT_EMAIL__">__CONTACT_EMAIL__</a>. Можете да използвате следния образец (но не сте длъжни):</p>

       <blockquote>
         До __ENTITY_NAME__, __ENTITY_ADDRESS__ — с настоящото уведомявам, че се отказвам от сключения от мен договор за абонамент за услугата HarmBlocker. Поръчано на: [дата]. Име: [име]. Имейл, с който е регистриран абонаментът: [имейл].
       </blockquote>

       <h3>Последици от отказа</h3>

       <p>При упражняване на правото на отказ ще ви възстановим всички получени от вас плащания, без неоправдано забавяне и не по-късно от 14 дни от деня, в който сме получили изявлението ви. Възстановяването се извършва по същия платежен способ, използван за първоначалната транзакция, освен ако изрично не се съгласите за друг способ.</p>
       ```

       **Must-grep marker:** the string `14-дневно` OR `14 дни` must appear — the plan's verify uses `14-дневно` specifically. Add a phrase like "това е **14-дневно** право на отказ" somewhere in the clause so the literal token is findable.

    6. **Отговорност и ограничения** — услугата се предоставя "както е"; филтрирането по DNS не е абсолютно; клиентът носи отговорност за правилното конфигуриране на устройствата си; не носим отговорност за косвени или последващи вреди.

    7. **Защита на личните данни** — линк към privacy.html: "Обработваме личните ви данни в съответствие с нашата <a href=\"/privacy\">Политика за поверителност</a>."

    8. **Приложимо право и спорове** — български закон; спорове — компетентни български съдилища; потребителите имат право да се обръщат към Комисията за защита на потребителите (kzp.bg) и към платформата за онлайн решаване на спорове на ЕС (ec.europa.eu/consumers/odr).

    9. **Промени в условията** — датата "Последна актуализация" в началото отразява последната промяна; при съществени промени клиентите ще бъдат уведомени.

    10. **Контакт** — `__CONTACT_EMAIL__`, `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`.

    **Voice rules:** same as Task 1 — тих, plainspoken, one serif-italic fragment in the h1, no emoji, no shaming. Legal accuracy matters here (Чл. 50–57 ЗЗП, Directive 2011/83/EU) but the surrounding prose should still read like a person talking, not a template.

    **No styling changes** in this task — styles.css was already extended in Task 1. Only `terms.html` is created.
  </action>
  <acceptance_criteria>
    - `terms.html` exists at repo root
    - `grep -q "LAWYER REVIEW REQUIRED BEFORE LAUNCH" terms.html` passes
    - `grep -q "Чернова" terms.html` passes (visible draft banner)
    - `grep -q "14-дневно" terms.html` passes (literal token from plan spec)
    - `grep -q "14 дни" terms.html` passes
    - `grep -q "ЗЗП" terms.html` passes
    - `grep -q "2011/83" terms.html` passes (Directive reference)
    - `grep -q "__ENTITY_NAME__" terms.html` passes
    - `grep -q "__ENTITY_ADDRESS__" terms.html` passes
    - `grep -q "__CONTACT_EMAIL__" terms.html` passes
    - `grep -q 'href="/privacy"' terms.html` passes (link from ToS body to privacy policy)
    - `grep -q "Stripe" terms.html` passes (payment processor named)
    - `grep -q "Bulgarian law\\|български" terms.html` passes (governing law stated)
    - `grep -q 'lang="bg"' terms.html` passes
    - terms.html uses the same `.legal` / `.legal-banner` / `.prose` classes from Task 1 — no new CSS needed
  </acceptance_criteria>
  <verify>
    <automated>cd D:/Claude/HarmBlocker &amp;&amp; grep -l "LAWYER REVIEW REQUIRED BEFORE LAUNCH" terms.html &amp;&amp; grep -l "14-дневно" terms.html &amp;&amp; grep -l "ЗЗП" terms.html &amp;&amp; grep -l "2011/83" terms.html &amp;&amp; grep -l "__ENTITY_NAME__" terms.html &amp;&amp; grep -l 'href="/privacy"' terms.html</automated>
  </verify>
  <done>
    terms.html exists with the HTML comment lawyer warning, visible draft banner, explicit 14-day right-of-withdrawal clause citing ЗЗП чл. 50–57 and Directive 2011/83/EU, copyable email template in a blockquote, entity placeholders, link to /privacy, and consistent framing with privacy.html. Satisfies LEG-02 and LEG-03.
  </done>
</task>

<task type="auto">
  <name>Task 3: Update footers on all four pages with entity placeholders and legal links</name>
  <files>index.html, success.html, privacy.html, terms.html</files>
  <read_first>
    - index.html (current footer at lines 339-348)
    - success.html (current footer at lines 183-192)
    - privacy.html (just created in Task 1 — footer may already be in place from Task 1 guidance; verify)
    - terms.html (just created in Task 2 — same)
  </read_first>
  <action>
    Replace the footer block in `index.html` (lines 339-348) and `success.html` (lines 183-192) with a single consolidated footer that also goes into privacy.html and terms.html. All four footers must be byte-identical.

    **New footer markup (exact):**

    ```html
    <!-- ============ FOOTER ============ -->
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.25">
              <circle cx="14" cy="14" r="12.5" />
              <circle cx="14" cy="14" r="8.5" />
              <circle cx="14" cy="14" r="3" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <div class="footer__entity">
            <div class="footer__entity-name">__ENTITY_NAME__</div>
            <div class="footer__entity-meta">__ENTITY_ADDRESS__ · <a href="mailto:__CONTACT_EMAIL__">__CONTACT_EMAIL__</a></div>
          </div>
        </div>
        <nav class="footer__links" aria-label="Долен колонтитул">
          <a href="/privacy">Поверителност</a>
          <a href="/terms">Условия</a>
        </nav>
        <div class="footer__copy">© <span id="year">2026</span> __ENTITY_NAME__ · По-тих интернет за всеки.</div>
      </div>
    </footer>
    ```

    **Notes:**
    - The signet brand mark is preserved (per the phase directive "preserve existing brand mark / signet if present"). It's amber, thin-stroke — inherits `color: var(--amber)` from `.brand__mark` in styles.css.
    - Use `/privacy` and `/terms` (not `.html`) — `vercel.json` has `cleanUrls: true` per STATE.md.
    - `__ENTITY_NAME__` appears twice (brand row and copyright line) — both are grep-able.
    - The copyright uses `__ENTITY_NAME__` in place of the hardcoded "HarmBlocker" so the legal entity owns the copyright, not the brand name. (HarmBlocker is the product; __ENTITY_NAME__ is the legal operator.)

    **Add footer styles to styles.css** — extend the existing `/* ---------- Footer ---------- */` block. Do NOT delete the existing `.footer`, `.footer__inner`, `.footer__links` rules; add new rules beneath them:

    ```css
    .footer__brand {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
    }

    .footer__brand .brand__mark {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .footer__brand .brand__mark svg {
      width: 24px;
      height: 24px;
    }

    .footer__entity {
      display: grid;
      gap: 2px;
      line-height: 1.4;
    }

    .footer__entity-name {
      color: var(--ink);
      font-weight: 500;
      font-size: 0.875rem;
      letter-spacing: -0.003em;
    }

    .footer__entity-meta {
      color: var(--ink-muted);
      font-size: 0.8125rem;
    }

    .footer__entity-meta a {
      color: var(--ink-muted);
      text-decoration: none;
      border-bottom: 1px solid var(--amber-soft);
      transition: color 0.2s ease, border-color 0.2s ease;
    }

    .footer__entity-meta a:hover {
      color: var(--ink);
      border-bottom-color: var(--amber);
    }

    .footer__copy {
      color: var(--ink-muted);
      font-size: 0.75rem;
      letter-spacing: 0.01em;
    }

    @media (min-width: 640px) {
      .footer__inner {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        row-gap: var(--space-4);
      }
    }
    ```

    The existing mobile-first `.footer__inner` block already handles stacking on narrow viewports; the `@media (min-width: 640px)` override above is already present in styles.css — merge the new `flex-wrap` and `row-gap` additions into it rather than duplicating the media query. If merging is tricky, leave a redundant matching media query — CSS cascade handles it.

    **Mechanics:**
    1. In `index.html`: replace lines 339-348 (the current footer block, starting with `<!-- ============ FOOTER ============ -->` through `</footer>`) with the new markup above.
    2. In `success.html`: replace lines 183-192 (same block) with the new markup.
    3. In `privacy.html`: ensure the footer matches exactly (Task 1 guidance said to jump ahead and use the new consolidated footer — if it already matches, no change).
    4. In `terms.html`: same check as privacy.html.
    5. Add the footer CSS extensions to styles.css as described.

    **Do not touch** the nav, hero, pricing card, steps, benefits, emotional section, or any other part of index.html and success.html. This task is footer-only + a small CSS append.
  </action>
  <acceptance_criteria>
    - All four files (index.html, success.html, privacy.html, terms.html) contain `__ENTITY_NAME__`
    - All four files contain `__ENTITY_ADDRESS__`
    - All four files contain `__CONTACT_EMAIL__`
    - All four files contain `href="/privacy"` (legal link)
    - All four files contain `href="/terms"` (legal link)
    - All four files still contain the signet concentric-rings SVG in the footer (brand mark preserved)
    - `grep -c "__ENTITY_NAME__" index.html` returns at least 2 (appears twice in new footer)
    - styles.css contains `.footer__brand`, `.footer__entity`, `.footer__copy` classes
    - No other sections of index.html or success.html were modified — git diff should show changes only in the footer region and the single `<span id="year">` preservation
    - Opening any of the four pages in a browser shows the new footer with signet mark, entity placeholders, and two legal links
  </acceptance_criteria>
  <verify>
    <automated>cd D:/Claude/HarmBlocker &amp;&amp; grep -l "__ENTITY_NAME__" index.html success.html privacy.html terms.html &amp;&amp; grep -l "__ENTITY_ADDRESS__" index.html success.html privacy.html terms.html &amp;&amp; grep -l "__CONTACT_EMAIL__" index.html success.html privacy.html terms.html &amp;&amp; grep -l 'href="/privacy"' index.html success.html privacy.html terms.html &amp;&amp; grep -l 'href="/terms"' index.html success.html privacy.html terms.html &amp;&amp; grep -l ".footer__brand" styles.css &amp;&amp; grep -l ".footer__entity" styles.css</automated>
  </verify>
  <done>
    All four pages carry the same consolidated footer with entity placeholders, links to /privacy and /terms, and the preserved signet brand mark. styles.css has matching .footer__brand / .footer__entity / .footer__copy rules. Nav, hero, pricing, and all other sections are untouched. Satisfies LEG-05.
  </done>
</task>

<task type="auto">
  <name>Task 4: Write COOKIE-DECISION.md — document no-banner choice</name>
  <files>.planning/phases/02-legal-floor/COOKIE-DECISION.md</files>
  <read_first>
    - .planning/ROADMAP.md (Phase 6 Measurement — confirms ANLY-02 cookieless-by-design constraint)
    - .planning/REQUIREMENTS.md (LEG-06 wording, ANLY-02 wording)
    - .planning/STATE.md (existing decisions: "Milestone 1: Cookieless analytics (Plausible/Umami/Fathom — chosen during Phase 6) to avoid cookie-banner tax")
  </read_first>
  <action>
    Create `.planning/phases/02-legal-floor/COOKIE-DECISION.md` — a single-page decision record. Use the following exact skeleton (fill each section with 2–4 sentences max — this is a decision doc, not an essay):

    ```markdown
    # Cookie Banner Decision

    **Status:** Not shipped
    **Decided:** 2026-04-23
    **Owners:** Phase 2 (Legal floor) in coordination with Phase 6 (Measurement)
    **Requirement:** LEG-06

    ## Decision

    HarmBlocker ships **without** a cookie consent banner in v1.0 Launch-Ready.

    ## Reasoning

    Under GDPR and the EU ePrivacy Directive, a cookie consent banner is required only when the site (a) sets cookies or other persistent identifiers that are not strictly necessary, or (b) embeds third-party scripts that do. As of Phase 2 the site sets no cookies of its own and runs no analytics. Phase 6 (Measurement) commits to a cookieless, privacy-first analytics tool — one of Plausible, Umami, or Fathom — all of which are designed to operate without cookies or persistent client identifiers (ref: ANLY-02 in REQUIREMENTS.md, and the Milestone 1 decision logged in STATE.md: "Cookieless analytics (Plausible/Umami/Fathom — chosen during Phase 6) to avoid cookie-banner tax").

    The `__CONTACT_EMAIL__` link and the Stripe / Cal.com embeds are third-party interactions initiated by explicit user action (clicking a CTA or loading success.html's booking widget). Those services may set their own cookies under their own terms, and the Privacy Policy discloses this — but the site itself does not set consent-requiring storage, so no banner is triggered on the marketing-site surface.

    Shipping a banner when none is required would add friction, contradict the brand's "Quiet Confidence" posture, and teach visitors that the site is surveilling them when in fact it is not.

    ## When to revisit

    This decision must be re-opened if any of the following become true:

    - Phase 6 selects an analytics tool that sets cookies or persistent identifiers (deviating from ANLY-02). Each candidate should be re-confirmed as cookieless at install time, not assumed.
    - A future phase adds marketing pixels, embedded chat widgets, session replay, heatmap tools, A/B testing libraries, or any third-party script that drops consent-requiring storage.
    - A future phase adds account/login state stored in cookies or localStorage tied to an identifier.
    - Bulgarian or EU guidance clarifies that specific cookieless analytics implementations still require consent (regulatory drift).

    Revisiting means: either remove the trigger, or ship a GDPR-compliant consent banner before the trigger goes live.

    ## Related

    - `privacy.html` — Section "Бисквитки (cookies)" aligns with this decision and states plainly that the site sets no cookies.
    - Phase 6 plan (not yet written) — must confirm the chosen analytics tool is cookieless before installation; if not, this decision is invalidated and a banner must ship with the analytics script.
    - `.planning/STATE.md` — Decisions section records this alignment.
    ```

    The document must be single-page, plainspoken, in English (this is internal planning docs, per convention — user-facing text is Bulgarian; planning docs are English like STATE.md, ROADMAP.md).
  </action>
  <acceptance_criteria>
    - File exists at `.planning/phases/02-legal-floor/COOKIE-DECISION.md`
    - Contains the word "cookieless" (ties decision to Phase 6 analytics choice per LEG-06)
    - Contains "Plausible" and "Umami" and "Fathom" (enumerates the candidate tools)
    - Contains "Phase 6" reference
    - Contains "ANLY-02" cross-reference
    - Contains a "When to revisit" section naming conditions that invalidate the decision
    - File is markdown with a top-level `# Cookie Banner Decision` heading
    - No placeholder text like "TODO" or "TBD" remains in the body
  </acceptance_criteria>
  <verify>
    <automated>cd D:/Claude/HarmBlocker &amp;&amp; test -f .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "cookieless" .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "Plausible" .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "Umami" .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "Fathom" .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "ANLY-02" .planning/phases/02-legal-floor/COOKIE-DECISION.md &amp;&amp; grep -l "When to revisit" .planning/phases/02-legal-floor/COOKIE-DECISION.md</automated>
  </verify>
  <done>
    COOKIE-DECISION.md exists, records "not shipped" as the decision, names the cookieless-by-design rationale, cross-references Phase 6 / ANLY-02, and lists explicit conditions under which the decision must be revisited. Satisfies LEG-06.
  </done>
</task>

</tasks>

<verification>
Phase 2 (Legal floor) verification — run from repo root after all four tasks complete:

```bash
# All four pages have entity placeholders
grep -l "__ENTITY_NAME__" index.html success.html privacy.html terms.html
grep -l "__ENTITY_ADDRESS__" index.html success.html privacy.html terms.html
grep -l "__CONTACT_EMAIL__" index.html success.html privacy.html terms.html

# All four pages link to privacy + terms
grep -l 'href="/privacy"' index.html success.html privacy.html terms.html
grep -l 'href="/terms"' index.html success.html privacy.html terms.html

# Legal pages are lawyer-review-marked drafts
grep -l "LAWYER REVIEW REQUIRED BEFORE LAUNCH" privacy.html terms.html
grep -l "Чернова" privacy.html terms.html

# Privacy Policy is GDPR-compliant
grep -l "GDPR" privacy.html
grep -l "Google Fonts" privacy.html
grep -l "Stripe" privacy.html
grep -l "Cal.com" privacy.html

# Terms of Service has explicit 14-day withdrawal clause
grep -l "14-дневно" terms.html
grep -l "14 дни" terms.html
grep -l "ЗЗП" terms.html
grep -l "2011/83" terms.html

# Bulgarian language
grep -l 'lang="bg"' privacy.html terms.html

# Cookie decision documented
test -f .planning/phases/02-legal-floor/COOKIE-DECISION.md
grep -l "cookieless" .planning/phases/02-legal-floor/COOKIE-DECISION.md

# CSS additions are in place
grep -l ".legal" styles.css
grep -l ".legal-banner" styles.css
grep -l ".prose" styles.css
grep -l ".footer__entity" styles.css

# Manual browser spot-check (any static server):
# python -m http.server 8080
#   -> http://localhost:8080/index.html   (footer shows entity + two legal links + signet mark)
#   -> http://localhost:8080/success.html (same footer)
#   -> http://localhost:8080/privacy.html (draft banner, prose reads cleanly, footer matches)
#   -> http://localhost:8080/terms.html   (draft banner, 14-day clause visible, blockquote template, footer matches)
#   -> No mixed-content or console errors
```
</verification>

<success_criteria>
Phase 2 is done when:

1. **LEG-01:** Privacy Policy page (`privacy.html`) exists in Bulgarian, GDPR-compliant in structure (controller, data categories, cookies, third parties, rights, contact), reachable from the footer of every page.
2. **LEG-02:** Terms of Service page (`terms.html`) exists in Bulgarian, reachable from the footer of every page.
3. **LEG-03:** The Terms of Service contains an explicit 14-day right-of-withdrawal clause citing Bulgarian ЗЗП (чл. 50–57) and EU Directive 2011/83/EU, with a copyable cancellation-email template.
4. **LEG-05:** The consolidated footer on `index.html`, `success.html`, `privacy.html`, and `terms.html` shows the entity name, contact email, and registered address via the three `__PLACEHOLDER__` tokens.
5. **LEG-06:** A one-pager at `.planning/phases/02-legal-floor/COOKIE-DECISION.md` records the no-banner decision, cites the Phase 6 cookieless-analytics commitment as the reason, and lists revisit conditions.
6. No new fonts, colors, shadows, or illustration metaphors introduced. "Quiet Confidence" design system preserved.
7. Both legal pages carry the HTML comment `<!-- LAWYER REVIEW REQUIRED BEFORE LAUNCH -->` and a visible Bulgarian draft banner.
</success_criteria>

<output>
After completion, create `.planning/phases/02-legal-floor/02-legal-floor-01-SUMMARY.md` summarizing:
- Files created: privacy.html, terms.html, .planning/phases/02-legal-floor/COOKIE-DECISION.md
- Files modified: index.html (footer only), success.html (footer only), styles.css (appended .legal / .legal-banner / .prose / .footer__entity blocks)
- Placeholders introduced: `__ENTITY_NAME__`, `__ENTITY_ADDRESS__`, `__CONTACT_EMAIL__` — user must swap these before launch (already documented in PROJECT.md Milestone Execution Directive)
- Lawyer review: required before publishing privacy.html and terms.html — the HTML comment and visible draft banner make this impossible to miss
- Requirements satisfied: LEG-01, LEG-02, LEG-03, LEG-05, LEG-06
- Known follow-ups: LEG-04 (pre-purchase + post-purchase 14-day disclosure surfacing) belongs to Phase 4 and Phase 5, not this phase — the ToS clause is in place but the CTA-adjacent and success-page notices are separate requirements
</output>

#!/usr/bin/env node
/**
 * Renders content.mjs into three static pages:
 *
 *   index.html      English   /
 *   es/index.html   Español   /es/
 *   zh/index.html   中文      /zh/
 *
 * One template, three languages, so the versions cannot drift apart. Real
 * pages rather than a browser-side text swap: the reader here is likely to be
 * an ATS filter or a Hermes agent before it is a person, and a translation
 * applied by JavaScript is invisible to both.
 *
 *   node build.mjs
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { langs, content } from './content.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://nousresearch.technoir.cloud';

const styles = `
  @font-face{
    /* Same variable font Nous uses for headings, self-hosted nowhere near
       reliably enough on Google Fonts, so pulled from its own npm package. */
    font-family:"Geist Mono";
    src:url("https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-mono/GeistMono-Variable.woff2") format("woff2");
    font-weight:100 900;
    font-style:normal;
    font-display:swap;
  }
  :root{
    /* Sampled directly from the computed style of nousresearch.com/careers. */
    --ink:#0171a9;
    --paper:#ffffff;
    --grey:#5c6d78;
    --max:1100px;
    --serif:"EB Garamond",Georgia,"Times New Roman",serif;
    --sans:"Helvetica Neue",Helvetica,Arial,sans-serif;
    --mono:"Courier Prime","Courier New",Courier,monospace;
    --headmono:"Geist Mono","Courier Prime",monospace;
  }
  *{box-sizing:border-box}
  html{background:var(--paper);color:var(--ink);-webkit-font-smoothing:antialiased}
  body{margin:0;font-family:var(--sans);font-weight:700;font-size:15.5px;line-height:1.55}
  .shell{width:min(calc(100% - 48px),var(--max));margin:0 auto}
  a{color:var(--ink)}

  .navbar{position:sticky;top:0;z-index:20;background:var(--paper);border-bottom:2px dashed var(--ink)}
  nav{padding:30px 0 18px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap}
  nav a{
    font-family:var(--serif);font-weight:500;font-size:16px;letter-spacing:.05em;
    text-transform:uppercase;text-decoration:none;margin:0 10px;display:inline-block;line-height:1.9;
  }
  nav a:hover{text-decoration:underline;text-underline-offset:4px}
  nav a.home{text-decoration:underline;text-underline-offset:4px}

  /* mobile-only menu button and popup — matches the "..." icon and full-screen
     menu on nousresearch.com below their own mobile breakpoint */
  .menu-btn{
    display:none;position:fixed;top:16px;right:16px;z-index:40;
    width:40px;height:40px;border:0;border-radius:10%;background:#e0e0e0;color:var(--ink);
    align-items:center;justify-content:center;font-size:20px;letter-spacing:1px;line-height:1;cursor:pointer;
  }
  .menu-overlay{position:fixed;inset:0;z-index:50;background:var(--paper);overflow-y:auto;padding:72px 28px 40px}
  .menu-overlay[hidden]{display:none}
  .menu-close{position:fixed;top:12px;right:18px;z-index:51;background:none;border:0;padding:8px;font-size:30px;line-height:1;color:var(--ink);cursor:pointer}
  .menu-brand{font-family:var(--headmono);font-weight:700;font-size:20px;letter-spacing:.02em;text-transform:uppercase;text-decoration:underline;text-underline-offset:6px;margin:0}
  .menu-tag{font-family:var(--headmono);font-weight:400;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--grey);margin:16px 0}
  .menu-rule{border:0;border-top:1px dashed var(--ink);margin:0 0 20px;opacity:.9}
  .menu-links{display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:22px;margin:0 0 30px;padding:0;text-align:left}
  .menu-links a{display:block;margin:0;font-family:var(--headmono);font-weight:700;font-size:19px;letter-spacing:.02em;text-transform:uppercase;text-decoration:none;color:var(--ink)}
  .menu-links a:hover{text-decoration:underline}
  .menu-links a[aria-current="true"]{text-decoration:underline}

  /* language picker — plain links, so it works with JavaScript off and a
     crawler can follow it to the translated page */
  .lang{position:relative;margin-left:10px}
  .lang summary{
    list-style:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;
    font-family:var(--mono);font-weight:700;font-size:12px;letter-spacing:.08em;
    border:1.5px solid var(--ink);padding:4px 9px;color:var(--ink);
  }
  .lang summary::-webkit-details-marker{display:none}
  .lang summary:hover{background:var(--ink);color:var(--paper)}
  .langmenu{
    position:absolute;right:0;top:calc(100% + 6px);z-index:30;min-width:172px;
    background:var(--paper);border:1.5px solid var(--ink);padding:4px;text-align:left;
  }
  .langmenu a{
    display:block;padding:8px 10px;text-decoration:none;font-family:var(--mono);
    font-weight:400;font-size:13px;letter-spacing:.04em;text-transform:none;margin:0;
  }
  .langmenu a:hover{background:rgba(0,113,169,.09);text-decoration:none}
  .langmenu a[aria-current="true"]{font-weight:700}
  .langmenu a[aria-current="true"]::after{content:" \\2713"}
  .langmenu small{display:block;color:var(--grey);font-size:11px;letter-spacing:.06em}

  .rule{border:0;border-top:2px dashed var(--ink);margin:0;opacity:.9}

  .block{
    display:inline-block;background:var(--ink);color:var(--paper);
    font-family:var(--headmono);font-weight:600;font-size:clamp(24px,2.4vw,32px);
    letter-spacing:-.05em;padding:0;margin:0 0 62px;
  }

  section{padding:56px 0 62px;scroll-margin-top:92px}
  #application{padding-top:52px}
  .cols{display:grid;grid-template-columns:1fr 250px;gap:56px;align-items:start}
  /* explicit placement so the portrait sits beside the first two paragraphs on
     desktop, but the mobile media query below can drop it back into reading
     order — right after the second paragraph, like the portrait on
     nousresearch.com/careers — without duplicating any markup */
  .cols>.intro-text{grid-column:1;grid-row:1}
  .cols>.portrait-block{grid-column:2;grid-row:1/3}
  .cols>.rolelist{grid-column:1;grid-row:2}

  .lead-in{
    font-family:var(--serif);font-weight:600;font-size:1.6em;
    letter-spacing:.01em;text-transform:uppercase;line-height:1;
  }
  .lead-in a{text-decoration:none}
  .lead-in a:hover{text-decoration:underline;text-underline-offset:4px}

  p{margin:0 0 22px;max-width:90ch}
  .u{text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:2px;text-decoration-color:rgba(0,113,169,.42);transition:text-decoration-color .15s,background-color .15s}
  .u:hover{text-decoration-color:var(--ink);background:rgba(0,113,169,.07)}

  ul{margin:0 0 22px;padding-left:22px;max-width:90ch}
  li{margin-bottom:14px}

  .mono-head{
    font-family:var(--mono);font-weight:700;font-size:clamp(19px,2vw,24px);
    letter-spacing:.08em;text-transform:uppercase;margin:0 0 30px;
  }
  .mono-head .hw{text-decoration:underline;text-underline-offset:6px;text-decoration-thickness:2px}
  .mono-head .sub{font-family:var(--sans);font-weight:700;font-size:.62em;letter-spacing:0;text-transform:none;color:var(--grey);margin-left:14px}

  /* floating, unframed — matches the portrait on nousresearch.com/careers */
  .portrait img{display:block;width:100%;height:auto;border-radius:6px;box-shadow:0 4px 8px rgba(0,0,0,.05)}

  .cvrow{display:flex;gap:10px;margin:14px 0 0;max-width:none}
  .cvlink{display:block;flex:1;text-align:center;border:2px solid var(--ink);padding:11px 14px;text-decoration:none;font-weight:700;font-size:14px}
  .cvlink:hover{background:var(--ink);color:var(--paper)}

  /* condensed "what I want" list, in the same badge + title + one-liner shape
     as the "OPEN ROLES" list on nousresearch.com/careers, values sampled from
     its .badge/.role-title/.role-description */
  .rolelist{margin:8px 0 0;max-width:78ch}
  .role-item{padding:12px 0;border-bottom:1px dotted var(--ink)}
  .role-title{display:flex;align-items:center;gap:8px;font-weight:700;font-size:17px;margin:0}
  .badge{display:inline-block;background:#007bff;color:#fff;padding:2px 6px;border-radius:1px;font-weight:700;font-size:10px;letter-spacing:.03em;text-transform:uppercase;white-space:nowrap}
  .role-body{margin:6px 0 0;font-size:15px;line-height:1.5}

  .tl{max-width:none}
  .tl-row{display:grid;grid-template-columns:158px 1fr;gap:28px;padding:18px 0;border-top:1px dashed var(--ink)}
  .tl-row:last-child{border-bottom:1px dashed var(--ink)}
  .tl-row>*{min-width:0}
  .tl-when{font-family:var(--mono);font-weight:400;font-size:13px;letter-spacing:.06em;color:var(--grey);text-transform:uppercase;padding-top:4px}
  .tl-kind{display:block;margin-top:6px;font-size:11px;letter-spacing:.14em;color:var(--ink);opacity:.75}
  .tl-what{font-family:var(--serif);font-weight:600;font-size:22px;line-height:1.15;text-transform:uppercase;margin:0 0 6px}
  .tl-what a{text-decoration:none}
  .tl-what a:hover{text-decoration:underline;text-underline-offset:4px}
  .tl-where{font-weight:700;font-size:14px;color:var(--grey);margin:0 0 8px}
  .tl-body{font-weight:500;font-size:15px;line-height:1.5;margin:0;max-width:78ch;overflow-wrap:anywhere}

  /* matches the "if nothing fits" callout on nousresearch.com/careers exactly */
  .footnote{
    display:flex;align-items:flex-start;max-width:70ch;
    background:var(--ink);color:var(--paper);border-left:5px solid #00547e;border-radius:1px;
    box-shadow:0 2px 8px rgba(0,0,0,.08);padding:.8rem 1.8rem;
    font-family:var(--sans);font-weight:500;font-size:14.5px;line-height:1.6;letter-spacing:.02em;
  }
  .footnote .info-icon{width:20px;height:20px;min-width:20px;margin:3px 12px 0 0;flex-shrink:0}

  footer{padding:34px 0 64px;font-family:var(--mono);font-weight:400;font-size:13px;letter-spacing:.06em;color:var(--grey);text-align:center;text-transform:uppercase}
  footer a{color:var(--grey)}

  @media (max-width:900px){
    .navbar{display:none}
    .menu-btn{display:flex}
    .cols{grid-template-columns:1fr;gap:0}
    .cols>.intro-text,.cols>.portrait-block,.cols>.rolelist{grid-column:1;grid-row:auto;margin-bottom:36px}
    .portrait{max-width:300px}
    .cvrow{max-width:300px}
    section{padding:40px 0 44px;scroll-margin-top:16px}
    #application{padding-top:34px}
    .tl-row{grid-template-columns:1fr;gap:8px}
    .tl-kind{display:inline;margin:0 0 0 12px}
    .mono-head .sub{display:block;margin:8px 0 0}
    .footnote{padding:.7rem 1.1rem}
  }
`;

const ids = ['why', 'how', 'record', 'contact'];

function render(lang) {
  const c = content[lang.code];
  const base = lang.dir ? `/${lang.dir}` : '/';
  const url = `${SITE}${base}`;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Person',
    name: 'Javier Ponz Prado',
    jobTitle: 'Technical support and agent operations',
    description: c.desc,
    email: 'nerion89@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Aberdeen', addressCountry: 'GB' },
    url: 'https://javierponz.technoir.cloud/',
    sameAs: ['https://github.com/ponzgpt', 'https://www.linkedin.com/in/javierponz'],
    seeks: { '@type': 'Demand', name: 'Technical support engineering / customer success at Nous Research' },
    knowsAbout: ['Hermes Agent', 'OpenClaw', 'Model Context Protocol', 'agent workflows', 'technical support',
      'customer success', 'technical troubleshooting', 'llama.cpp', 'local inference', 'open weights', 'Omarchy',
      'Arch Linux', 'Fedora', 'GrapheneOS', 'OSINT', 'Docker', 'Traefik', 'nginx', 'Linux', 'VPS administration',
      'Python', 'JavaScript', 'TypeScript', 'Astro', 'Swift', 'CI/CD', 'PC hardware', 'overclocking'],
    knowsLanguage: ['es', 'en'],
    inLanguage: lang.html
  };

  const navLinks = ids.map((id, i) => `<a href="#${id}">${c.nav[i]}</a>`).join('\n      ');

  const langMenu = langs.map((l) => {
    const to = l.dir ? `/${l.dir}` : '/';
    return `<a href="${to}" hreflang="${l.html}" lang="${l.html}"${l.code === lang.code ? ' aria-current="true"' : ''}>${l.label}<small>${l.name}</small></a>`;
  }).join('\n          ');

  const alternates = langs.map((l) =>
    `<link rel="alternate" hreflang="${l.html}" href="${SITE}${l.dir ? `/${l.dir}` : '/'}" />`).join('\n');

  const menuLangs = langs.map((l) => {
    const to = l.dir ? `/${l.dir}` : '/';
    return `<a href="${to}" hreflang="${l.html}" lang="${l.html}"${l.code === lang.code ? ' aria-current="true"' : ''}>${l.label}</a>`;
  }).join('\n        ');

  const roleList = c.application.roles.map((r) => `
      <div class="role-item">
        <div class="role-title"><span class="badge">${r.badge}</span>${r.title}</div>
        <p class="role-body">${r.body}</p>
      </div>`).join('\n');

  const timeline = c.record.rows.map((r) => `
      <div class="tl-row">
        <div class="tl-when">${r.when}<span class="tl-kind">${c.record.kinds[r.kind]}</span></div>
        <div>
          <p class="tl-what">${r.what}</p>
          <p class="tl-where">${r.where}</p>
          <p class="tl-body">${r.body}</p>
        </div>
      </div>`).join('\n');

  return `<!doctype html>
<html lang="${lang.html}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${c.title}</title>
<meta name="description" content="${c.desc}" />
<link rel="canonical" href="${url}" />
${alternates}
<link rel="alternate" hreflang="x-default" href="${SITE}/" />
<meta property="og:title" content="${c.title}" />
<meta property="og:description" content="${c.ogDesc}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:locale" content="${lang.html.replace('-', '_')}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
<style>${styles}</style>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<button class="menu-btn" id="menuBtn" type="button" aria-haspopup="dialog" aria-controls="menuOverlay" aria-expanded="false" aria-label="Menu">&#8226;&#8226;&#8226;</button>

<div class="menu-overlay" id="menuOverlay" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <button class="menu-close" id="menuClose" type="button" aria-label="Close menu">&times;</button>
  <p class="menu-brand">Javier Ponz</p>
  <p class="menu-tag">${c.menuTag}</p>
  <hr class="menu-rule" />
  <nav class="menu-links">
    ${navLinks}
  </nav>
  <hr class="menu-rule" />
  <nav class="menu-links">
    <a href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf" download>${c.cvBtn}</a>
    <a href="/javier-ponz-prado-cover-letter.pdf" download>${c.clBtn}</a>
    <a href="https://javierponz.technoir.cloud/">javierponz.technoir.cloud</a>
    <a href="https://github.com/ponzgpt">github.com/ponzgpt</a>
  </nav>
  <hr class="menu-rule" />
  <nav class="menu-links">
    ${menuLangs}
  </nav>
</div>

<div class="navbar">
  <div class="shell">
    <nav>
      <a class="home" href="https://javierponz.technoir.cloud/">Javier Ponz</a>
      ${navLinks}
      <details class="lang">
        <summary aria-label="Language">${lang.label} <span aria-hidden="true">&#9662;</span></summary>
        <div class="langmenu">
          ${langMenu}
        </div>
      </details>
    </nav>
  </div>
</div>

<div class="shell">

  <section id="application">
    <h1 class="block">${c.block}</h1>
    <div class="cols">
      <div class="intro-text">
        <p>${c.application.mission}</p>
        <p>${c.application.bio}</p>
      </div>
      <div class="portrait-block">
        <div class="portrait">
          <img src="/javier-sketch.jpg" alt="${c.portraitAlt}" width="720" height="960" />
        </div>
        <div class="cvrow">
          <a class="cvlink" href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf" download>${c.cvBtn}</a>
          <a class="cvlink" href="/javier-ponz-prado-cover-letter.pdf" download>${c.clBtn}</a>
        </div>
      </div>
      <div class="rolelist">
${roleList}
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section id="why">
    <h2 class="mono-head"><span class="hw">${c.why.head}</span><span class="sub">${c.why.sub}</span></h2>
${c.why.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="how">
    <h2 class="mono-head"><span class="hw">${c.how.head}</span><span class="sub">${c.how.sub}</span></h2>
${c.how.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}

    <p>${c.how.runningIntro}</p>
    <ul>
${c.how.list.map((i) => `      <li>${i}</li>`).join('\n')}
    </ul>

${c.how.tail.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="record">
    <h2 class="mono-head"><span class="hw">${c.record.head}</span><span class="sub">${c.record.sub}</span></h2>
    <div class="tl">
${timeline}
    </div>
  </section>
  <hr class="rule" />

  <section id="contact">
    <h2 class="mono-head"><span class="hw">${c.contact.head}</span></h2>
${c.contact.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
    <p><a class="u" href="mailto:nerion89@gmail.com?subject=${c.contact.mailSubject}">nerion89@gmail.com</a> · <a class="u" href="https://github.com/ponzgpt">github.com/ponzgpt</a> · <a class="u" href="https://www.linkedin.com/in/javierponz">LinkedIn</a> · <a class="u" href="https://javierponz.technoir.cloud/">javierponz.technoir.cloud</a></p>
    <div class="footnote">
      <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      <span>${c.contact.notice}</span>
    </div>
  </section>
  <hr class="rule" />

  <footer>
    ${c.footer} · <a href="https://javierponz.technoir.cloud/">javierponz.technoir.cloud</a>
  </footer>

</div>

<script>
(function () {
  var btn = document.getElementById('menuBtn');
  var overlay = document.getElementById('menuOverlay');
  var close = document.getElementById('menuClose');
  function open() { overlay.hidden = false; document.body.style.overflow = 'hidden'; btn.setAttribute('aria-expanded', 'true'); }
  function shut() { overlay.hidden = true; document.body.style.overflow = ''; btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) shut(); });
  overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', shut); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') shut(); });
})();
</script>
</body>
</html>
`;
}

for (const lang of langs) {
  const out = join(root, lang.dir, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(lang), 'utf8');
  console.log(`wrote ${lang.dir || ''}index.html  (${lang.code})`);
}

// sitemap, so the three pages and the PDF are all discoverable
const urls = [
  ...langs.map((l) => `${SITE}${l.dir ? `/${l.dir}` : '/'}`),
  `${SITE}/javier-ponz-prado-cover-letter.pdf`
];
writeFileSync(join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>${u.endsWith('.pdf') ? '0.8' : '1.0'}</priority></url>`).join('\n') +
  `\n</urlset>\n`, 'utf8');
console.log('wrote sitemap.xml');

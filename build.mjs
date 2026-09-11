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

  /* static, like theirs: the header scrolls away with the page rather than
     following the reader down it */
  /* the dashed rule sits on .shell, not the full-bleed .navbar, so its width
     matches every other dashed rule on the page (and the one under CAREERS
     on nousresearch.com, which is also inset to content width, not edge to
     edge) */
  .navbar{position:relative;z-index:20;background:var(--paper)}
  .navbar .shell{border-bottom:2px dashed var(--ink)}
  nav{padding:30px 0 18px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap}
  nav a{
    font-family:var(--serif);font-weight:500;font-size:16px;letter-spacing:.05em;
    text-transform:uppercase;text-decoration:none;margin:0 10px;display:inline-block;line-height:1.9;
  }
  nav a:hover{text-decoration:underline;text-underline-offset:4px}
  nav a.home{text-decoration:underline;text-underline-offset:4px}


  /* language picker — an icon button that opens a popover of language codes,
     with a caret pointing back at the button. Still plain links inside a
     <details>, so it works with JavaScript off and a crawler can follow it to
     the translated page. */
  .lang{position:relative;margin-left:12px;--pop:#fbfbfc;--hair:rgba(1,113,169,.16)}
  .lang summary{
    list-style:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
    width:38px;height:38px;border-radius:10px;color:var(--ink);
    background:var(--paper);border:1px solid var(--hair);box-shadow:0 2px 8px rgba(0,0,0,.07);
  }
  .lang summary::-webkit-details-marker{display:none}
  .lang summary svg{display:block;width:20px;height:20px}
  .lang summary:hover,.lang[open] summary{background:var(--ink);color:var(--paper);border-color:var(--ink)}
  .langmenu{
    position:absolute;left:50%;transform:translateX(-50%);top:calc(100% + 11px);z-index:30;
    display:flex;align-items:center;gap:2px;padding:5px;white-space:nowrap;
    background:var(--pop);border:1px solid var(--hair);border-radius:14px;
    box-shadow:0 6px 18px rgba(0,0,0,.10);
  }
  .langmenu::before{
    content:"";position:absolute;top:-6px;left:50%;width:10px;height:10px;
    transform:translateX(-50%) rotate(45deg);background:var(--pop);
    border-left:1px solid var(--hair);border-top:1px solid var(--hair);border-radius:2px;
  }
  .langmenu a{
    display:block;margin:0;padding:7px 12px;border-radius:9px;line-height:1.2;
    font-family:var(--sans);font-weight:700;font-size:14px;letter-spacing:.01em;
    text-transform:none;text-decoration:none;color:var(--grey);
  }
  .langmenu a:hover{color:var(--ink);text-decoration:none}
  .langmenu a[aria-current="true"]{background:var(--paper);color:var(--ink);box-shadow:0 1px 3px rgba(0,0,0,.12)}

  .rule{border:0;border-top:2px dashed var(--ink);margin:0;opacity:.9}

  .block{
    display:inline-block;background:var(--ink);color:var(--paper);
    font-family:var(--headmono);font-weight:600;font-size:clamp(24px,2.4vw,32px);
    letter-spacing:-.05em;padding:0;margin:0 0 62px;
  }

  section{padding:56px 0 62px;scroll-margin-top:16px}
  #application{padding-top:52px}
  /* two cells on desktop; on mobile the media query collapses to one column and
     the portrait drops below the mission paragraph, like the portrait on
     nousresearch.com/careers */
  .cols{display:grid;grid-template-columns:1fr 250px;gap:56px;align-items:start}

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

  /* condensed "what I want" list, in the same badge + title + one-liner shape
     as the "OPEN ROLES" list on nousresearch.com/careers, values sampled from
     its .badge/.role-title/.role-description */
  .rolelist{margin:0 0 26px;max-width:78ch}
  .role-item{padding:12px 0;border-bottom:1px dotted var(--ink)}
  .role-title{display:flex;align-items:center;gap:8px;font-weight:700;font-size:17px;margin:0}
  .badge{display:inline-block;background:#007bff;color:#fff;padding:2px 6px;border-radius:1px;font-weight:700;font-size:10px;letter-spacing:.03em;text-transform:uppercase;white-space:nowrap}
  .role-body{margin:6px 0 0;font-size:15px;line-height:1.5}

  /* mirrors their "HOW TO APPLY" list: square markers, 16px, same ink */
  .applylist{list-style:square;padding-left:16px;margin:16px 0 26px;max-width:78ch}
  .applylist li{margin:0 0 8px;font-size:16px;font-weight:600;line-height:1.5;overflow-wrap:anywhere}

  /* matches the "if nothing fits" callout on nousresearch.com/careers exactly */
  .footnote{
    display:flex;align-items:flex-start;max-width:70ch;
    background:var(--ink);color:var(--paper);border-left:5px solid #00547e;border-radius:1px;
    box-shadow:0 2px 8px rgba(0,0,0,.08);padding:.8rem 1.8rem;
    font-family:var(--sans);font-weight:500;font-size:14.5px;line-height:1.6;letter-spacing:.02em;
  }
  .footnote .info-icon{width:20px;height:20px;min-width:20px;margin:3px 12px 0 0;flex-shrink:0}

  #contact{padding-bottom:80px}

  @media (max-width:900px){
    .cols{grid-template-columns:1fr;gap:36px}
    .portrait{max-width:300px}
    nav{padding:16px 0 12px}
    nav a{margin:0 7px;font-size:14px;line-height:1.9}
    section{padding:40px 0 44px}
    #application{padding-top:34px}
    .mono-head .sub{display:block;margin:8px 0 0}
    .footnote{padding:.7rem 1.1rem}
  }
`;

// the five Ws, in order, as the page's sections and its whole navigation
const ids = ['who', 'what', 'when', 'where', 'why'];

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

  const navLinks = [
    `<a class="home" href="https://javierponz.technoir.cloud/">${c.home}</a>`,
    ...ids.map((id, i) => `<a href="#${id}">${c.nav[i]}</a>`)
  ].join('\n      ');

  const langMenu = langs.map((l) => {
    const to = l.dir ? `/${l.dir}` : '/';
    return `<a href="${to}" hreflang="${l.html}" lang="${l.html}" title="${l.name}"${l.code === lang.code ? ' aria-current="true"' : ''}>${l.label}</a>`;
  }).join('\n          ');

  const alternates = langs.map((l) =>
    `<link rel="alternate" hreflang="${l.html}" href="${SITE}${l.dir ? `/${l.dir}` : '/'}" />`).join('\n');

  const roleList = c.what.roles.map((r) => `
      <div class="role-item">
        <div class="role-title"><span class="badge">${r.badge}</span>${r.title}</div>
        <p class="role-body">${r.body}</p>
      </div>`).join('\n');

  const applyList = c.contact.applyItems.map((i) => `      <li>${i}</li>`).join('\n');

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
<div class="navbar">
  <div class="shell">
    <nav>
      ${navLinks}
      <details class="lang">
        <summary aria-label="Language" title="Language"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" /></svg></summary>
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
      <p>${c.application.mission}</p>
      <div class="portrait">
        <img src="/javier-sketch.jpg" alt="${c.portraitAlt}" width="720" height="960" />
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section id="who">
    <h2 class="mono-head"><span class="hw">${c.who.head}</span><span class="sub">${c.who.sub}</span></h2>
${c.who.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="what">
    <h2 class="mono-head"><span class="hw">${c.what.head}</span><span class="sub">${c.what.sub}</span></h2>
    <div class="rolelist">
${roleList}
    </div>

${c.running.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}

    <p>${c.running.runningIntro}</p>
    <ul>
${c.running.list.map((i) => `      <li>${i}</li>`).join('\n')}
    </ul>

${c.running.tail.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="when">
    <h2 class="mono-head"><span class="hw">${c.when.head}</span><span class="sub">${c.when.sub}</span></h2>
${c.when.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="where">
    <h2 class="mono-head"><span class="hw">${c.where.head}</span><span class="sub">${c.where.sub}</span></h2>
${c.where.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="why">
    <h2 class="mono-head"><span class="hw">${c.why.head}</span><span class="sub">${c.why.sub}</span></h2>
${c.why.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
  </section>
  <hr class="rule" />

  <section id="contact">
    <h2 class="mono-head"><span class="hw">${c.contact.head}</span></h2>
${c.contact.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
    <p>${c.contact.applyLead}</p>
    <ul class="applylist">
${applyList}
    </ul>
    <div class="footnote">
      <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      <span>${c.contact.notice}</span>
    </div>
  </section>

</div>

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

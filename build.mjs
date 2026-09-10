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

  /* the four things their careers page asks an applicant to send */
  .checklist{border:2px dashed var(--ink);padding:6px 26px 8px;margin:0 0 26px;max-width:90ch}
  .ck{display:grid;grid-template-columns:150px 1fr;gap:22px;padding:16px 0;border-bottom:1px dashed rgba(0,113,169,.4)}
  .ck:last-child{border-bottom:0}
  .ck dt{font-family:var(--mono);font-weight:700;font-size:12px;letter-spacing:.09em;text-transform:uppercase;color:var(--grey);padding-top:2px}
  .ck dd{margin:0;font-size:15px;overflow-wrap:anywhere}
  .ck dd .sub{display:block;color:var(--grey);font-weight:500;font-size:13.5px;margin-top:3px}

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

  .notice{border:2px dashed var(--ink);padding:20px 22px;max-width:70ch;font-weight:500;font-size:14.5px;line-height:1.55}

  footer{padding:34px 0 64px;font-family:var(--mono);font-weight:400;font-size:13px;letter-spacing:.06em;color:var(--grey);text-align:center;text-transform:uppercase}
  footer a{color:var(--grey)}

  @media (max-width:900px){
    .cols{grid-template-columns:1fr;gap:36px}
    .portrait{max-width:300px}
    .cvrow{max-width:300px}
    nav{padding:14px 0 10px}
    nav a{margin:0 7px;font-size:14px;line-height:1.8}
    section{padding:40px 0 44px;scroll-margin-top:106px}
    #application{padding-top:34px}
    .tl-row{grid-template-columns:1fr;gap:8px}
    .tl-kind{display:inline;margin:0 0 0 12px}
    .mono-head .sub{display:block;margin:8px 0 0}
    .ck{grid-template-columns:1fr;gap:6px}
    .checklist{padding:6px 18px 8px}
  }
`;

const ids = ['why', 'how', 'record', 'apply', 'contact'];

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

  const timeline = c.record.rows.map((r) => `
      <div class="tl-row">
        <div class="tl-when">${r.when}<span class="tl-kind">${c.record.kinds[r.kind]}</span></div>
        <div>
          <p class="tl-what">${r.what}</p>
          <p class="tl-where">${r.where}</p>
          <p class="tl-body">${r.body}</p>
        </div>
      </div>`).join('\n');

  const checklist = c.apply.items.map((i) => `
      <div class="ck">
        <dt>${i.dt}</dt>
        <dd>${i.dd}<span class="sub">${i.note}</span></dd>
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
      <div>
${c.application.map((p) => `        <p>${p}</p>`).join('\n\n')}
      </div>
      <div>
        <div class="portrait">
          <img src="/javier-sketch.jpg" alt="${c.portraitAlt}" width="720" height="960" />
        </div>
        <div class="cvrow">
          <a class="cvlink" href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf" download>${c.cvBtn}</a>
          <a class="cvlink" href="/javier-ponz-prado-cover-letter.pdf" download>${c.clBtn}</a>
        </div>
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

  <section id="apply">
    <h2 class="mono-head"><span class="hw">${c.apply.head}</span><span class="sub">${c.apply.sub}</span></h2>
    <p>${c.apply.intro}</p>
    <dl class="checklist">
${checklist}
    </dl>
  </section>
  <hr class="rule" />

  <section id="contact">
    <h2 class="mono-head"><span class="hw">${c.contact.head}</span></h2>
${c.contact.paras.map((p) => `    <p>${p}</p>`).join('\n\n')}
    <p><a class="u" href="mailto:nerion89@gmail.com?subject=${c.contact.mailSubject}">nerion89@gmail.com</a> · <a class="u" href="https://github.com/ponzgpt">github.com/ponzgpt</a> · <a class="u" href="https://www.linkedin.com/in/javierponz">LinkedIn</a> · <a class="u" href="https://javierponz.technoir.cloud/">javierponz.technoir.cloud</a></p>
    <p class="notice">${c.contact.notice}</p>
  </section>
  <hr class="rule" />

  <footer>
    ${c.footer} · <a href="https://javierponz.technoir.cloud/">javierponz.technoir.cloud</a>
  </footer>

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

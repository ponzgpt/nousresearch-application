#!/usr/bin/env node
/**
 * Generates javier-ponz-prado-cover-letter.pdf from the text below.
 *
 * The letter lives here rather than on the general portfolio site because it is
 * addressed to one company. The CV is general and stays on the portfolio.
 *
 * Layout is deliberately plain, single-column and text-only for the same reason
 * as the CV: the first reader is likely to be software, and multi-column
 * layouts scramble text-extraction order.
 *
 *   node build-cover-letter.mjs
 */

import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'javier-ponz-prado-cover-letter.pdf');

const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
];

const paragraphs = [
  `Your careers page says that if nothing listed fits, I should send a description of what I would like to do at Nous. This is that description.`,

  `<b>What I would like to do is technical support and customer-facing work</b>: helping people actually adopt Hermes and run open models, and turning a broken situation into either a fix or a clear account of why it is not one. I spent ten years at Apple Retail being the human between people and their machines — diagnosis at the Genius Bar, AppleCare calls through the first COVID months, consultative selling to people who did not yet know what they needed, and two seven-month secondments leading in-store experience across Madrid. I would be proud to be that interface for Nous.`,

  `The specific thing I am good at is translating between layers: what the engineer means, what the sale promised, and what the person in front of you actually has on their screen. That is one job rather than three, and most support failures are a translation failure rather than a technical one.`,

  `<b>The job I want eventually is forward-deployed engineering, and I am not qualified for it today.</b> I have been learning this stack for two years. I would not put myself forward for the FDE posting. What I would like is a junior or supporting role near that work — carrying real support load, and being useful to the FDE team while I close the gap. I learn fast in front of a live problem; it is the only environment I have ever learned anything in.`,

  `I did not arrive at open source from ideology. I grew up on Windows because that is what a PC gamer had, then spent a decade inside Apple, which is to say a decade of being very good at a platform I did not own. I am now deliberately unwinding both: running Arch, Fedora and Omarchy, moving off Google services, reading up on OSINT to understand what I have been leaking for twenty years, and planning a move to GrapheneOS. I watched those platforms get steadily worse for the people living inside them, from close enough to see the decisions being made. Whoever holds the primitives sets the ceiling on how far a machine may help its owner, and on a closed stack that ceiling is somebody else's product roadmap.`,

  `In practice I run Hermes daily as a working tool rather than a demonstration, and serve a quantised open-weights model from an RTX 5090 in my own room through llama.cpp, wired into Hermes as an endpoint; nothing in that loop leaves the house. I have been building and overclocking PCs since I was a teenager, so the interest in what my own hardware can do came long before I had an argument for it. I also have a small web application in production, deployed by me with Docker, Traefik and TLS behind a release gate that refuses to publish on red. Two further repositories were specified by me and written by Hermes from that specification, and one is a fork; my site says exactly which is which, because directing an agent to a usable result is not the same claim as writing the code.`,

  `Remote suits me and I am set up for it. I am also happy to travel and would consider relocating; I already left my country once, for Scotland, with my partner. My CV is attached, my work is at github.com/ponzgpt, and the long form of this letter is at nousresearch.technoir.cloud — a page I built by reading yours carefully, which seemed a better way to show alignment than saying I was aligned.`,

  `The most useful reply would tell me which of these directions is worth pursuing and what stands between me and being obviously qualified for it. I would rather close a specific gap than guess at one.`
];

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Javier Ponz Prado — cover letter</title>
<style>
  @page { size: A4; margin: 16mm 19mm; }
  * { box-sizing: border-box; }
  body { margin:0; font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
         font-size:9.6pt; line-height:1.44; color:#111; }
  header { border-bottom:1px solid #b9b9b9; padding-bottom:10px; margin-bottom:16px; }
  h1 { font-size:17pt; margin:0 0 3px; letter-spacing:-.01em; }
  .headline { font-size:9.6pt; font-weight:700; color:#3a3a3a; margin:0 0 4px; }
  .contact { font-size:8.6pt; color:#333; margin:0; }
  .to { font-size:9.4pt; margin:0 0 14px; }
  .to b { display:block; font-size:10pt; }
  p { margin:0 0 8px; }
  .sign { margin-top:16px; font-size:9.6pt; }
  .sign b { display:block; margin-top:2px; }
</style></head><body>

<header>
  <h1>Javier Ponz Prado</h1>
  <p class="headline">Technical support &amp; customer success &middot; agent operations &middot; Aberdeen, Scotland, United Kingdom</p>
  <p class="contact">nerion89@gmail.com &middot; +34 691 347 651 &middot; github.com/ponzgpt &middot; linkedin.com/in/javierponz &middot; javierponz.technoir.cloud</p>
</header>

<p class="to"><b>Nous Research — recruiting@nousresearch.com</b>
Re: Technical Support &amp; Customer Success — open application</p>

${paragraphs.map((p) => `<p>${p}</p>`).join('\n')}

<p class="sign">Thank you for reading.
<b>Javier Ponz Prado</b></p>

</body></html>`;

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!chrome) {
  console.error('No Chrome or Chromium found. Tried:\n  ' + CHROME_CANDIDATES.join('\n  '));
  process.exit(1);
}

const tmp = mkdtempSync(join(tmpdir(), 'cl-'));
const src = join(tmp, 'letter.html');
writeFileSync(src, html, 'utf8');

try {
  execFileSync(chrome, [
    '--headless', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${out}`, `file://${src}`
  ], { stdio: 'pipe' });
} catch (err) {
  console.error('Chrome failed to render the PDF:', err.message);
  process.exit(1);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (!existsSync(out)) {
  console.error('Chrome reported success but no PDF was written.');
  process.exit(1);
}
console.log(`wrote ${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);

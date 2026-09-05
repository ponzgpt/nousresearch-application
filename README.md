# An open application to Nous Research

A single-page, personal application, published on my own domain at
[nousresearch.technoir.cloud](https://nousresearch.technoir.cloud/).

**Not affiliated with Nous Research.** No logo, no endorsement, no claim of
any relationship. Their careers page is at <https://nousresearch.com/careers>.

The visual language is a deliberate, respectful echo of Nous's own published
site — white ground, cyan monospace, dashed rules, output/seed metadata — as
a way of showing I read carefully. All words and content are mine.

Static HTML, no build step. Deploys as nginx behind Traefik, same pattern as
the rest of my sites.

```bash
docker build -t nous-application . && docker run --rm -p 8080:80 nous-application
```

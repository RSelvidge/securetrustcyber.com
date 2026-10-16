# IndexNow

The root verification text file in `cloudflare/` is copied into `dist/` by the
existing build. `tools/indexnow.config.json` points to this public ownership
proof. It is not a Bing account password or a privileged Cloudflare credential.
Keep its filename and content identical when deploying.

The **Notify IndexNow after production deployment** GitHub Actions workflow runs
on production (`master`) pushes. It builds the last successfully notified version
and the new version, tests the new version, waits for the matching **Cloudflare
Pages** check to succeed, verifies the live ownership file, then posts changed
sitemap URLs to `https://api.indexnow.org/indexnow`. No submissions occur during
local builds or preview deployments.

The previous successful workflow run supplies the comparison baseline, so failed
notifications can be retried without losing intervening changes. On the first
run it uses the push's previous commit. The workflow can also be run manually on
master in GitHub Actions. Serialized runs avoid concurrent notifications.

Rendered HTML comparisons include asset version hashes, so changing a page's
image also marks the page as changed. Removed URLs are included; noindex and
non-sitemap pages are excluded. The site uses its existing canonical URLs
(`.html`, with `/` for the home page). Up to 10,000 URLs are sent per request.

## Manual notification

Build the site, then preview the URLs to notify:

```powershell
npm run build
npm run indexnow -- --dry-run --url https://securetrustcyber.com/products/fwaas.html --url https://securetrustcyber.com/products/casb.html
```

Remove `--dry-run` to submit after those changes are live. To compare builds:

```powershell
npm run indexnow -- --dry-run --previous C:/path/to/previous/dist
```

Never notify all historical sitemap URLs merely to initialize IndexNow. Notify
pages added, changed or deleted since adoption. HTTP 200 reports successful
submission; HTTP 202 reports receipt with key validation pending. Neither means
the page is indexed. Check Bing Webmaster Tools for indexing and receipt history.
HTTP 400/403/422 fails the command; HTTP 429 and 5xx receive at most two bounded
retries. A missing or mismatched live key blocks submissions.

Sources: https://www.bing.com/indexnow/getstarted and
https://www.indexnow.org/documentation.

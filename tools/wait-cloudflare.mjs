// Run only in GitHub Actions, after a push to the production branch.
const { GITHUB_REPOSITORY: repo, GITHUB_SHA: sha, GH_TOKEN: token } = process.env;
if (!repo || !sha || !token) throw new Error('GitHub repository, commit and token are required.');
const deadline = Date.now() + 12 * 60 * 1000;
while (Date.now() < deadline) {
  const response = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}/check-runs?per_page=100`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`Cannot read deployment checks: HTTP ${response.status}.`);
  const checks = (await response.json()).check_runs.filter((check) => check.name === 'Cloudflare Pages');
  const check = checks.sort((a, b) => b.id - a.id)[0];
  if (check?.status === 'completed') {
    if (check.conclusion !== 'success') throw new Error(`Cloudflare deployment did not succeed: ${check.conclusion}. No IndexNow submission made.`);
    console.log('Cloudflare production deployment succeeded.');
    process.exit(0);
  }
  console.log('Waiting for the Cloudflare production deployment…');
  await new Promise((resolve) => setTimeout(resolve, 15000));
}
throw new Error('Timed out waiting for Cloudflare. No IndexNow submission made.');

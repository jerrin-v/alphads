#!/bin/bash
# Rewrites the "Last 3 pushes" table in README.md (between the PUSH-LOG markers)
# from GitHub's push history for main. Pushes made by this log itself are skipped.
# Needs GH_TOKEN (the workflow passes github.token). Times are shown in UAE time.
set -euo pipefail
R="${GITHUB_REPOSITORY:-jerrin-v/alphads}"
TAB=$(mktemp)
HIST=$(mktemp)
printf '| # | Pushed (UAE time, UTC+4) | Commit | What changed | Site |\n|---|---|---|---|---|\n' > "$TAB"
# The commits in main today (sha, author time, subject). GitHub's push log keeps pushes whose commits
# were rewritten later (the history was cut on 15 Nov 2026): such a push links to the commit of today's
# history with the same author time and subject, and a push with no such commit is left out.
gh api "repos/$R/commits?sha=main&per_page=100" \
  --jq '.[] | [.sha, .commit.author.date, (.commit.message | split("\n")[0])] | @tsv' > "$HIST"
n=0
while IFS=$'\t' read -r ts sha; do
  adate=""; msg=""
  IFS=$'\t' read -r adate msg < <(gh api "repos/$R/commits/$sha" \
    --jq '[.commit.author.date, (.commit.message | split("\n")[0])] | @tsv' 2>/dev/null) || true
  case "$msg" in "Update push log"*) continue ;; esac
  cur=$(S="$sha" D="$adate" M="$msg" awk -F'\t' '$1 == ENVIRON["S"] || ($2 == ENVIRON["D"] && $3 == ENVIRON["M"] && ENVIRON["M"] != "") { print $1; exit }' "$HIST")
  [ -n "$cur" ] || continue
  n=$((n+1))
  when=$(TZ=Asia/Dubai date -d "$ts" '+%a %d %b %Y, %H:%M:%S')
  run=$(gh api "repos/$R/actions/runs?head_sha=$sha&per_page=30" \
    --jq '[.workflow_runs[] | select(.name=="Publish site")] | sort_by(.created_at) | last | if . == null then "" else .status + ":" + (.conclusion // "") end')
  case "$run" in
    "")                  site="No site change" ;;
    completed:success)   site="✅ Published" ;;
    completed:*)         site="❌ Publish ${run#completed:}" ;;
    *)                   site="⏳ Publishing" ;;
  esac
  msg=${msg//|/\\|}
  printf '| %s | %s | [`%s`](https://github.com/%s/commit/%s) | %s | %s |\n' "$n" "$when" "${cur:0:7}" "$R" "$cur" "$msg" "$site" >> "$TAB"
  [ "$n" -ge 3 ] && break
done < <(gh api "repos/$R/activity?ref=refs/heads/main&activity_type=push&per_page=30" \
  --jq '.[] | select(.actor.login != "github-actions[bot]") | [.timestamp, .after] | @tsv')
python3 - README.md "$TAB" <<'PY'
import sys, re
p, t = sys.argv[1], open(sys.argv[2]).read()
s = open(p).read()
s2, k = re.subn(r'(<!-- PUSH-LOG:START -->)\n.*?(<!-- PUSH-LOG:END -->)', lambda m: m.group(1) + '\n' + t.rstrip('\n') + '\n' + m.group(2), s, flags=re.S)
assert k == 1, "PUSH-LOG markers not found"
open(p, 'w').write(s2)
PY
rm -f "$TAB" "$HIST"

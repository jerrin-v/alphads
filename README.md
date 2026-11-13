# Alpha Design System — Website (password-protected)

Website: **https://jerrin-v.github.io/alphads/** — the password-protected GitHub edition of the Alpha Design System documentation site ([design-system.alphaxdev.online](https://design-system.alphaxdev.online)), designed by Jerrin Varghese, UX UI Design Department, Alpha X.

## Last 3 pushes

<!-- PUSH-LOG:START -->
| # | Pushed (UAE time, UTC+4) | Commit | What changed | Site |
|---|---|---|---|---|
| 1 | Fri 13 Nov 2026, 12:34:03 | [`edce482`](https://github.com/jerrin-v/alphads/commit/edce4822f4816555483277bf4382ae615f8b67fc) | Site backup v1.59.04 from GitLab 147d7c8 | ⏳ Publishing |
| 2 | Fri 13 Nov 2026, 11:16:54 | [`e8633ef`](https://github.com/jerrin-v/alphads/commit/e8633efe204a12d3a28a14f397d3236526f3894c) | Site backup v1.59.04 from GitLab 43b88c2 | ✅ Published |
| 3 | Thu 12 Nov 2026, 15:42:27 | [`850c6ee`](https://github.com/jerrin-v/alphads/commit/850c6eeadeb00dbbea31e96bd64439eb0863dbb0) | Site backup v1.59.04 from GitLab 18d9e12 | ✅ Published |
<!-- PUSH-LOG:END -->

Updated automatically after every push and every site publish (workflow **Update push log**).

## What's in this repo

- `backup/alpha-ds-site.tar.gz.age` — every file of the site (pages, data, images, plugin screens, fonts, server and CI files), sealed with [age](https://age-encryption.org).
- `backup/BUILD.txt` — which Alpha DS release and GitLab commit the sealed backup holds, and when it was packed.
- `keys/backup-recipient.txt` — the public key the backup is sealed to. It can't open anything.
- `tools/` and `.github/workflows/publish.yml` — the sign-in page script and the publishing workflow.
- The working source lives on the Alpha X GitLab (`design-system/design-system`). Every site release there is mirrored here as a new sealed backup.
- `.github/workflows/push-log.yml` — keeps the **Last 3 pushes** table above up to date.

**If the GitLab repository is ever lost, see [RESTORE.md](RESTORE.md)**: open the sealed backup to get the complete GitLab repository at the commit named in `BUILD.txt`.

---

© 2026 Alpha X · Designed by Jerrin Varghese. All rights reserved — see [LICENSE](LICENSE).

# Alpha Design System — Website (password-protected)

Website: **https://jerrin-v.github.io/alphads/** — the password-protected GitHub edition of the Alpha Design System documentation site ([design-system.alphaxdev.online](https://design-system.alphaxdev.online)), designed by Jerrin Varghese, UX UI Design Department, Alpha X.

## Last 3 pushes

<!-- PUSH-LOG:START -->
| # | Pushed (UAE time, UTC+4) | Commit | What changed | Site |
|---|---|---|---|---|
| 1 | Fri 20 Nov 2026, 17:41:29 | [`7ab9d22`](https://github.com/jerrin-v/alphads/commit/7ab9d22c8cb18f97340bf882f97410ce01f8e5c2) | Site backup v1.59.04 from GitLab 8e0db8d | ✅ Published |
| 2 | Fri 20 Nov 2026, 16:40:09 | [`12f006a`](https://github.com/jerrin-v/alphads/commit/12f006a1884ad665f06b9bb5218095d7eb02804b) | Site backup v1.59.04 from GitLab f6a2f99 | ✅ Published |
| 3 | Wed 18 Nov 2026, 10:07:03 | [`c054607`](https://github.com/jerrin-v/alphads/commit/c05460720861f6f794f512339a32d1d012b10782) | Site backup v1.59.04 from GitLab 69e7809 | ✅ Published |
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

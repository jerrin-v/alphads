# Alpha Design System — Website (password-protected)

Website: **https://jerrin-v.github.io/alphads/** — the password-protected GitHub edition of the Alpha Design System documentation site ([design-system.alphaxdev.online](https://design-system.alphaxdev.online)), designed by Jerrin Varghese, UX UI Design Department, Alpha X.

This repo holds the site only in sealed form (`backup/alpha-ds-site.tar.gz.age`). On every update, the **Publish site** workflow opens it with the `SITE_BACKUP_KEY` secret, locks the page and its data with the `SITE_PASSWORD` secret and publishes it to GitHub Pages. Nothing readable is stored here.

## Last 3 pushes

<!-- PUSH-LOG:START -->
| # | Pushed (UAE time, UTC+4) | Commit | What changed | Site |
|---|---|---|---|---|
| 1 | Fri 13 Nov 2026, 11:16:54 | [`b18e9ee`](https://github.com/jerrin-v/alphads/commit/b18e9ee86bbe770b6f863aa24dbebfce4688e079) | Site backup v1.59.04 from GitLab 43b88c2 | ✅ Published |
| 2 | Thu 12 Nov 2026, 15:42:27 | [`850c6ee`](https://github.com/jerrin-v/alphads/commit/850c6eeadeb00dbbea31e96bd64439eb0863dbb0) | Site backup v1.59.04 from GitLab 18d9e12 | ✅ Published |
| 3 | Wed 11 Nov 2026, 17:00:04 | [`9ff5983`](https://github.com/jerrin-v/alphads/commit/9ff5983ac8a31561bde973311351912b11479f99) | Site backup v1.59.04 from GitLab 1274c1a | ✅ Published |
<!-- PUSH-LOG:END -->

Updated automatically after every push and every site publish (workflow **Update push log**).

## Change the password (works even if you forgot the old one)

1. **Settings → Secrets and variables → Actions → `SITE_PASSWORD` → Update** (type the new password, at least 8 characters, save).
2. **Actions → Publish site → Run workflow → Run workflow.**
3. About 1–2 minutes later the new password is live and the old one stops working.

## One-time setup

- Secrets: `SITE_BACKUP_KEY` (the private key file, pasted whole) and `SITE_PASSWORD`.
- **Settings → Pages → Build and deployment → Source: GitHub Actions.**

Visitors stay signed in for the open tab. Ticking "Remember me" keeps them signed in until midnight in that browser. Adding `?signout` to the address signs out.

## What's in this repo

- `backup/alpha-ds-site.tar.gz.age` — every file of the site (pages, data, images, plugin screens, fonts, server and CI files), sealed with [age](https://age-encryption.org). Only `SITE_BACKUP_KEY` can open it.
- `backup/BUILD.txt` — which Alpha DS release and GitLab commit the sealed backup holds, and when it was packed.
- `keys/backup-recipient.txt` — the public key the backup is sealed to. It can't open anything.
- `tools/` and `.github/workflows/publish.yml` — the sign-in page script and the publishing workflow.
- The working source lives on the Alpha X GitLab (`design-system/design-system`). Every site release there is mirrored here as a new sealed backup.
- `.github/workflows/push-log.yml` — keeps the **Last 3 pushes** table above up to date.

On the published site, the page and its data (`*.json`) are encrypted with the password (AES-256-GCM). Images and fonts are served as plain files, so anyone with an image's exact link can open it; all page text stays locked.

## Restore

If the GitLab repository is ever lost, open the backup with the private key:

```
age -d -i SITE_BACKUP_KEY.txt backup/alpha-ds-site.tar.gz.age | tar -xz -C alpha-ds-site
```

That gives the complete GitLab repository at the commit named in `BUILD.txt`, ready to push back or serve as is.

No passwords or private keys are stored in this repository.

---

© 2026 Alpha X · Designed by Jerrin Varghese. All rights reserved — see [LICENSE](LICENSE).

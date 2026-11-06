# Alpha Design System website — backup

Encrypted backup of the Alpha Design System documentation site by Jerrin Varghese (UX UI Design Department, Alpha X). The working repository is on the Alpha X GitLab; this copy is updated with every site release.

- `backup/alpha-ds-site.tar.gz.age` holds every file of the site, encrypted with [age](https://age-encryption.org). Only the private backup key can open it.
- `backup/BUILD.txt` says which release and GitLab commit the backup holds.
- `keys/backup-recipient.txt` is the public key that backups are encrypted to. It can't decrypt anything.
- `.github/workflows/publish.yml` and `tools/` publish the site to GitHub Pages behind a sign-in. The page and its data are encrypted; only images and fonts are served as plain files.

No passwords or private keys are stored in this repository.

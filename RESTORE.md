# Restore the Alpha DS website from this backup

If the GitLab repository is ever lost, open the backup with the private key. Install [age](https://age-encryption.org) first: `brew install age` on a Mac, `apt-get install age` on Linux.

```sh
mkdir alpha-ds-site
age -d -i /path/to/private-key.txt backup/alpha-ds-site.tar.gz.age | tar -xz -C alpha-ds-site
```

That gives the complete GitLab repository at the commit named in `backup/BUILD.txt`, ready to push back or serve as is.

No passwords or private keys are stored in this repository.

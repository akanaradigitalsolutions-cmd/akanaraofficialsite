# Auto-deploy: Git → Hostinger

Every time code is pushed to the branch **`claude/optimistic-hypatia-7sdlup`**, GitHub
automatically uploads the site to your Hostinger `public_html` over FTP. No more manual
zip uploads. (Config lives in `.github/workflows/deploy.yml`.)

You only have to set this up **once**.

---

## 1. Get your FTP details from Hostinger
hPanel → **Files → FTP Accounts**. Note (or create an account and note):

| You need | Example |
|----------|---------|
| **FTP hostname / IP** | `ftp.akanara.com` or the IP shown (e.g. `123.45.67.89`) |
| **FTP username** | `u345843814.akanara` |
| **FTP password** | (set/reset it here and copy it) |

> Tip: the account's directory must be `public_html` (the site root). Most main FTP
> accounts already are.

## 2. Add them to GitHub as secrets
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.
Add these **three** (names must match exactly):

- `FTP_HOST` → the hostname/IP
- `FTP_USERNAME` → the username
- `FTP_PASSWORD` → the password

Secrets are encrypted and never shown in logs. **Never** put the password in a file.

## 3. Prepare `public_html` once (clean slate)
So the live site matches the repo exactly, make sure `public_html` contains only the
site (or is empty). If any old WordPress files or `assets.5432`-style duplicates are
still there, delete them now (keep folders starting with a dot, like `.well-known`).
After the first deploy, the pipeline keeps everything in sync automatically.

## 4. Deploy
- **Automatic:** push any change to the branch → it deploys in ~1 minute.
- **Manual:** GitHub → **Actions → Deploy to Hostinger → Run workflow**.

Watch progress in the **Actions** tab. Green check = live. Refresh
`akanara.com` (Ctrl/Cmd+Shift+R).

---

## Notes
- **Protocol:** set to `ftps` (secure). If Hostinger rejects it, change `protocol: ftps`
  to `protocol: ftp` in `.github/workflows/deploy.yml`.
- **What gets published:** everything in the repo **except** dev-only files
  (this file, `README.md`, `IMAGES.md`, `.github/`, logo source, etc. — see the
  `exclude` list in the workflow).
- **First run fails?** Almost always a wrong secret. Re-check `FTP_HOST` (no `ftp://`
  prefix, no trailing slash) and the username/password, then re-run.
- **Switching the production branch to `main` later** is a one-line change in the
  workflow's `branches:` list.

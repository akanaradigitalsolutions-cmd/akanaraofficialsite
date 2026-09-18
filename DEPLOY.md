# Deploy: Hostinger built-in Git

Hostinger pulls the site straight from GitHub — **no FTP, no secrets, no build step.**
This is the method we use (the old GitHub Action → FTP approach was removed because the
Single plan has no SSH and FTP was timing out).

---

## One-time setup

1. hPanel → **Tingkat lanjut (Advanced) → GIT**.
2. Click **Hubungkan dengan GitHub** and authorize Hostinger to access the repo
   `akanaradigitalsolutions-cmd/akanaraofficialsite` (it's private — the GitHub
   authorization is what grants access).
3. Create the deployment with:
   | Field | Value |
   |-------|-------|
   | **Repository** | `akanaradigitalsolutions-cmd/akanaraofficialsite` |
   | **Branch** | `claude/optimistic-hypatia-7sdlup` |
   | **Directory / install path** | `public_html` |

   > ⚠️ The directory **must be `public_html`** (the site root). If it deploys into a
   > subfolder, `akanara.com` won't show the site.

4. **Deploy.** Hostinger clones the repo into `public_html` and the site goes live.

> **If Hostinger says the folder must be empty:** first delete the old contents of
> `public_html` (any leftover WordPress files and `assets.XXXX` / `css.XXXX` duplicates —
> keep folders that start with a dot, like `.well-known`), then deploy.

## Auto-deploy on every push

Connecting through GitHub usually turns on **auto-deployment** automatically (Hostinger
installs a webhook). If pushes don't update the site on their own:

- In the GIT page, find this deployment's **webhook URL** and copy it.
- GitHub → repo **Settings → Webhooks → Add webhook** → paste the URL,
  Content type `application/json`, "Just the push event", Active. Save.

After that, **every push to `claude/optimistic-hypatia-7sdlup` updates the live site**
in under a minute. (There's also a manual **Deploy / Pull** button on the GIT page.)

## Notes

- The whole repo is cloned into `public_html`. Web access to `.git`, `README.md`,
  `IMAGES.md`, and `DEPLOY.md` is blocked in `.htaccess`, so none of it is exposed.
- To go live from a different branch later (e.g. `main`), change the branch on the
  Hostinger GIT deployment — no code change needed.
- You can safely delete the old `FTP_HOST` / `FTP_USERNAME` / `FTP_PASSWORD` secrets in
  GitHub → Settings → Secrets — they're no longer used.

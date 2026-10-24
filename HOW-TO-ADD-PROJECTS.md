# How to update your portfolio (no coding needed)

Everything on the site — projects, photo, About text, skills, services, social links — is edited from the **Portfolio Editor**:

**https://YOUR-SITE.vercel.app/admin/**

When you click **Publish**, your changes are saved and the website updates by itself in about **1–2 minutes**. Refresh the site to see them.

---

## Add a new project

1. Go to `/admin/` and click **Login with GitHub**.
2. Click **Projects** → **New Project**.
3. Fill in:
   - **Title**: the project's name.
   - **Type**: pick one:
     - **Image / Artwork**: a drawing, painting, render or 3D design picture.
     - **Video / Animation**: an animation, 3D turntable, showreel or any video.
     - **3D Model (interactive)**: a `.glb` file that visitors can spin and zoom.
   - Then upload the files for that type (see the table below).
   - **Description** and **Software used** (optional, but they look nice).
4. Click **Publish** → **Publish now** (top of the page).

| Type | What to upload | Notes |
|---|---|---|
| Image / Artwork | **Image / Thumbnail**: your artwork | JPG / PNG / WEBP, under ~2 MB is best |
| Video / Animation | **Video file** (.mp4) **or** a **YouTube/Vimeo link** | Uploads must be under 50 MB. Longer videos: put them on YouTube and paste the link |
| | **Image / Thumbnail** (optional) | The cover picture in the gallery. If empty, the video's first frame is used |
| 3D Model | **3D model file** (.glb) | Under 25 MB. See below for how to export from Blender |
| | **Image / Thumbnail** (optional) | A picture of the model for the gallery card |

### Exporting a 3D model from Blender
`File → Export → glTF 2.0 (.glb/.gltf)` → set **Format** to **glTF Binary (.glb)** → Export.
Animations in the file play automatically on the website.

## Edit, hide, reorder or delete a project
- **Edit**: Projects → click the project → change things → Publish.
- **Hide without deleting**: turn off **Show on website**.
- **Reorder**: projects are shown newest **Date** first. Change the date to move one up or down.
- **Delete**: open the project → **Delete entry** (top right).

## Change your name, photo, About text, contacts, skills or services
Click **Site Settings**, then:
- **Profile & Contact**: logo, name, tagline, header video, About photo & text, email, phone, social links.
- **Skills**: the two scrolling rows of skills and software.
- **Services & Commissions**: the service cards.

## Tips
- File names: use simple names like `dragon-turntable.mp4` (no special characters).
- If something doesn't show up, wait 2 minutes and refresh. Still nothing? Check that the right **Type** is picked and the matching file was uploaded.
- Nothing you do in the editor can break the site's code. Every change is saved in history, so mistakes can be undone.

---

## One-time setup (for whoever manages the GitHub repo / Vercel)

The editor saves changes to the GitHub repo `JohnRey-POGI/Digital-Artist-Portfolio`, and Vercel redeploys from it.

1. **Give your brother write access to the repo**
   GitHub → repo → Settings → Collaborators → *Add people* → his GitHub username. He must accept the invite.
   (Make sure his Vercel project is connected to this repo and the `main` branch so pushes redeploy.)

2. **Create a GitHub OAuth App** (this powers the *Login with GitHub* button)
   GitHub → Settings → Developer settings → OAuth Apps → *New OAuth App*
   - Application name: `Portfolio Editor`
   - Homepage URL: `https://YOUR-SITE.vercel.app`
   - Authorization callback URL: `https://YOUR-SITE.vercel.app/api/callback`
   Create it, then click *Generate a new client secret*.

3. **Add the keys to Vercel**
   Vercel → the project → Settings → Environment Variables (Production):
   - `GITHUB_CLIENT_ID` = the OAuth app's Client ID
   - `GITHUB_CLIENT_SECRET` = the client secret
   Then **Redeploy** once so the new variables are picked up.

4. Open `https://YOUR-SITE.vercel.app/admin/` and log in to test.

Always use the main production domain for `/admin/` (the one used in the OAuth app), not a preview URL.

### Running the editor locally (developers)
```bash
npm run dev       # site at http://localhost:5173
npm run cms       # in a second terminal: local editor backend
```
Then open http://localhost:5173/admin/index.html. Local edits write straight to the files on disk (no GitHub login).

### Where things live
- `src/content/projects/*.json`: one file per project
- `src/content/settings.json`, `skills.json`, `services.json`: site settings
- `public/uploads/`: uploaded images, videos and models
- `public/admin/index.html`: editor configuration (fields, dropdown options)
- `api/auth.js`, `api/callback.js`: GitHub login for the editor

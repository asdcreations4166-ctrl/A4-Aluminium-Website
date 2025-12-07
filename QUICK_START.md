# Quick Start: Upload to GitHub

## 5-Minute Setup

### Step 1: Create Repository (2 min)

1. Go to https://github.com/new
2. Name: `A4-Aluminium-Website`
3. Visibility: **Public**
4. ✅ Add README
5. ✅ Add .gitignore (Node)
6. ✅ Add license (MIT)
7. Click **Create**

### Step 2: Get Repository URL (30 sec)

1. Click **Code** button
2. Copy HTTPS URL
3. Example: `https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git`

### Step 3: Upload Files (2 min 30 sec)

#### Option A: Command Line (Fastest)

```bash
# Open Command Prompt in project folder
cd "d:\project X\A4 Aluminium"

# Initialize and upload
git init
git add .
git commit -m "Initial commit: A4 Aluminium website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git
git push -u origin main

# Enter GitHub username and personal access token
```

#### Option B: GitHub Web

1. Go to your repository
2. Click **Add file** → **Upload files**
3. Drag & drop all files
4. Click **Commit changes**

#### Option C: GitHub Desktop

1. Download: https://desktop.github.com/
2. Sign in
3. Clone repository
4. Copy files to folder
5. Commit and push

### Step 4: Enable GitHub Pages (1 min)

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/(root)**
4. Click **Save**
5. Wait 1-2 minutes
6. Copy provided URL

### Step 5: Done! 🎉

Your site is live at:
```
https://YOUR-USERNAME.github.io/A4-Aluminium-Website/
```

## Verification Checklist

- ✅ Repository created
- ✅ Files uploaded
- ✅ GitHub Pages enabled
- ✅ Site accessible at URL
- ✅ All images loading
- ✅ Forms working
- ✅ Links functioning

## Next: Make Updates

```bash
# Edit files locally
# Then:

git add .
git commit -m "Update: description"
git push origin main

# Changes appear in 1-2 minutes
```

## Common Issues

| Issue | Solution |
|-------|----------|
| Site not showing | Wait 2-5 minutes, clear cache |
| Files not uploading | Check file sizes < 100MB |
| Broken links | Verify file paths match |
| Images not showing | Check image paths, use lowercase |
| Authentication failed | Use personal access token, not password |

## Getting Personal Access Token

1. https://github.com/settings/tokens
2. **Generate new token** → **classic**
3. Select: `repo`, `workflow`
4. Copy token (use as password)

## Support

- **Docs**: https://docs.github.com
- **A4 Aluminium**: enquiry.a4aluminium@gmail.com
- **Phone**: +91 9496612460

---

**Time**: ~5 minutes ⏱️
**Cost**: Free 💰
**Result**: Live website 🚀

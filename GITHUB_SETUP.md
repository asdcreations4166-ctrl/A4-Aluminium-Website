# GitHub Repository Setup Guide

## Prerequisites

- GitHub account (free: github.com)
- Git installed on your computer
- Project files ready

## Step 1: Create GitHub Repository

### Online (GitHub Web Interface)

1. **Go to GitHub**
   - Visit: https://github.com/new
   - Sign in to your account

2. **Create New Repository**
   - Repository name: `A4-Aluminium-Website`
   - Description: "Premium Aluminium Solutions Website"
   - Visibility: **Public** (for GitHub Pages)
   - Initialize with README: ✅ Yes
   - Add .gitignore: ✅ Node
   - Add license: ✅ MIT License
   - Click **Create Repository**

3. **Copy Repository URL**
   - Click **Code** button
   - Copy HTTPS URL: `https://github.com/your-username/A4-Aluminium-Website.git`

## Step 2: Upload Project Files

### Method 1: Git Command Line (Recommended)

#### Windows Setup

1. **Install Git**
   - Download: https://git-scm.com/download/win
   - Run installer
   - Accept defaults

2. **Open Command Prompt/PowerShell**
   ```bash
   # Navigate to project directory
   cd "d:\project X\A4 Aluminium"
   ```

3. **Initialize Git**
   ```bash
   # Initialize git repository
   git init
   
   # Add all files
   git add .
   
   # Create initial commit
   git commit -m "Initial commit: A4 Aluminium website"
   ```

4. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/your-username/A4-Aluminium-Website.git
   ```

5. **Upload to GitHub**
   ```bash
   # Push to main branch
   git branch -M main
   git push -u origin main
   ```

6. **Enter Credentials**
   - Username: Your GitHub username
   - Password: Your GitHub personal access token (not password)

#### Getting Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Select scopes:
   - ✅ repo (full control)
   - ✅ workflow
4. Click **Generate token**
5. Copy and save token (use as password)

### Method 2: GitHub Desktop (GUI)

1. **Download GitHub Desktop**
   - https://desktop.github.com/

2. **Install and Sign In**
   - Run installer
   - Sign in with GitHub account

3. **Clone Repository**
   - File → Clone Repository
   - Enter: `your-username/A4-Aluminium-Website`
   - Choose local path
   - Click **Clone**

4. **Add Project Files**
   - Copy all files to cloned folder
   - GitHub Desktop detects changes

5. **Commit and Push**
   - Summarize: "Initial commit"
   - Description: "Add project files"
   - Click **Commit to main**
   - Click **Push origin**

### Method 3: Web Upload (Simplest)

1. **Go to Your Repository**
   - https://github.com/your-username/A4-Aluminium-Website

2. **Upload Files**
   - Click **Add file** → **Upload files**
   - Drag and drop all files
   - Click **Commit changes**

## Step 3: Configure GitHub Pages

1. **Go to Repository Settings**
   - Click **Settings** tab
   - Select **Pages** (left sidebar)

2. **Enable GitHub Pages**
   - Source: Select **Deploy from a branch**
   - Branch: Select **main**
   - Folder: Select **/ (root)**
   - Click **Save**

3. **Wait for Deployment**
   - GitHub builds and deploys
   - Takes 1-2 minutes
   - URL appears at top: `https://username.github.io/A4-Aluminium-Website/`

4. **Test Your Site**
   - Click the provided URL
   - Verify site loads correctly

## Step 4: Configure Custom Domain (Optional)

1. **Update DNS Records**
   - Go to your domain registrar
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www
     Value: username.github.io
     ```

2. **Add Domain to GitHub**
   - Settings → Pages
   - Custom domain: `yourdomain.com`
   - Enforce HTTPS: ✅
   - Save

3. **Wait for DNS Propagation**
   - Usually 24-48 hours
   - Check status in Settings

## Step 5: Setup GitHub Actions

1. **Create Workflow File**
   - Already included in `.github/workflows/deploy.yml`
   - GitHub automatically runs on push

2. **Monitor Deployments**
   - Go to **Actions** tab
   - View deployment status
   - Check for errors

## Step 6: Protect Main Branch (Optional)

1. **Settings → Branches**
2. **Add Rule**
   - Branch name pattern: `main`
   - Require pull request reviews
   - Dismiss stale reviews
   - Click **Create**

## Maintenance

### Regular Updates

```bash
# Make changes to files
# Then:

git add .
git commit -m "Update: description of changes"
git push origin main
```

### Common Git Commands

```bash
# Check status
git status

# View commit history
git log

# Create new branch
git checkout -b feature/branch-name

# Switch branches
git checkout main

# Merge branch
git merge feature/branch-name

# Pull latest changes
git pull origin main

# Undo last commit
git revert HEAD
```

## Troubleshooting

### Changes Not Appearing

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Wait 5 minutes** for GitHub Pages rebuild
3. **Check Actions** tab for errors
4. **Verify** files uploaded correctly

### GitHub Pages Not Working

1. **Check Settings → Pages**
2. **Ensure** main branch selected
3. **Verify** index.html exists in root
4. **Check Actions** for deployment errors

### Authentication Issues

1. **Use Personal Access Token** (not password)
2. **Generate new token** if expired
3. **Check token scopes** include repo
4. **Update** stored credentials

### Large Files

1. **Don't** upload files > 100MB
2. **Optimize** images before upload
3. **Use** `.gitignore` to exclude large files
4. **Consider** GitHub LFS for media

## Performance Tips

1. **Minimize Images**
   - Use tools: TinyPNG, ImageOptim
   - Keep under 100KB per image

2. **Clean Git History**
   ```bash
   git gc --aggressive
   ```

3. **Monitor Repository Size**
   - Settings → Storage
   - Keep under 1GB free tier limit

4. **Use CDN Links**
   - External CSS/JS: `cdn.jsdelivr.net`
   - External fonts: `fonts.google.com`

## Security Checklist

- ✅ No API keys in files
- ✅ No sensitive data in commits
- ✅ Use `.gitignore` for secrets
- ✅ Enable branch protection
- ✅ Require review for changes
- ✅ Keep dependencies updated
- ✅ Monitor Actions for failures

## Next Steps

1. **Add collaborators** (Settings → Collaborators)
2. **Setup branch protection** (Settings → Branches)
3. **Enable issues** (Settings → General → Issues)
4. **Setup discussions** (Settings → General → Discussions)
5. **Add project board** (Projects tab)
6. **Monitor analytics** (Insights tab)

## Support

- GitHub Docs: https://docs.github.com
- GitHub Support: https://support.github.com
- Community Help: https://github.community

## Contact A4 Aluminium

- Email: enquiry.a4aluminium@gmail.com
- Phone: +91 9496612460
- WhatsApp: +91 9496612460

---

**Repository**: https://github.com/your-username/A4-Aluminium-Website
**Site**: https://your-username.github.io/A4-Aluminium-Website/
**Last Updated**: December 2024

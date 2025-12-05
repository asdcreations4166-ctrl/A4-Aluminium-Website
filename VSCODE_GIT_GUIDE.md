# VSCode Git Commands Guide

## Setup VSCode for Git

### 1. Install Git
- Download: https://git-scm.com/download/win
- Run installer, accept defaults
- Restart VSCode

### 2. Configure Git in VSCode

**Open Terminal** (Ctrl + `)

```bash
# Configure username
git config --global user.name "Your Name"

# Configure email
git config --global user.email "your-email@example.com"

# Verify configuration
git config --list
```

### 3. Install GitHub Extension (Optional)
- Click Extensions (Ctrl + Shift + X)
- Search: "GitHub"
- Install "GitHub Pull Requests and Issues"

---

## Initial Setup: First Time Upload

### Step 1: Initialize Repository

**Terminal** (Ctrl + `)

```bash
# Navigate to project folder
cd "d:\project X\A4 Aluminium"

# Initialize git
git init

# Check status
git status
```

**Expected Output:**
```
On branch master
No commits yet
Untracked files: (use "git add <file>..." to include in what will be committed)
        .github/
        .gitignore
        README.md
        ... (all files)
```

### Step 2: Add All Files

**Terminal**

```bash
# Add all files
git add .

# Verify files staged
git status
```

**Expected Output:**
```
On branch master
Initial commit
Changes to be committed:
  new file:   .github/workflows/deploy.yml
  new file:   README.md
  ... (all files)
```

### Step 3: Create Initial Commit

**Terminal**

```bash
# Create commit with message
git commit -m "Initial commit: A4 Aluminium website launch"
```

**Expected Output:**
```
[master (root-commit) abc1234] Initial commit: A4 Aluminium website launch
 45 files changed, 12345 insertions(+)
```

### Step 4: Rename Branch to Main

**Terminal**

```bash
# Rename branch to main
git branch -M main

# Verify branch name
git branch
```

**Expected Output:**
```
* main
```

### Step 5: Add Remote Repository

**Terminal**

```bash
# Add GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git

# Verify remote added
git remote -v
```

**Expected Output:**
```
origin  https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git (fetch)
origin  https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git (push)
```

### Step 6: Push to GitHub

**Terminal**

```bash
# Push to GitHub
git push -u origin main
```

**First Time Prompt:**
- Username: `YOUR-GITHUB-USERNAME`
- Password: `YOUR-PERSONAL-ACCESS-TOKEN` (NOT your password)

**Expected Output:**
```
Enumerating objects: 45, done.
Counting objects: 100% (45/45), done.
Delta compression using up to 8 threads
Compressing objects: 100% (42/42), done.
Writing objects: 100% (45/45), 456 KB/s, done.
Total 45 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Viewing deployment of github-pages deployment 1234567
remote: Waiting for deployment of github-pages deployment 1234567
To https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Regular Workflow: Making Updates

### Quick Method: Using VSCode UI

#### 1. Make Changes
- Edit files in VSCode
- Save files (Ctrl + S)

#### 2. Open Source Control
- Click **Source Control** icon (Ctrl + Shift + G)
- Or go to **View** → **Source Control**

#### 3. Stage Changes
- Click **+** next to file to stage
- Or click **+** in "Changes" to stage all

#### 4. Commit
- Type message in text box
- Click **Commit** (Ctrl + Enter)

#### 5. Sync/Push
- Click **Sync Changes**
- Or click **⇅** icon

---

### Terminal Method: Using Commands

#### 1. Check Status

**Terminal** (Ctrl + `)

```bash
# See what changed
git status
```

**Output Example:**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   index-ultra-professional.html
  modified:   styles-ultra.css

Untracked files:
  new file:   VSCODE_GIT_GUIDE.md
```

#### 2. Stage Changes

```bash
# Stage all changes
git add .

# Or stage specific file
git add index-ultra-professional.html

# Verify staged files
git status
```

**Output:**
```
Changes to be committed:
  modified:   index-ultra-professional.html
  modified:   styles-ultra.css
  new file:   VSCODE_GIT_GUIDE.md
```

#### 3. Create Commit

```bash
# Commit with message
git commit -m "Update: improved form validation and accessibility"

# Or with longer description
git commit -m "Update: improved form validation

- Added real-time validation feedback
- Improved accessibility with ARIA labels
- Fixed focus management
- Enhanced error messages"
```

**Output:**
```
[main abc5678] Update: improved form validation and accessibility
 3 files changed, 45 insertions(+), 12 deletions(-)
```

#### 4. Push to GitHub

```bash
# Push to GitHub
git push origin main

# Or simply
git push
```

**Output:**
```
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 3 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 789 bytes, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
To https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git
   abc1234..abc5678  main -> main
```

---

## Common Commit Messages

Use these formats for clarity:

```bash
# New Feature
git commit -m "Add: dark mode toggle feature"

# Bug Fix
git commit -m "Fix: form submission timeout issue"

# Update/Improvement
git commit -m "Update: improved mobile responsiveness"

# Refactor Code
git commit -m "Refactor: simplified form validation logic"

# Documentation
git commit -m "Docs: added deployment guide"

# Style/Formatting
git commit -m "Style: fixed CSS indentation and formatting"

# Performance
git commit -m "Perf: optimized image loading performance"
```

---

## Useful VSCode Git Commands

### View Commit History

**Terminal**

```bash
# View commit log
git log

# View log in one line
git log --oneline

# View last 5 commits
git log -5

# View with branch visualization
git log --graph --oneline --all
```

### View File Changes

**Terminal**

```bash
# See what changed in working directory
git diff

# See staged changes
git diff --staged

# Compare with previous version
git diff HEAD~1 index-ultra-professional.html
```

### Undo Changes

**Terminal**

```bash
# Discard local changes to file
git restore index-ultra-professional.html

# Unstage file
git restore --staged index-ultra-professional.html

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### View File History

**Terminal**

```bash
# View history of specific file
git log --oneline index-ultra-professional.html

# Show who changed each line
git blame index-ultra-professional.html

# Show specific commit details
git show abc5678
```

---

## VSCode Source Control UI Guide

### Left Sidebar (Source Control Icon)

**Icon**: Fork/Branch symbol (or Ctrl + Shift + G)

### Sections:

1. **Changes**
   - Modified files
   - Click file to view diff
   - Click **+** to stage

2. **Staged Changes**
   - Ready to commit
   - Click **-** to unstage

3. **Branches**
   - Current branch
   - Create new branch
   - Switch branches

4. **Stashes** (if any)
   - Temporarily saved changes

### Actions:

- **Commit** (Ctrl + Enter): Save staged changes
- **Sync Changes**: Push/Pull from GitHub
- **...** Menu: More options

---

## SSH Setup (Alternative to HTTPS)

If you prefer SSH over HTTPS:

**Terminal**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Accept default location (press Enter)
# Enter passphrase (or leave blank)

# Copy SSH key
type %userprofile%\.ssh\id_ed25519.pub
# Select and copy output
```

**Add to GitHub:**
1. https://github.com/settings/keys
2. Click **New SSH key**
3. Paste key
4. Title: "VSCode"
5. Click **Add SSH key**

**Update Git Config:**
```bash
git remote set-url origin git@github.com:YOUR-USERNAME/A4-Aluminium-Website.git
```

---

## Troubleshooting

### "Authentication Failed"

**Solution:**
```bash
# Use Personal Access Token, not password
# Generate token: https://github.com/settings/tokens
# Use token as password when prompted
```

### "Please configure git"

**Solution:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### "Connection timeout"

**Solution:**
```bash
# Check internet connection
# Try again with: git push origin main
# Check GitHub status: https://www.githubstatus.com
```

### "Push rejected"

**Solution:**
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### "Detached HEAD"

**Solution:**
```bash
# Switch back to main branch
git checkout main
```

### "Large files warning"

**Solution:**
```bash
# Add to .gitignore and remove from tracking
git rm --cached large-file.bin
git commit -m "Remove large file"
```

---

## Complete Quick Reference

### First Time Setup (Copy-Paste)

```bash
cd "d:\project X\A4 Aluminium"
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git init
git add .
git commit -m "Initial commit: A4 Aluminium website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git
git push -u origin main
```

### Regular Updates (Copy-Paste)

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

### Check Status

```bash
git status
git log --oneline -5
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Source Control | Ctrl + Shift + G |
| Terminal | Ctrl + ` |
| Commit | Ctrl + Enter |
| Git Log | View menu |
| Diff | Click file in Source Control |
| Blame | Click file, then Blame |

---

## Next Steps After Upload

1. ✅ Go to GitHub repository
2. ✅ Check **Actions** tab for deployment
3. ✅ Wait 1-2 minutes for site to go live
4. ✅ Visit: `https://YOUR-USERNAME.github.io/A4-Aluminium-Website/`
5. ✅ Make more updates using regular workflow

---

## Resources

- Git Docs: https://git-scm.com/docs
- GitHub Docs: https://docs.github.com
- VSCode Git: https://code.visualstudio.com/docs/sourcecontrol/overview
- Commit Conventions: https://www.conventionalcommits.org

---

**Last Updated**: December 2024
**Version**: 1.0
**Author**: A4 Aluminium Team

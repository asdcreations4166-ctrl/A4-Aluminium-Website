# Terminal Commands Quick Reference

## Open Terminal in VSCode

**Keyboard Shortcut**: `Ctrl + ` (backtick)

Or: **View** → **Terminal**

---

## Git Setup (One Time)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## First Upload to GitHub

Copy-paste these commands in order:

```bash
# 1. Navigate to project (if not already there)
cd "d:\project X\A4 Aluminium"

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "Initial commit: A4 Aluminium website"

# 5. Rename to main
git branch -M main

# 6. Add GitHub repository
git remote add origin https://github.com/YOUR-USERNAME/A4-Aluminium-Website.git

# 7. Push to GitHub
git push -u origin main
```

When prompted:
- Username: Your GitHub username
- Password: Your personal access token (NOT your password)

---

## Regular Updates (After Initial Upload)

```bash
# 1. Check what changed
git status

# 2. Stage all changes
git add .

# 3. Commit changes
git commit -m "Update: description of what changed"

# 4. Push to GitHub
git push origin main
```

---

## Individual File Commands

```bash
# Stage one file
git add filename.html

# Unstage file
git restore --staged filename.html

# See changes in one file
git diff filename.html

# Discard changes to file
git restore filename.html
```

---

## View History

```bash
# See recent commits
git log --oneline

# See last 5 commits with graph
git log --oneline -5 --graph

# See commits for specific file
git log --oneline index-ultra-professional.html
```

---

## Troubleshooting

```bash
# Check Git status
git status

# View remote URL
git remote -v

# See current branch
git branch

# View all branches
git branch -a

# Check last commit details
git show HEAD

# View differences in working directory
git diff
```

---

## File Navigation Commands

```bash
# List files in current folder
dir

# List all files including hidden
dir /a

# Change to project folder
cd "d:\project X\A4 Aluminium"

# Go up one folder
cd ..

# Go to home directory
cd %userprofile%

# Clear terminal
cls
```

---

## Useful Git Tricks

```bash
# Commit with longer message
git commit -m "Short description" -m "Longer description with more details"

# See unpushed commits
git log --oneline origin/main..main

# See unpulled commits
git log --oneline main..origin/main

# Count commits
git rev-list --all --count

# See file at previous commit
git show HEAD~1:filename.html

# Create a backup
git archive --format zip HEAD > backup.zip
```

---

## Copy-Paste Templates

### After Making Changes
```
git add .
git commit -m "Update: [description]"
git push origin main
```

### Check Status
```
git status
git log --oneline -5
```

### View Changes
```
git diff
git show HEAD
```

---

## Help Commands

```bash
# Get help on any git command
git help add
git help commit
git help push

# Check git version
git --version

# See all configured settings
git config --list

# See username and email
git config user.name
git config user.email
```

---

## Personal Access Token (One Time Setup)

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Select:
   - ✅ repo (all options)
   - ✅ workflow
   - ✅ admin:public_key
4. Click **Generate token**
5. **Copy and save** the token somewhere safe
6. Use this token as password when Git asks

---

## Still Need Help?

**Within VSCode:**
- Ctrl + Shift + G → Source Control panel
- Hover over files to see options
- Click file to see diff

**Command Help:**
- Type: `git help`
- Follow: https://git-scm.com/docs

**GitHub Support:**
- https://docs.github.com
- https://github.com/support

---

**Last Updated**: December 2024

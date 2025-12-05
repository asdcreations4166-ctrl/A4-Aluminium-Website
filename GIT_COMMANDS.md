# Essential Git Commands

## Initial Setup

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Verify configuration
git config --list
```

## First Time Upload

```bash
# Initialize repository
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: A4 Aluminium website"

# Rename branch to main
git branch -M main

# Add remote repository
git remote add origin https://github.com/USERNAME/A4-Aluminium-Website.git

# Push to GitHub
git push -u origin main
```

## Regular Workflow

```bash
# Check status
git status

# Add changes
git add .
git add filename.html  # specific file

# Create commit
git commit -m "Type: Description"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Commit Message Format

```
Type: Brief description (50 chars max)

Longer explanation if needed.
- Point 1
- Point 2

Closes #issue-number
```

**Types**:
- `Add`: New feature
- `Fix`: Bug fix
- `Update`: Update existing code
- `Refactor`: Code restructuring
- `Docs`: Documentation
- `Style`: Formatting/styling
- `Performance`: Performance improvement

## Branching

```bash
# Create new branch
git checkout -b feature/branch-name

# Switch branch
git checkout main
git checkout feature/branch-name

# List branches
git branch -a

# Delete branch
git branch -d feature/branch-name

# Merge branch
git merge feature/branch-name
```

## Viewing Changes

```bash
# View commit history
git log

# View specific file history
git log filename.html

# View changes in working directory
git diff

# View changes staged for commit
git diff --staged

# View specific commit
git show commit-hash
```

## Undoing Changes

```bash
# Discard local changes
git restore filename.html

# Unstage file
git reset filename.html

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert specific commit
git revert commit-hash
```

## Remote Operations

```bash
# View remote repositories
git remote -v

# Add remote
git remote add origin https://github.com/USERNAME/repo.git

# Change remote URL
git remote set-url origin https://github.com/USERNAME/new-repo.git

# Fetch changes
git fetch origin

# Pull changes
git pull origin main

# Push changes
git push origin main

# Push all branches
git push origin --all
```

## Advanced Commands

```bash
# Stash changes temporarily
git stash

# Apply stashed changes
git stash apply

# List stashed changes
git stash list

# Create patch file
git diff > changes.patch

# Apply patch
git apply changes.patch

# Rebase commits
git rebase -i HEAD~3

# Cherry-pick commit
git cherry-pick commit-hash

# Tag release
git tag v1.0.0
git push origin v1.0.0
```

## Debugging

```bash
# Find who changed line
git blame filename.html

# Search commit messages
git log --grep="search term"

# Search code changes
git log -S "search term"

# View file at specific commit
git show commit-hash:filename.html

# Find commits that removed text
git log -p -S "removed text"
```

## Performance

```bash
# Optimize repository
git gc

# Get repository size
git count-objects -v

# Clean untracked files
git clean -fd

# Archive repository
git archive --format zip HEAD > backup.zip
```

## Useful Aliases

```bash
# Create aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --graph --oneline --all"

# Usage
git co main
git br -a
git ci -m "message"
git st
git lg
```

## Troubleshooting

```bash
# Merge conflicts
# 1. Edit file and resolve conflicts
# 2. git add conflicted-file
# 3. git commit -m "Resolve merge conflict"

# Push rejected
git pull origin main
git push origin main

# Detached HEAD
git checkout main

# Lost commits
git reflog
git checkout lost-commit-hash

# Large file issues
# Add to .gitignore and recommit
git rm --cached large-file.bin
git commit -m "Remove large file"
```

## GitHub Specific

```bash
# Create GitHub token
# https://github.com/settings/tokens

# Clone repository
git clone https://github.com/USERNAME/repo.git

# Fork repository
# Click Fork button on GitHub, then:
git clone https://github.com/YOUR-USERNAME/repo.git

# Create pull request
git push origin feature/branch-name
# Then create PR on GitHub

# Sync fork with upstream
git remote add upstream https://github.com/ORIGINAL-OWNER/repo.git
git fetch upstream
git merge upstream/main
```

## Quick Reference

| Task | Command |
|------|---------|
| Status | `git status` |
| Add files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push origin main` |
| Pull | `git pull origin main` |
| View history | `git log` |
| Create branch | `git checkout -b feature-name` |
| Merge branch | `git merge feature-name` |
| Undo changes | `git restore filename` |
| View differences | `git diff` |

---

**More Help**: https://git-scm.com/docs
**GitHub Docs**: https://docs.github.com

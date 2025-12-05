# Deployment Troubleshooting Guide

## Build Logs Analysis

### Error: "No Output Directory named 'public' found"

**Cause**: Vercel expects `public/` folder for static site output

**Solution 1: Create vercel.json**
```json
{
  "outputDirectory": "./",
  "buildCommand": "echo 'Static site - no build needed'"
}
```

**Solution 2: Set in Vercel Dashboard**
1. Settings → General
2. Output Directory: `.` (or leave empty)
3. Save

**Solution 3: Use public folder**
```bash
# Copy files to public/
mkdir public
copy *.html public/
copy *.css public/
copy *.js public/
copy assets public/
```

---

## Build Log Messages Explained

### "Warning: Detected 'engines'"

**Message:**
```
Warning: Detected "engines": { "node": ">=14.0.0" } in your `package.json`
```

**Meaning**: Node version range could auto-upgrade

**Solution**:
In `package.json`, specify exact version:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

**Impact**: None (just a warning)

---

### "up to date in Xms"

**Meaning**: npm dependencies installed

**Expected**: Yes, normal message

---

### "Static site - no build needed"

**Meaning**: Your build script ran successfully

**Expected**: Yes, from our `package.json`

---

### "Error: No Output Directory"

**Cause**: Vercel can't find files to deploy

**Solutions**:

1. **Check vercel.json exists**
   ```bash
   ls vercel.json  # Windows: dir vercel.json
   ```

2. **Verify outputDirectory setting**
   ```json
   {
     "outputDirectory": "./"
   }
   ```

3. **Ensure files in root**
   ```
   d:\project X\A4 Aluminium\
   ├── index-ultra-professional.html
   ├── styles-ultra.css
   ├── script-ultra.js
   ├── vercel.json
   └── assets/
   ```

4. **Check .vercelignore**
   - Not excluding everything
   - Not blocking `.html` files

---

## Common Build Failures

### HTML Syntax Errors

**Error Message**: 
```
Parse error in index-ultra-professional.html
```

**Solution**:
1. Check for unclosed tags
2. Validate HTML: https://validator.w3.org/
3. Fix errors locally
4. Push to GitHub

**Quick Check**:
```bash
# Open file in VSCode
# Check for red underlines
# Fix any errors
```

---

### Missing Dependencies

**Error**:
```
Cannot find module 'xyz'
```

**Cause**: `package.json` lists missing package

**Solution**:
```bash
# In local project
npm install xyz

# Or update package.json manually
{
  "dependencies": {
    "xyz": "^1.0.0"
  }
}
```

---

### File Not Found

**Error**:
```
ENOENT: no such file or directory
```

**Cause**: Referenced file doesn't exist

**Examples**:
- Missing image: `assets/logo.png`
- Missing CSS: `styles.css`
- Wrong path: `./assets` vs `assets`

**Solution**:
1. Check file exists
2. Verify path is correct
3. Use lowercase filenames
4. Use relative paths

---

## Deployment Status

### Status: Building

**Meaning**: Vercel is building your project

**Time**: Usually 10-30 seconds

**Do**: Wait, don't refresh

---

### Status: Ready

**Meaning**: Deployment successful

**Next**: Visit deployment URL

---

### Status: Error

**Meaning**: Build failed

**Next**: 
1. Click deployment
2. Check logs
3. Find error message
4. Fix locally
5. Push to GitHub
6. Auto-redeploy

---

### Status: Queued

**Meaning**: Waiting for build server

**Time**: Usually < 1 minute

**Do**: Wait, other deployments may be ahead

---

## Performance Issues

### Slow Load Time

**Check**:
1. Vercel Analytics (see Core Web Vitals)
2. Image sizes
3. CSS/JS file sizes
4. Network requests

**Optimize**:
```bash
# Compress images
# Use tools like: TinyPNG, ImageOptim

# Check file sizes
ls -lh *.css *.js *.png *.jpg

# Goal: < 500KB total
```

---

### 404 Errors After Deployment

**Problem**: Pages not found

**Cause**: 
- Wrong file paths
- Missing HTML files
- Case sensitivity (Linux is case-sensitive)

**Solutions**:

1. **Homepage 404**
   ```json
   {
     "redirects": [
       {
         "source": "/",
         "destination": "/index-ultra-professional.html"
       }
     ]
   }
   ```

2. **Missing pages**
   - Check file exists: `ls products.html`
   - Check path in HTML is correct
   - Use lowercase filenames

3. **Image 404s**
   - Check `assets/` folder uploaded
   - Check image filename matches
   - Use lowercase: `logo.png` not `Logo.PNG`

---

## Testing Deployments Locally

Before pushing to GitHub:

```bash
# Start local server
npm start
# or
python -m http.server 8000

# Open browser
# http://localhost:8000
# or
# http://localhost:8000/index-ultra-professional.html

# Test:
- All links work
- Images display
- Forms function
- Mobile responsive
```

---

## Rollback to Previous Version

If new deployment breaks site:

**Method 1: Vercel Dashboard**
1. Go to Deployments
2. Find working version
3. Click **...** menu
4. Select **Promote to Production**

**Method 2: Git Rollback**
```bash
git revert HEAD
git push origin main

# Vercel auto-redeploys
```

---

## Force Redeploy

Without code changes:

**Via Dashboard:**
1. Select Deployment
2. Click **...** menu
3. Select **Redeploy**

**Via CLI:**
```bash
vercel --prod --force
```

**Via GitHub:**
- Any commit re-triggers deployment

---

## Check Deployment Logs

**Via Vercel Dashboard:**
1. Project → Deployments
2. Click deployment
3. View **Build Logs** tab
4. Scroll through output

**Via CLI:**
```bash
vercel logs [project-name]
vercel logs [project-name] --follow  # Real-time
```

---

## Environment Issues

### Missing Environment Variables

**Error**:
```
undefined or process.env.API_KEY is not set
```

**Solution**:
1. Settings → Environment Variables
2. Add: KEY = VALUE
3. Redeploy

**In Code**:
```javascript
const apiKey = process.env.API_KEY || 'default';
```

---

## Network Issues

### Deployment Times Out

**Cause**: 
- Large files
- Slow GitHub connection
- Vercel server busy

**Solution**:
```bash
# Retry deployment
vercel --prod

# Or via GitHub: Push again
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## Security Issues

### Exposed Secrets

**Problem**: API keys in code

**Solution**:
1. Remove from repository
2. Add to Environment Variables
3. Use in code: `process.env.KEY`

**Check**:
```bash
git log -p | grep "password\|key\|token"
```

---

## Frequently Asked Questions

**Q: How long does deployment take?**
A: 15-30 seconds typically

**Q: Can I schedule deployments?**
A: No, use CI/CD tools for scheduling

**Q: Can I preview before deploying?**
A: Yes, preview URLs for PRs

**Q: How do I use a custom domain?**
A: Add in Project Settings → Domains

**Q: Can I use subdomains?**
A: Yes, CNAME to `cname.vercel-dns.com`

---

## Contact Support

- **Vercel Status**: https://vercel.com/status
- **Support Page**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions
- **Documentation**: https://vercel.com/docs

---

**Last Updated**: December 2024
**Version**: 1.0

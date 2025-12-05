# Vercel Deployment Guide

## Overview

Vercel is a serverless platform perfect for hosting static websites like A4 Aluminium.

**Benefits:**
- ✅ Free tier with custom domains
- ✅ Automatic deployments from GitHub
- ✅ Global CDN
- ✅ SSL/HTTPS included
- ✅ Analytics included
- ✅ Environment variables
- ✅ Easy rollbacks

---

## Step 1: Create Vercel Account

1. Go to: https://vercel.com
2. Click **Sign Up**
3. Choose **GitHub** to sign up with your GitHub account
4. Authorize Vercel access to your GitHub repositories
5. Click **Create**

---

## Step 2: Import Repository

### Option A: Direct Import

1. Go to: https://vercel.com/new
2. Select **GitHub**
3. Find: `A4-Aluminium-Website`
4. Click **Import**
5. Click **Deploy**

### Option B: From Dashboard

1. Go to: https://vercel.com/dashboard
2. Click **New Project**
3. Select **GitHub** source
4. Search: `A4-Aluminium-Website`
5. Click **Import**
6. Click **Deploy**

---

## Step 3: Configure Project Settings

### During Import

**Project Name**: `a4-aluminium-website`

**Framework Preset**: `Other` (static site)

**Build Command**: (leave empty or use) `echo "Static site - no build needed"`

**Output Directory**: `./` (current directory)

**Install Command**: (leave empty)

### Click Deploy

---

## Step 4: Wait for Deployment

**Status Page:**
- Shows deployment progress
- Updates in real-time
- Shows any errors

**Typical Timeline:**
- Cloning: ~1 second
- Building: ~5-10 seconds
- Deploying: ~5 seconds
- **Total: ~15-20 seconds**

**Success Message:**
```
✅ Deployment Complete
Visit: https://a4-aluminium-website.vercel.app
```

---

## Step 5: Verify Deployment

1. Click the deployment link
2. Check all pages load correctly:
   - ✅ Homepage
   - ✅ Navigation links
   - ✅ Form submission
   - ✅ Images display
   - ✅ Responsive on mobile

---

## Custom Domain Setup

### Add Custom Domain

1. Go to **Project Settings** → **Domains**
2. Click **Add Domain**
3. Enter domain: `yourdomain.com`
4. Choose verification method:
   - **Nameservers**: Easiest (manage all DNS at Vercel)
   - **CNAME**: Keep existing registrar

### Nameservers Method (Recommended)

**At Vercel:**
- Copy nameservers provided

**At Your Registrar:**
1. Go to domain settings
2. Replace nameservers with Vercel's
3. Wait 24-48 hours for propagation

**Check Status:**
```bash
nslookup yourdomain.com
# Should resolve to Vercel IP
```

### CNAME Method

**At Your Registrar:**
1. Add CNAME record:
   ```
   Name: www
   Value: cname.vercel-dns.com
   ```

2. For root domain (@):
   ```
   Name: @
   Value: alias.vercel.sh
   ```

**At Vercel:**
- Verify ownership with TXT record if prompted

---

## Environment Variables

Add sensitive data safely:

1. **Project Settings** → **Environment Variables**
2. **Add New Variable**
3. **Key**: `API_KEY`
4. **Value**: Your API key
5. **Select Environments**: Production, Preview, Development
6. **Add**

**In Code:**
```javascript
const apiKey = process.env.API_KEY;
```

---

## Automatic Deployments

**Setup:**
- Vercel auto-deploys on every push to main branch

**Process:**
1. Push code to GitHub
2. Vercel webhook triggered
3. New deployment starts
4. GitHub shows deployment status

**Check Status:**
1. Go to **Vercel Dashboard**
2. Select project
3. View **Deployments** tab
4. Click deployment to see logs

---

## Vercel Functions (Serverless)

For contact form backend (optional):

**Create file:** `api/contact.js`

```javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle form submission
    const { email, message } = req.body;
    
    // Send email, save to database, etc.
    
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

**Use in Form:**
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, message })
});
```

---

## Performance Optimization

### Analytics

1. **Vercel Dashboard**
2. **Analytics** tab
3. View:
   - Page views
   - Load times
   - Core Web Vitals
   - Traffic sources

### Web Vitals

Monitor and improve:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Improve Performance:**
1. Optimize images
2. Minify CSS/JS
3. Use CDN for assets
4. Enable compression
5. Cache static files

---

## Troubleshooting

### Build Fails with "No Output Directory"

**Solution:**
Create `vercel.json`:
```json
{
  "outputDirectory": "./",
  "buildCommand": "echo 'Static site'"
}
```

### 404 Errors for Root Path

**Solution:**
In `vercel.json`:
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

### Images Not Loading

**Check:**
1. File paths are correct (lowercase)
2. Images in `assets/` folder
3. Use relative paths: `assets/image.jpg`
4. Not `./assets/image.jpg`

### Slow Performance

**Solution:**
1. Optimize images (< 100KB)
2. Enable caching in `vercel.json`
3. Use CDN for libraries
4. Check Analytics for bottlenecks

### Custom Domain Not Working

**Solution:**
1. Verify DNS propagation: https://dnschecker.org
2. Check Vercel domain settings
3. Try different nameservers
4. Contact domain registrar support

---

## Monitoring & Analytics

### Real-time Logs

```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs
```

### GitHub Integration

**Features:**
- Auto-deploy on push
- Deployment status in PR
- Preview deployments for branches
- Automatic rollback capability

**View:**
- GitHub PR comment with deployment URL
- Deploy preview for review before merging

---

## Rollback to Previous Version

1. **Vercel Dashboard** → **Deployments**
2. Find previous working deployment
3. Click **...** menu
4. Select **Promote to Production**
5. Confirm

---

## GitHub Pages vs Vercel

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| **Cost** | Free | Free + paid |
| **Speed** | Good | Excellent (CDN) |
| **Analytics** | No | Yes |
| **Custom Domain** | Yes | Yes |
| **Serverless Functions** | No | Yes |
| **Environment Variables** | No | Yes |
| **Preview Deployments** | No | Yes |
| **Setup Time** | 5 min | 5 min |

---

## Deployment Checklist

Before going live:

- ✅ All files uploaded
- ✅ No build errors
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Images display
- ✅ Forms submit
- ✅ Mobile responsive
- ✅ Custom domain configured
- ✅ HTTPS enabled
- ✅ Analytics configured

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure custom domain
3. ✅ Setup monitoring
4. ✅ Add Google Analytics
5. ✅ Monitor performance
6. ✅ Make updates and auto-deploy

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Status**: https://vercel.com/status
- **Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/next.js/discussions

---

## Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from local
vercel

# Production deployment
vercel --prod

# View logs
vercel logs [project-name]

# Set environment variables
vercel env add API_KEY

# List projects
vercel projects list
```

---

**Deployment URL**: https://a4-aluminium-website.vercel.app/
**Custom Domain**: yourdomain.com (when configured)
**Last Updated**: December 2024

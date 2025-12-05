# Deployment Guide

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Commit and Push**
   ```bash
   git add .
   git commit -m "Deploy: website updates"
   git push origin main
   ```

2. **GitHub Actions**
   - Automatically validates code
   - Runs Lighthouse performance tests
   - Deploys to GitHub Pages
   - Check Actions tab for status

3. **Access Your Site**
   ```
   https://asdcreations4166-ctrl.github.io/A4-Aluminium-Website/
   ```

### Manual Deployment

1. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Select main branch as source
   - Save

2. **Wait for Deployment**
   - GitHub will show deployment URL
   - Usually takes 1-2 minutes

## Custom Domain Setup

1. **Add Domain**
   - Go to Settings → Pages
   - Add custom domain: `yourdomain.com`

2. **DNS Configuration**
   - Update DNS records:
     ```
     CNAME: yourdomain.com → username.github.io
     ```

3. **Verify SSL**
   - Check "Enforce HTTPS"
   - Certificate auto-generated

## Performance Optimization

### Before Deployment

1. **Image Optimization**
   ```bash
   # Reduce image sizes
   # Recommended: <100KB per image
   ```

2. **Asset Minification**
   ```bash
   # CSS and JS already optimized
   # Verify in browser DevTools
   ```

3. **Testing**
   ```bash
   npm start
   # Test locally on http://localhost:8000
   ```

## Monitoring

### Lighthouse Reports
- GitHub Actions runs Lighthouse
- Check performance metrics
- Aim for 90+ scores

### Google Analytics
- Add tracking ID to script
- Monitor visitor behavior
- Track conversions

## Troubleshooting

### Site Not Loading
1. Check GitHub Actions workflow
2. Verify file paths are correct
3. Clear browser cache

### Performance Issues
1. Check image sizes
2. Verify CSS/JS files load
3. Use DevTools Network tab

### Custom Domain Not Working
1. Verify DNS records
2. Wait 24-48 hours for propagation
3. Clear browser cache

## Rollback

If deployment fails:

```bash
git revert <commit-hash>
git push origin main
```

## Environment Variables

GitHub Pages doesn't support server-side env vars.
Use client-side configuration only.

## Security

- ✅ HTTPS enforced
- ✅ CSP headers ready
- ✅ No sensitive data in repo
- ✅ API keys in Web3Forms service

## Contact

- Email: info@a4aluminium.com
- Phone: +91 9496612460
- Support: GitHub Issues

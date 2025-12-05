# GitHub Actions Workflows

## Overview

Automated workflows run on every push to validate and deploy your website.

## Available Workflows

### 1. Deploy to GitHub Pages (`deploy.yml`)

**Triggers**: Push to `main`, `master`, or `develop` branches

**Steps**:
1. Validate HTML files
2. Check file encoding
3. Validate internal links
4. Upload artifact
5. Deploy to GitHub Pages
6. Send notification

**Status**: Check **Actions** tab in GitHub

### 2. Lighthouse CI (`lighthouse.yml`)

**Triggers**: Push to `main` or `master`

**Tests**:
- Performance (90+)
- Accessibility (90+)
- Best Practices (90+)
- SEO (90+)

**Reports**: Available in Actions tab

## Viewing Workflow Status

1. Go to your repository
2. Click **Actions** tab
3. Select workflow to view details
4. Check logs for any issues

## Troubleshooting Workflows

### Deployment Failed

```bash
# Check logs in Actions tab
# Common issues:
# - Invalid HTML
# - Missing files
# - Permission issues
```

### Performance Score Low

1. Optimize images
2. Minify CSS/JS
3. Reduce fonts
4. Enable caching

### Build Stuck

1. Clear cache: Settings → Actions → Clear caches
2. Re-run workflow
3. Check for large files

## Manual Workflow Run

```bash
# Trigger workflow manually
git commit --allow-empty -m "Trigger workflow"
git push origin main
```

## Workflow Secrets

Add sensitive data safely:

1. **Settings → Secrets and variables → Actions**
2. **New repository secret**
3. Use in workflow: `${{ secrets.SECRET_NAME }}`

## Adding New Workflows

1. Create file in `.github/workflows/`
2. Name format: `workflow-name.yml`
3. Push to GitHub
4. Workflow auto-runs based on triggers

## Performance Optimization

### Caching

```yaml
- uses: actions/cache@v3
  with:
    path: ~/.cache
    key: ${{ runner.os }}-build-${{ hashFiles('**/*.lock') }}
```

### Parallel Jobs

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
  job2:
    runs-on: ubuntu-latest
```

## Monitoring

- **Actions tab**: Real-time status
- **Badges**: Add to README
- **Email notifications**: Settings → Notifications
- **Webhook**: Settings → Webhooks

## Best Practices

1. Keep workflows simple
2. Use caching for speed
3. Monitor job duration
4. Set reasonable timeouts
5. Document steps clearly
6. Test locally first

## Resources

- Workflow syntax: https://docs.github.com/en/actions/using-workflows
- Marketplace: https://github.com/marketplace?type=actions
- Examples: https://github.com/actions/starter-workflows

---

**Last Updated**: December 2024

# 📦 Publishing Mani-Calc to NPM

## ✅ Pre-Publishing Checklist

Before publishing, let's make sure everything is ready:

- [x] Package name: `mani-calc` (unique and available)
- [x] Version: `1.1.0`
- [x] All files committed to Git
- [x] README.md is comprehensive
- [x] LICENSE file exists (MIT)
- [x] package.json is properly configured
- [x] Tests are passing
- [x] Dependencies are installed

---

## 🚀 Step-by-Step Publishing Guide

### Step 1: Create NPM Account (if you don't have one)

Visit: https://www.npmjs.com/signup

Or use the command line:
```bash
npm adduser
```

### Step 2: Login to NPM

```bash
npm login
```

You'll be prompted for:
- **Username**: Your npm username
- **Password**: Your npm password
- **Email**: Your email (will be public)
- **One-time password**: If you have 2FA enabled

### Step 3: Verify Login

```bash
npm whoami
```

This should display your npm username.

### Step 4: Test Package Locally (Optional but Recommended)

```bash
# Create a tarball to see what will be published
npm pack

# This creates mani-calc-1.1.0.tgz
# You can inspect it to see what files will be included
```

### Step 5: Publish to NPM

```bash
npm publish
```

**That's it!** 🎉

---

## 📋 What Gets Published

Based on your `.gitignore` and `package.json`, these files will be published:

### ✅ Included
- `bin/` - CLI scripts
- `src/` - Source code
- `test/` - Tests
- `README.md` - Documentation
- `LICENSE` - MIT License
- `CHANGELOG.md` - Version history
- `QUICKSTART.md` - Quick start guide
- `EXAMPLES.md` - Usage examples
- `ARCHITECTURE.md` - Technical docs
- `CONTRIBUTING.md` - Contribution guide
- `OVERLAY_MODE.md` - Overlay mode docs
- `package.json` - Package config

### ❌ Excluded (via .gitignore)
- `node_modules/` - Dependencies
- `.vscode/` - Editor config
- `*.log` - Log files
- `.env` - Environment files

---

## 🎯 After Publishing

### 1. Verify Publication

Visit: https://www.npmjs.com/package/mani-calc

You should see your package!

### 2. Test Installation

```bash
# In a different directory
npm install -g mani-calc

# Test it
mani-calc "2 + 3 * 5"
```

### 3. Create GitHub Release

1. Go to: https://github.com/Maniredii/mani-calc/releases
2. Click "Create a new release"
3. Tag: `v1.1.0`
4. Title: `v1.1.0 - Overlay Mode Release`
5. Description: Copy from `RELEASE_NOTES_v1.1.0.md`
6. Publish release

### 4. Update README Badge

Your npm version badge will now work:
```markdown
[![npm version](https://img.shields.io/npm/v/mani-calc.svg)](https://www.npmjs.com/package/mani-calc)
```

---

## 🔄 Updating the Package (Future)

When you want to publish updates:

### 1. Update Version

```bash
# For bug fixes (1.1.0 → 1.1.1)
npm version patch

# For new features (1.1.0 → 1.2.0)
npm version minor

# For breaking changes (1.1.0 → 2.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git commit
- Creates a git tag

### 2. Push Changes

```bash
git push origin main --tags
```

### 3. Publish

```bash
npm publish
```

---

## 🛠️ Troubleshooting

### Error: "Package name already exists"

If `mani-calc` is taken, you'll need to:
1. Choose a different name (e.g., `@yourusername/mani-calc`)
2. Update `package.json` name field
3. Try publishing again

### Error: "You must be logged in"

```bash
npm login
```

### Error: "You do not have permission"

Make sure you're logged in as the correct user:
```bash
npm whoami
```

### Error: "Version already published"

You can't republish the same version. Bump the version:
```bash
npm version patch
npm publish
```

---

## 📊 NPM Package Stats

After publishing, you can track:

- **Downloads**: https://npm-stat.com/charts.html?package=mani-calc
- **Package page**: https://www.npmjs.com/package/mani-calc
- **Unpkg CDN**: https://unpkg.com/mani-calc/

---

## 🎯 Marketing After Publishing

### 1. Share on Social Media

**Twitter/X:**
```
🎉 Just published mani-calc v1.1.0 to npm!

⚡ Spotlight-style calculator for Windows
🎨 NEW: Floating search box (Alt+Space)
💻 System commands (sleep, lock, etc.)
🔄 Unit conversions & natural language

npm install -g mani-calc

https://www.npmjs.com/package/mani-calc
https://github.com/Maniredii/mani-calc
```

### 2. Post on Reddit

Subreddits:
- r/node
- r/javascript
- r/Windows
- r/productivity
- r/programming

### 3. Submit to Product Hunt

https://www.producthunt.com/posts/create

### 4. Write a Blog Post

Platforms:
- Dev.to
- Hashnode
- Medium

### 5. Create a Demo Video

Record yourself using:
- Windows Search integration
- Overlay mode
- System commands

Upload to YouTube and link in README.

---

## 📈 Success Metrics

Track these after publishing:

- **Week 1 Goal**: 100 downloads
- **Month 1 Goal**: 500 downloads
- **GitHub Stars**: 50+
- **Issues/PRs**: Community engagement

---

## 🎉 Ready to Publish!

Your package is production-ready. Just run:

```bash
npm login
npm publish
```

And you're live! 🚀

---

## 📞 Need Help?

- NPM Docs: https://docs.npmjs.com/
- Publishing Guide: https://docs.npmjs.com/cli/v8/commands/npm-publish
- Package Naming: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name

---

**Good luck with your launch!** 🎊

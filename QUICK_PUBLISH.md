# 🚀 Quick Publishing Commands

## Step 1: Login to NPM

```bash
npm login
```

**You'll be asked for:**
- Username
- Password  
- Email
- One-time password (if 2FA enabled)

**Don't have an npm account?**
Create one at: https://www.npmjs.com/signup

---

## Step 2: Verify Login

```bash
npm whoami
```

Should show your npm username.

---

## Step 3: Publish!

```bash
npm publish
```

**That's it!** Your package will be live at:
https://www.npmjs.com/package/mani-calc

---

## 🎉 After Publishing

### Test Installation
```bash
npm install -g mani-calc
mani-calc "2 + 3 * 5"
```

### Share the News!
```
🎉 mani-calc v1.1.0 is now on npm!

⚡ Spotlight for Windows
🎨 Floating search box (Alt+Space)
💻 System commands
🔄 Unit conversions

npm install -g mani-calc

https://www.npmjs.com/package/mani-calc
```

---

## 📊 Your Package Info

- **Name**: `mani-calc`
- **Version**: `1.1.0`
- **Description**: Spotlight-style instant calculator for Windows Search
- **License**: MIT
- **Repository**: https://github.com/Maniredii/mani-calc

---

## ⚠️ Important Notes

1. **Package name must be unique** - `mani-calc` should be available
2. **Can't unpublish** - After 24 hours, you can only deprecate
3. **Version must be unique** - Can't republish same version
4. **Email will be public** - Your npm email is visible

---

## 🔄 Future Updates

```bash
# Update version
npm version patch  # 1.1.0 → 1.1.1
npm version minor  # 1.1.0 → 1.2.0
npm version major  # 1.1.0 → 2.0.0

# Push to GitHub
git push origin main --tags

# Publish
npm publish
```

---

**Ready? Run these commands:**

```bash
npm login
npm publish
```

🚀 **Let's make mani-calc available to the world!**

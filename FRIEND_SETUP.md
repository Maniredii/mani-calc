# 🧮 Mani-Calc - Setup Guide for Friends

## What is Mani-Calc?

A **Spotlight-style instant calculator** for Windows! Press `Alt+Space` anywhere to get a floating search bar for:
- ✅ Quick math calculations
- ✅ Unit conversions (km to miles, kg to pounds)
- ✅ Currency conversion (USD to INR)
- ✅ Date calculations
- ✅ Programmer mode (hex, binary)
- ✅ Password generator
- ✅ And more!

---

## 🚀 Quick Setup (2 Minutes)

### Prerequisites
Make sure you have **Node.js** installed. If not, download it from: https://nodejs.org/

---

### Option 1: Double-Click Setup (Easiest) ⭐

1. **Double-click `SETUP.bat`**
2. Choose option **[3] Both** to install auto-start and start now
3. Done! Press `Alt+Space` to use!

---

### Option 2: Command Line Setup

Open **Command Prompt** or **PowerShell** in this folder:

```bash
# Step 1: Install dependencies (only first time)
npm install

# Step 2: Enable auto-start (runs when Windows boots)
npm run install-autostart

# Step 3: Start now
npm run overlay
```

---

## 📱 How to Use

1. **Press `Alt+Space`** anywhere on your computer
2. A floating search bar appears
3. Type your calculation:
   - `2 + 3 * 5` → Result: 17
   - `10 km to miles` → Result: 6.21 miles
   - `100 USD to INR` → Shows converted amount
   - `today + 30 days` → Shows the date
   - `255 to hex` → Result: 0xFF
4. **Press Enter** - result is copied to clipboard!
5. **Press Escape** to hide the overlay

---

## 🎯 Commands Reference

| Command | Example | Result |
|---------|---------|--------|
| Math | `sqrt(144)` | 12 |
| Percentage | `20% of 500` | 100 |
| Conversion | `5 miles to km` | 8.05 km |
| Currency | `100 USD to EUR` | Converted amount |
| Time | `time in tokyo` | Current time in Tokyo |
| Date | `today + 2 weeks` | Future date |
| Programmer | `255 to hex` | 0xFF |
| Password | `password 16` | Random 16-char password |
| Themes | `themes` | List available themes |

---

## ⚙️ Useful Commands

```bash
# Start the overlay
npm run overlay

# Stop the overlay
npm run stop

# Enable auto-start (runs when Windows boots)
npm run install-autostart

# Disable auto-start
npm run uninstall-autostart
```

---

## 🎨 Change Theme

Type in the search bar:
- `themes` - See available themes
- `theme dark` - Switch to dark mode
- `theme gradient` - Use gradient theme

---

## ❓ Troubleshooting

### App doesn't start?
1. Make sure Node.js is installed
2. Run `npm install` first
3. Try `npm run overlay`

### Can't stop the app?
Run: `npm run stop`

### Want to remove auto-start?
Run: `npm run uninstall-autostart`

---

## 💡 Tips

- **Results are auto-copied** to clipboard - just paste anywhere!
- Works **100% offline** (except currency conversion)
- **8 beautiful themes** to choose from
- Press **Escape** to quickly hide the overlay

---

Made with ❤️ by Manideep Reddy Eevuri

Enjoy! 🎉

# ⚡ Mani-Calc
> **The Ultimate Spotlight-Style Calculator for Windows**

![Version](https://img.shields.io/badge/version-2.1.3-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows-0078D6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Downloads](https://img.shields.io/npm/dt/mani-calc)

**Mani-Calc** overlays a powerful floating search bar on your Windows desktop. Press `Alt+Space` to instantly calculate, convert currencies, check world times, generate passwords, and control your system—all without leaving your current window.

---

## 🚀 Quick Install

### Method 1: The Easy Way (via NPM)
If you have Node.js installed, just run:

```powershell
npm install -g mani-calc
```

### Method 2: Configure Auto-Start (Recommended)
To make Mani-Calc run automatically when you start your computer:

```powershell
mani-calc install-autostart
```

Now press `Alt+Space` to start using it!

---

## 🎮 How to Use

1. **Open**: Press `Alt + Space` anywhere on your computer.
2. **Type**: Enter your query (math, conversion, command).
3. **Result**: See the result instantly as you type.
4. **Copy**: Press `Enter` to copy the result to your clipboard.
5. **Close**: Press `Escape`.

---

## ✨ Features at a Glance

### 🧮 Smart Calculation
Just type what you need:
*   **Math**: `2 + 3 * 5` → `17`
*   **Math**: `sqrt(144)` → `12`
*   **Percentages**: `15% of 200` → `30`
*   **Functions**: `sin(45 deg)`, `log(100)`, `2^10`

### 💱 Currency & Units
*   **Currency**: `100 USD to INR` → `₹8,312.00`
*   **Currency**: `50 EUR to USD` → `$54.35`
*   **Length**: `10 km to miles` → `6.21 miles`
*   **Weight**: `100 kg to lbs` → `220.46 lbs`
*   **Temp**: `100 F to C` → `37.78 °C`

### 🌍 Time & Date
*   **World Time**: `time in Tokyo` → `8:57 PM`
*   **Future Date**: `today + 3 weeks` → `Feb 14, 2026`
*   **Countdown**: `days until Christmas` → `337 days`

### 🛠️ Developer Tools
*   **Hex/Bin**: `255 to hex` → `0xFF`
*   **Binary**: `255 to bin` → `0b11111111`
*   **Hash**: `md5 hello` → `5d41...`
*   **Base64**: `base64 encode hello` → `aGVsbG8=`
*   **UUID**: `uuid` → `a1b2c3d4...`

### 🔧 Utilities
*   **Password**: `password 16` → `xK9#mP2$nL7@qR`
*   **Color**: `#FF5733 to rgb` → `rgb(255, 87, 51)`
*   **Text**: `upper hello` → `HELLO`
*   **Text**: `count hello world` → `11 chars, 2 words`
*   **Random**: `coin` → `Heads` / `dice` → `4`

### 💻 System Control
Control your PC without using the mouse:
*   `shutdown`, `restart`, `lock`, `sleep`
*   `mute`, `unmute`, `volume up`, `volume down`
*   `brightness up`, `brightness down`
*   `wifi on`, `wifi off`
*   `task manager`, `notepad`, `calculator`

---

## 🎨 Themes

Type `theme [name]` to instantly change the look:

| Theme Name | Description |
|------------|-------------|
| `theme dark` | Classic Dark Mode (Default) |
| `theme light` | Clean Light Mode |
| `theme midnight` | Deep Blue Night |
| `theme forest` | Calming Green |
| `theme sunset` | Warm Orange/Purple |
| `theme neon` | Cyberpunk Glow |
| `theme ocean` | Deep Sea Blue |

Type `themes` to see the full list.

---

## ⚙️ Commands Reference

| Command | Description |
|---------|-------------|
| `mani-calc` | Run interactive mode in terminal |
| `mani-calc-overlay` | Launch the floating overlay manually |
| `mani-calc install-autostart` | Enable launch on Windows startup |
| `mani-calc uninstall-autostart` | Disable launch on Windows startup |

---

## ❓ Troubleshooting

**Q: Alt+Space isn't working?**
A: Make sure the overlay process is running. Open a terminal and run `mani-calc-overlay`. If that works, run `mani-calc install-autostart` to ensure it runs on boot.

**Q: How do I stop it?**
A: Open the overlay (`Alt+Space`) and type `exit` or `quit`. Or run `npm run stop` if you have the source code.

---

## 👨‍💻 Author
**Manideep Reddy Eevuri**
*   [GitHub](https://github.com/manireddy)

---
*Made with ❤️ for productivity lovers.*

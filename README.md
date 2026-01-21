<div align="center">

# 📊 Mani-Calc

**Spotlight for Windows** - Instant calculations from Windows Search

[![npm version](https://img.shields.io/npm/v/mani-calc.svg)](https://www.npmjs.com/package/mani-calc)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/platform-Windows-0078D6.svg)](https://www.microsoft.com/windows)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)

<p>
  <strong>Finally, Windows gets what macOS has had for years.</strong><br/>
  Calculate expressions, convert units, and process natural language queries<br/>
  directly from Windows Search - no app to open, no context switching.
</p>

[Quick Start](#-installation) • [Examples](#-examples) • [Features](#-features) • [Docs](#-usage)

</div>

---

## 🎯 The Problem

macOS users can type `2+3*5` in Spotlight and instantly get `17`. 

Windows users? They have to open Calculator, type the expression, copy the result, and switch back.

**Not anymore.**

## ✨ The Solution

Turn your Windows Search into a powerful calculator. Type math expressions, conversions, or natural language queries and get instant results — just like macOS Spotlight, but for Windows.

---

## ✨ Features

### 🧮 **Basic Math Calculations**
```
2 + 3 * 5          → 17
(10 + 20) / 5      → 6
sqrt(49)           → 7
2^8                → 256
```

### 💬 **Natural Language Math**
```
what is 25 percent of 200    → 50
half of 80                   → 40
square root of 64            → 8
10 squared                   → 100
```

### 🔄 **Unit Conversions**
```
10 km to miles               → 6.21 miles
5 kg to pounds               → 11.02 pounds
100 celsius to fahrenheit    → 212 fahrenheit
2 hours to seconds           → 7200 seconds
```

### 📋 **Clipboard Integration**
- Results are automatically copied to your clipboard
- Press Enter in Windows Search → result is ready to paste

### 📚 **Calculation History**
```
history              → View recent calculations
clear history        → Clear all history
```

---

## 🚀 Installation

### Quick Install
```bash
npm install -g mani-calc
```

### Setup Windows Search Integration
```bash
mani-calc install
```

That's it! You can now use `calc:` in Windows Search.

---

## 📖 Usage

### 1️⃣ **Windows Search** (Recommended)
After installation, open Windows Search and type:
```
calc: 2 + 3 * 5
calc: 10 km to miles
calc: what is 20 percent of 450
```

### 2️⃣ **Command Line**
```bash
# Direct calculation
mani-calc "2 + 3 * 5"

# Natural language
mani-calc "what is 25 percent of 200"

# Unit conversion
mani-calc "10 km to miles"

# View history
mani-calc history
```

### 3️⃣ **Interactive Mode**
```bash
mani-calc
```
Then type your calculations interactively:
```
calc> 2 + 3 * 5
✓ 2 + 3 * 5 = 17

calc> 10 km to miles
✓ 10 km = 6.21 miles

calc> history
Recent Calculations:
1. 10 km = 6.21 miles (7:45 PM)
2. 2 + 3 * 5 = 17 (7:44 PM)
```

---

## 🎯 Examples

### Math Operations
```bash
mani-calc "2 + 3 * 5"              # 17
mani-calc "sqrt(144)"              # 12
mani-calc "(100 - 20) / 4"         # 20
mani-calc "2^10"                   # 1024
mani-calc "sin(pi/2)"              # 1
```

### Natural Language
```bash
mani-calc "what is 15 percent of 300"    # 45
mani-calc "half of 120"                  # 60
mani-calc "square root of 81"            # 9
mani-calc "25 squared"                   # 625
```

### Unit Conversions

**Length:**
```bash
mani-calc "5 miles to km"          # 8.05 km
mani-calc "100 cm to inches"       # 39.37 inches
```

**Weight:**
```bash
mani-calc "10 kg to pounds"        # 22.05 pounds
mani-calc "500 grams to oz"        # 17.64 oz
```

**Temperature:**
```bash
mani-calc "25 celsius to fahrenheit"     # 77 fahrenheit
mani-calc "98.6 fahrenheit to celsius"   # 37 celsius
```

**Time:**
```bash
mani-calc "2 hours to minutes"     # 120 minutes
mani-calc "365 days to hours"      # 8760 hours
```

**Volume:**
```bash
mani-calc "5 liters to gallons"    # 1.32 gallons
mani-calc "2 cups to ml"           # 473.18 ml
```

---

## 🛠️ Commands

| Command | Description |
|---------|-------------|
| `mani-calc install` | Install Windows Search integration |
| `mani-calc uninstall` | Remove Windows Search integration |
| `mani-calc [query]` | Calculate expression |
| `mani-calc` | Start interactive mode |
| `mani-calc history` | View calculation history |
| `mani-calc --version` | Show version |
| `mani-calc --help` | Show help |

---

## 🔐 Privacy & Performance

✅ **100% Offline** - No internet required  
✅ **No Tracking** - Your calculations stay on your machine  
✅ **No Telemetry** - Zero data collection  
✅ **Lightweight** - Minimal memory usage  
✅ **Fast** - Results in < 100ms  

---

## 🎨 Supported Operations

### Mathematical Functions
- Basic: `+`, `-`, `*`, `/`, `^` (power)
- Functions: `sqrt()`, `sin()`, `cos()`, `tan()`, `log()`, `ln()`, `abs()`
- Constants: `pi`, `e`
- Parentheses: `(`, `)`

### Unit Categories
- **Length**: meters, kilometers, miles, feet, inches, yards, cm, mm
- **Weight**: kilograms, grams, pounds, ounces, tons
- **Temperature**: Celsius, Fahrenheit, Kelvin
- **Time**: seconds, minutes, hours, days, weeks, months, years
- **Volume**: liters, milliliters, gallons, cups, pints, quarts
- **Speed**: m/s, km/h, mph, knots

---

## 🗺️ Roadmap

### Phase 2 - Productivity Features
- [ ] Live preview while typing
- [ ] Variables & memory (`x = 100`, then `x * 5`)
- [ ] Date calculations (`today + 15 days`)
- [ ] Smart error messages

### Phase 3 - Advanced Features
- [ ] Graph plotting (`plot y = x^2`)
- [ ] Step-by-step solutions
- [ ] Developer mode (hex, binary, base64)

### Phase 4 - Ecosystem
- [ ] Plugin system
- [ ] Custom user commands
- [ ] Voice input support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT © Mani Reddy

---

## 💡 Inspiration

Inspired by macOS Spotlight's calculator feature, bringing the same productivity boost to Windows users.

---

## 🐛 Troubleshooting

**Windows Search integration not working?**
1. Run `mani-calc install` as Administrator
2. Restart Windows Explorer
3. Try typing `calc:` in Windows Search

**Results not copying to clipboard?**
- Make sure no other application is blocking clipboard access

**Need help?**
- Run `mani-calc --help` for usage examples
- Check the [GitHub Issues](https://github.com/manireddy/mani-calc/issues)

---

<div align="center">

**Made with ❤️ for Windows productivity enthusiasts**

[Report Bug](https://github.com/manireddy/mani-calc/issues) · [Request Feature](https://github.com/manireddy/mani-calc/issues)

</div>

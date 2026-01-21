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

[Quick Start](#-quick-start) • [Features](#-features) • [Examples](#-examples) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## 🎯 The Problem

macOS users can type `2+3*5` in Spotlight and instantly get `17`. 

Windows users? They have to open Calculator, type the expression, copy the result, and switch back to what they were doing.

**Not anymore.**

---

## ✨ The Solution

**Mani-Calc** turns your Windows Search into a powerful calculator. Type math expressions, conversions, or natural language queries and get instant results — just like macOS Spotlight, but for Windows.

```bash
# Install once
npm install -g mani-calc
mani-calc install

# Use forever
# Type in Windows Search:
calc: 2 + 3 * 5          → 17 ✨
calc: 10 km to miles     → 6.21 miles ✨
calc: what is 25% of 200 → 50 ✨
```

Results appear instantly. Auto-copied to clipboard. Pure productivity.

### 🎨 **NEW: Overlay Mode**

Now with a **beautiful floating search box** that appears anywhere with `Alt+Space`!

```bash
# Start overlay mode
npm run overlay

# Press Alt+Space anywhere
# Type: 2 + 3 * 5 → Instant result!
# Type: sleep → Computer goes to sleep!
```

**Features:**
- ⚡ Global hotkey (`Alt+Space`)
- 🎨 Glassmorphism design
- 💻 System commands (sleep, lock, shutdown, etc.)
- 🚀 Live preview
- 📋 Auto-copy results

**[Learn more about Overlay Mode →](OVERLAY_MODE.md)**

---

## 🚀 Quick Start

### 1. Install the Package
```bash
npm install -g mani-calc
```

### 2. Set Up Windows Search Integration
```bash
mani-calc install
```
> **Note:** You may need to run this as Administrator for full Windows Search integration.

### 3. Start Using!

Open Windows Search (`Win + S`) and type:
```
calc: 2 + 3 * 5
```

**That's it!** The result appears instantly and is automatically copied to your clipboard.

---

## 🎨 Features

### 🧮 Math Calculations
Perform any mathematical operation with full operator precedence:

```bash
calc: 2 + 3 * 5              # 17
calc: (10 + 20) / 5          # 6
calc: sqrt(144)              # 12
calc: 2^10                   # 1024
calc: sin(pi/2)              # 1
calc: log(100)               # 2
calc: abs(-42)               # 42
```

**Supported:**
- Basic operators: `+`, `-`, `*`, `/`, `^` (power)
- Functions: `sqrt()`, `sin()`, `cos()`, `tan()`, `log()`, `ln()`, `abs()`, `ceil()`, `floor()`, `round()`
- Constants: `pi`, `e`
- Parentheses for grouping

### 💬 Natural Language Processing
Ask questions in plain English:

```bash
calc: what is 25 percent of 200    # 50
calc: 15% of 300                   # 45
calc: half of 80                   # 40
calc: quarter of 100               # 25
calc: square root of 64            # 8
calc: 10 squared                   # 100
calc: 5 cubed                      # 125
calc: 2 to the power of 8          # 256
```

### 🔄 Unit Conversions
Convert between units instantly:

#### Length
```bash
calc: 10 km to miles         # 6.21 miles
calc: 5 miles to km          # 8.05 km
calc: 100 cm to inches       # 39.37 inches
calc: 6 feet to meters       # 1.83 meters
```

#### Weight
```bash
calc: 10 kg to pounds        # 22.05 pounds
calc: 5 pounds to kg         # 2.27 kg
calc: 1000 grams to kg       # 1 kg
calc: 16 oz to pounds        # 1 pound
```

#### Temperature
```bash
calc: 0 celsius to fahrenheit        # 32 fahrenheit
calc: 100 celsius to fahrenheit      # 212 fahrenheit
calc: 98.6 fahrenheit to celsius     # 37 celsius
calc: 273.15 kelvin to celsius       # 0 celsius
```

#### Time
```bash
calc: 2 hours to minutes     # 120 minutes
calc: 120 seconds to minutes # 2 minutes
calc: 1 day to hours         # 24 hours
calc: 365 days to hours      # 8760 hours
```

#### Volume
```bash
calc: 5 liters to gallons    # 1.32 gallons
calc: 1 gallon to liters     # 3.79 liters
calc: 500 ml to liters       # 0.5 liters
calc: 2 cups to ml           # 473.18 ml
```

#### Speed
```bash
calc: 100 km/h to mph        # 62.14 mph
calc: 60 mph to km/h         # 96.56 km/h
calc: 10 m/s to km/h         # 36 km/h
```

### 📋 Automatic Clipboard Integration
Every result is automatically copied to your clipboard. Just press `Ctrl+V` to paste it anywhere!

### 📚 Calculation History
Keep track of your recent calculations:

```bash
calc: history                # View last 10 calculations
calc: clear history          # Clear all history
```

History is stored locally with timestamps, so you can always review past calculations.

---

## 📥 Installation

### Prerequisites
- **Node.js** >= 14.0.0 ([Download here](https://nodejs.org))
- **Windows** 10 or 11
- **npm** (comes with Node.js)

### Install Globally
```bash
npm install -g mani-calc
```

### Set Up Windows Search Integration
```bash
mani-calc install
```

This command:
- Registers the `calc:` protocol handler
- Creates a Windows Search connector
- Sets up registry entries for seamless integration

> **Tip:** If Windows Search integration doesn't work immediately, try:
> 1. Running `mani-calc install` as Administrator
> 2. Restarting Windows Explorer: `taskkill /f /im explorer.exe && start explorer.exe`
> 3. Logging out and back in

---

## 📖 Usage

Mani-Calc offers **four ways** to use it:

### 1️⃣ Overlay Mode (NEW! ⭐)

The most powerful way - a floating search box with global hotkey:

```bash
# Start overlay mode
npm run overlay

# Or after global install
mani-calc-overlay
```

Then press **`Alt+Space`** anywhere in Windows to toggle the search box!

**Features:**
- Works from any application
- Beautiful glassmorphism UI
- Live preview as you type
- System commands (sleep, lock, shutdown, etc.)
- Auto-hide when you click outside

**Examples:**
```
Alt+Space → "2 + 3 * 5" → Enter
Alt+Space → "10 km to miles" → Enter
Alt+Space → "sleep" → Enter (computer sleeps!)
Alt+Space → "lock" → Enter (computer locks!)
```

**[Full Overlay Mode Documentation →](OVERLAY_MODE.md)**

### 2️⃣ Windows Search

After installation, open Windows Search (`Win + S`) and type:

```
calc: [your expression]
```

**Examples:**
```
calc: 2 + 3 * 5
calc: 10 km to miles
calc: what is 25 percent of 200
calc: sqrt(144)
calc: history
```

### 3️⃣ Command Line

Use directly from your terminal:

```bash
# Basic calculation
mani-calc "2 + 3 * 5"

# Natural language
mani-calc "what is 25 percent of 200"

# Unit conversion
mani-calc "10 km to miles"

# View history
mani-calc history

# Get help
mani-calc --help

# Check version
mani-calc --version
```

### 4️⃣ Interactive Mode (REPL)

Start an interactive session:

```bash
mani-calc
```

Then type your calculations:

```
calc> 2 + 3 * 5
✓ 2 + 3 * 5 = 17
  (Result copied to clipboard)

calc> 10 km to miles
✓ 10 km = 6.21 miles
  (Result copied to clipboard)

calc> what is 25 percent of 200
✓ what is 25 percent of 200 = 50
  (Result copied to clipboard)

calc> history
Recent Calculations:

1. what is 25 percent of 200 = 50 (7:45 PM)
2. 10 km = 6.21 miles (7:44 PM)
3. 2 + 3 * 5 = 17 (7:43 PM)

calc> exit
👋 Goodbye!
```

**Interactive Mode Commands:**
- `exit` or `quit` - Exit interactive mode
- `clear` - Clear the screen
- `help` - Show help
- `history` - View calculation history
- Any calculation - Get instant result

---

## 💡 Real-World Use Cases

### 🛒 Shopping
```bash
# Calculate discount
calc: what is 20 percent of 150    # 30 (discount amount)
calc: 150 - 30                     # 120 (final price)

# Tax calculation
calc: what is 8.5 percent of 100   # 8.5 (tax amount)
```

### 👨‍🍳 Cooking
```bash
calc: 2 cups to ml                 # 473.18 ml
calc: 350 fahrenheit to celsius    # 176.67 celsius
calc: half of 250                  # 125 (halving a recipe)
```

### ✈️ Travel
```bash
calc: 500 km to miles              # 310.69 miles
calc: 120 km/h to mph              # 74.56 mph
calc: 10 kg to pounds              # 22.05 pounds (luggage weight)
```

### 🏃 Fitness
```bash
calc: 5 miles to km                # 8.05 km (running distance)
calc: 150 pounds to kg             # 68.04 kg (body weight)
```

### 🔬 Science & Engineering
```bash
calc: 9.8 * 5                      # 49 (acceleration * time)
calc: sqrt(2) * 10                 # 14.14 (diagonal calculation)
calc: pi * 5^2                     # 78.54 (circle area)
```

### 💼 Finance
```bash
calc: what is 15 percent of 50000  # 7500 (interest calculation)
calc: 50000 + 7500                 # 57500 (total with interest)
```

---

## 🎯 Advanced Features

### Variables & Memory (Interactive Mode)
Store values for reuse during your session:

```bash
calc> x = 100
✓ x = 100

calc> x * 2
✓ 200

calc> x / 4
✓ 25

calc> y = x + 50
✓ y = 150

calc> y * 2
✓ 300
```

### Complex Expressions
Chain multiple operations:

```bash
calc: ((10 + 5) * 3 - 20) / 5      # 5
calc: sqrt(16) + sqrt(9)           # 7
calc: 2^3 + 3^2                    # 17
calc: sin(pi/4) + cos(pi/4)        # 1.41
```

### Flexible Syntax
Units are case-insensitive and flexible:

```bash
calc: 10 KM to MILES               # Works!
calc: 10 Km to Miles               # Works!
calc: 10 kilometers to miles       # Works!
calc: 10 kilometer to mile         # Works!
```

---

## 🔧 Commands Reference

| Command | Description |
|---------|-------------|
| `mani-calc install` | Install Windows Search integration |
| `mani-calc uninstall` | Remove Windows Search integration |
| `mani-calc "[expression]"` | Calculate expression directly |
| `mani-calc` | Start interactive REPL mode |
| `mani-calc history` | View calculation history |
| `mani-calc --help` | Show help information |
| `mani-calc --version` | Show version number |

---

## 🔐 Privacy & Performance

### Privacy First
- ✅ **100% Offline** - No internet connection required
- ✅ **No Tracking** - Zero data collection or analytics
- ✅ **No Telemetry** - Your calculations stay on your machine
- ✅ **Local Storage** - History stored locally in your AppData folder

### Lightning Fast
- ⚡ **< 100ms Response Time** - Instant results
- 🪶 **Lightweight** - Minimal memory footprint
- 🚀 **No Lag** - Smooth, responsive experience
- 💾 **Efficient** - Optimized for performance

---

## 🛠️ Troubleshooting

### Windows Search Integration Not Working?

**Solution 1: Run as Administrator**
```bash
# Right-click Command Prompt/PowerShell → "Run as Administrator"
mani-calc install
```

**Solution 2: Restart Windows Explorer**
```bash
taskkill /f /im explorer.exe && start explorer.exe
```

**Solution 3: Log Out and Back In**
Sometimes Windows needs a fresh session to recognize the protocol handler.

### Results Not Copying to Clipboard?

Make sure no other application is blocking clipboard access. Close any clipboard managers temporarily.

### Command Not Found?

Make sure npm's global bin directory is in your PATH:
```bash
npm config get prefix
```

Add the output path + `\node_modules\.bin` to your system PATH.

### Need More Help?

- 📖 Check [EXAMPLES.md](EXAMPLES.md) for more usage examples
- 🏗️ Read [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- 🐛 [Report an issue](https://github.com/Maniredii/mani-calc/issues) on GitHub
- 💬 Start a [discussion](https://github.com/Maniredii/mani-calc/discussions)

---

## 📚 Documentation

- **[OVERLAY_MODE.md](OVERLAY_MODE.md)** - ⭐ NEW: Floating search box guide
- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 2 minutes
- **[EXAMPLES.md](EXAMPLES.md)** - Comprehensive usage examples
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

---

## 🗺️ Roadmap

### Phase 2 - Productivity Features (v1.1.0)
- [ ] Live preview while typing in Windows Search
- [ ] Persistent variables across sessions
- [ ] Date & time calculations (`today + 15 days`, `days between dates`)
- [ ] Enhanced error messages with suggestions

### Phase 3 - Advanced Features (v1.2.0)
- [ ] Graph plotting (`plot y = x^2`)
- [ ] Step-by-step solutions for equations
- [ ] Developer mode (hex, binary, base64 conversions)
- [ ] Scientific notation support

### Phase 4 - Ecosystem (v2.0.0)
- [ ] Plugin system for extensions
- [ ] Custom user-defined commands
- [ ] Voice input support
- [ ] PowerToys Run integration
- [ ] Sync history across devices (optional)

---

## 🤝 Contributing

Contributions are welcome! Whether it's:

- 🐛 Bug reports
- 💡 Feature requests
- 📖 Documentation improvements
- 🔧 Code contributions

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Maniredii/mani-calc.git
cd mani-calc

# Install dependencies
npm install

# Run tests
npm test

# Test locally
node bin/cli.js "2 + 3 * 5"
```

---

## 📄 License

MIT © [Mani Reddy](https://github.com/Maniredii)

See [LICENSE](LICENSE) for details.

---

## 💖 Acknowledgments

Inspired by macOS Spotlight's calculator feature. Built to bring the same productivity boost to Windows users worldwide.

---

## 🌟 Show Your Support

If Mani-Calc saves you time and improves your productivity:

- ⭐ **Star this repository** on GitHub
- 🐦 **Share it** on social media
- 📝 **Write a review** or blog post
- 🤝 **Contribute** to the project

---

## 📞 Connect

- **GitHub**: [@Maniredii](https://github.com/Maniredii)
- **Issues**: [Report a bug](https://github.com/Maniredii/mani-calc/issues)
- **Discussions**: [Ask questions](https://github.com/Maniredii/mani-calc/discussions)

---

<div align="center">

**Made with ❤️ for Windows productivity enthusiasts**

*Let's change how people calculate on Windows!*

[⬆ Back to Top](#-mani-calc)

</div>

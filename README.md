# ⚡ Mani-Calc v2.1.0

> **Spotlight-style instant calculator for Windows** — Math, Currency, Date/Time, Programmer Mode, Password Generator, Color Converter, Text Utils, Emoji Search, Web Search, System Commands & 8 Beautiful Themes!

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows-0078D6.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Press `Alt+Space` anywhere on your desktop to instantly calculate, convert, and control your system!

---

## 🚀 Quick Start

### Installation

```bash
# Clone or download the repository
cd mani-calc

# Install dependencies
npm install

# Run the overlay
npm run overlay
```

### Usage

1. Press **`Alt+Space`** to open the floating calculator
2. Type your query and see **live results** as you type
3. Press **Enter** to copy the result to clipboard
4. Press **Escape** to close

---

## 📖 Complete Feature Guide

### 📊 Math Calculations

Perform any mathematical calculation with live preview!

| Example | Result |
|---------|--------|
| `2 + 3 * 5` | 17 |
| `sqrt(144)` | 12 |
| `sin(45 deg)` | 0.7071 |
| `log(100)` | 2 |
| `2^10` | 1024 |
| `15% of 200` | 30 |
| `(100 + 50) / 3` | 50 |

**Supported Functions:**
- Basic: `+`, `-`, `*`, `/`, `^` (power)
- Trigonometry: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
- Logarithms: `log`, `log10`, `ln`
- Roots: `sqrt`, `cbrt`, `nthRoot`
- Constants: `pi`, `e`
- Rounding: `round`, `floor`, `ceil`, `abs`

---

### 💱 Currency Converter

Convert between 40+ world currencies with live or cached exchange rates!

| Example | Result |
|---------|--------|
| `100 USD to INR` | $100 USD = ₹8,312.00 INR |
| `50 euros to dollars` | €50 EUR = $54.35 USD |
| `1000 yen to usd` | ¥1000 JPY = $6.73 USD |
| `500 rupees to gbp` | ₹500 INR = £4.76 GBP |

**Supported Currencies:**
- **Americas:** USD, CAD, MXN, BRL, ARS, CLP, COP, PEN
- **Europe:** EUR, GBP, CHF, SEK, NOK, DKK, PLN, CZK, HUF, RON, TRY
- **Asia:** INR, JPY, CNY, KRW, SGD, HKD, TWD, THB, MYR, PHP, IDR, VND, PKR, BDT
- **Middle East:** AED, SAR, ILS
- **Oceania:** AUD, NZD
- **Africa:** ZAR, NGN, EGP

---

### 📅 Date & Time Calculator

Calculate dates, countdowns, and check world time!

#### World Clock
| Example | Result |
|---------|--------|
| `time in tokyo` | Tokyo: 8:57 PM (Wed, Jan 22) |
| `time in london` | London: 10:57 AM (Wed, Jan 22) |
| `time in new york` | New York: 5:57 AM (Wed, Jan 22) |

**50+ Locations Supported:** Tokyo, London, New York, Paris, Sydney, Dubai, Singapore, Mumbai, Berlin, Moscow, and more!

#### Date Arithmetic
| Example | Result |
|---------|--------|
| `today + 30 days` | Friday, February 21, 2026 |
| `today - 2 weeks` | Wednesday, January 8, 2026 |
| `today + 6 months` | Wednesday, July 22, 2026 |
| `today + 1 year` | Friday, January 22, 2027 |

#### Countdowns
| Example | Result |
|---------|--------|
| `days until christmas` | 337 days from now |
| `days until new year` | 344 days from now |
| `days since jan 1` | 21 days ago |

#### Quick Queries
| Example | Result |
|---------|--------|
| `today` | Wednesday, January 22, 2026, 4:27 PM |
| `time` | 4:27:07 PM |
| `week` | Week 4 of 2026 |
| `what day is dec 25` | Thursday, December 25, 2025 |

---

### 💻 Programmer Calculator

Hex, Binary, Octal conversions and bitwise operations for developers!

#### Number Conversions
| Example | Result |
|---------|--------|
| `255 to hex` | 255 = 0xFF (hex) |
| `255 to binary` | 255 = 1111 1111 (binary) |
| `255 to octal` | 255 = 0o377 (octal) |
| `0xFF to decimal` | 0xFF = 255 (decimal) |
| `0b11111111 to decimal` | 0b11111111 = 255 (decimal) |
| `hex 255` | 0xFF |
| `bin 255` | 0b11111111 |

#### Bitwise Operations
| Example | Result |
|---------|--------|
| `255 AND 128` | 255 AND 128 = 128 |
| `255 OR 64` | 255 OR 64 = 255 |
| `255 XOR 128` | 255 XOR 128 = 127 |
| `NOT 255` | NOT 255 = 4294967040 (32-bit) |
| `16 << 2` | 16 << 2 = 64 |
| `64 >> 2` | 64 >> 2 = 16 |

---

### 📏 Unit Conversions

Convert between various units instantly!

#### Length
| Example | Result |
|---------|--------|
| `10 km to miles` | 6.2137 miles |
| `100 meters to feet` | 328.084 feet |
| `5 inches to cm` | 12.7 cm |

#### Weight
| Example | Result |
|---------|--------|
| `100 kg to pounds` | 220.462 pounds |
| `150 lbs to kg` | 68.039 kg |
| `1 ton to kg` | 1000 kg |

#### Temperature
| Example | Result |
|---------|--------|
| `100 F to C` | 37.78 °C |
| `0 C to F` | 32 °F |
| `300 K to C` | 26.85 °C |

#### Volume
| Example | Result |
|---------|--------|
| `1 gallon to liters` | 3.785 liters |
| `500 ml to cups` | 2.11 cups |

#### Data
| Example | Result |
|---------|--------|
| `1 GB to MB` | 1024 MB |
| `1 TB to GB` | 1024 GB |

---

### 🔐 Password Generator

Generate secure random passwords instantly!

| Example | Result |
|---------|--------|
| `password` | 🔐 Password: xK9#mP2$nL7@qR |
| `password 16` | 16-character secure password |
| `password 20` | 20-character secure password |

---

### 🎲 Random Generator

Random numbers, dice rolls, coin flips, and UUIDs!

| Example | Result |
|---------|--------|
| `random` | 🎲 Random (1-100): 42 |
| `random 1 1000` | 🎲 Random (1-1000): 567 |
| `dice` | 🎲 Dice (d6): 4 |
| `d20` | 🎲 Dice (d20): 17 |
| `coin` | 🪙 Coin Flip: Heads |
| `flip` | 🪙 Coin Flip: Tails |
| `uuid` | 🔑 UUID: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d |

---

### 🎨 Color Converter

Convert between HEX, RGB, and HSL color formats!

| Example | Result |
|---------|--------|
| `#FF5733` | 🎨 Color: #FF5733 \| rgb(255, 87, 51) \| hsl(11, 100%, 60%) |
| `#FF5733 to rgb` | 🎨 Color: rgb(255, 87, 51) |
| `rgb(255,0,0) to hex` | 🎨 Color: #FF0000 |

---

### 📝 Text Utilities

Transform and analyze text!

| Example | Result |
|---------|--------|
| `upper hello world` | 📝 upper: HELLO WORLD |
| `lower HELLO WORLD` | 📝 lower: hello world |
| `reverse hello` | 📝 reverse: olleh |
| `capitalize hello world` | 📝 capitalize: Hello World |
| `count hello world` | 📊 Count: 11 chars, 2 words |
| `camelcase hello world` | 📝 camelcase: helloWorld |
| `snakecase hello world` | 📝 snakecase: hello_world |
| `kebabcase hello world` | 📝 kebabcase: hello-world |

---

### 😀 Emoji Search

Find emojis by category!

| Example | Result |
|---------|--------|
| `emoji happy` | 😀 Emojis: 😀 😃 😄 😁 😆 😊 🙂 😇 🥰 😍 |
| `emoji heart` | 😀 Emojis: ❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 |
| `emoji fire` | 😀 Emojis: 🔥 💥 ⚡ ✨ 💫 🌟 ⭐ |
| `emoji food` | 😀 Emojis: 🍕 🍔 🍟 🌭 🍿 🥗 🍣 🍜 🍩 🍪 |
| `emoji music` | 😀 Emojis: 🎵 🎶 🎼 🎹 🎸 🎺 🥁 🎷 🎻 |
| `emoji animal` | 😀 Emojis: 🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐨 🦁 |

**Categories:** happy, sad, love, heart, angry, laugh, cool, fire, music, food, drink, animal, nature, weather, sport, travel, work, money, celebrate, thumbs, hand, face, star, check, cross, time, arrow

---

### 🔒 Hash & Encoding

Generate hashes and encode/decode Base64!

| Example | Result |
|---------|--------|
| `md5 hello` | 🔒 MD5: 5d41402abc4b2a76b9719d911017c592 |
| `sha256 hello` | 🔒 SHA256: 2cf24dba5fb0a30e... |
| `sha1 hello` | 🔒 SHA1: aaf4c61ddcc5e8a... |
| `base64 encode hello` | 🔤 Base64 encode: aGVsbG8= |
| `base64 decode aGVsbG8=` | 🔤 Base64 decode: hello |

---

### 🔍 Quick Web Search

Search the web directly from the calculator!

| Example | Action |
|---------|--------|
| `google AI news` | Opens Google search for "AI news" |
| `youtube music videos` | Opens YouTube search for "music videos" |
| `wiki Albert Einstein` | Opens Wikipedia search |
| `github react` | Opens GitHub search for "react" |
| `stackoverflow javascript` | Opens StackOverflow search |
| `amazon laptop` | Opens Amazon search for "laptop" |
| `maps New York` | Opens Google Maps search |
| `reddit programming` | Opens Reddit search |
| `twitter elon musk` | Opens Twitter search |

**Supported Search Engines:** google, youtube, bing, duckduckgo, wiki, wikipedia, github, stackoverflow, amazon, twitter, reddit, maps

---

### ⚙️ System Commands

Control your Windows PC directly from the calculator!

#### Power Controls
| Command | Action |
|---------|--------|
| `sleep` | Put computer to sleep |
| `lock` | Lock the computer |
| `shutdown` | Shutdown the computer |
| `restart` | Restart the computer |
| `logout` | Log out current user |

#### Volume Controls
| Command | Action |
|---------|--------|
| `mute` | Toggle mute |
| `unmute` | Toggle mute |
| `volume up` | Increase volume |
| `volume down` | Decrease volume |

#### Screen & Connectivity
| Command | Action |
|---------|--------|
| `brightness up` | Increase screen brightness |
| `brightness down` | Decrease screen brightness |
| `wifi on` | Enable WiFi |
| `wifi off` | Disable WiFi |
| `bluetooth on` | Enable Bluetooth |
| `bluetooth off` | Disable Bluetooth |

#### Quick Launch Apps
| Command | Action |
|---------|--------|
| `notepad` | Open Notepad |
| `calculator` | Open Windows Calculator |
| `explorer` / `files` | Open File Explorer |
| `task manager` | Open Task Manager |
| `control panel` | Open Control Panel |
| `settings app` | Open Windows Settings |
| `cmd` | Open Command Prompt |
| `powershell` | Open PowerShell |
| `browser` | Open default browser |
| `screenshot` / `snip` | Open Snipping Tool |

#### System Info
| Command | Action |
|---------|--------|
| `ip` | Show your IP address |
| `battery` | Show battery percentage |

---

### 🎨 Themes

Customize your calculator with 8 beautiful themes!

| Command | Theme |
|---------|-------|
| `theme dark` | Dark Mode (default) |
| `theme light` | Light Mode |
| `theme midnight` | Midnight Blue |
| `theme forest` | Forest Green |
| `theme sunset` | Sunset Orange |
| `theme purple` | Royal Purple |
| `theme neon` | Neon Glow |
| `theme ocean` | Deep Ocean |
| `themes` | List all available themes |

---

### ⚡ Settings & Configuration

| Command | Action |
|---------|--------|
| `settings` | View current settings |
| `autostart on` | Start with Windows |
| `autostart off` | Disable auto-start |
| `help` | Show all commands |
| `history` | View calculation history |
| `clear history` | Clear calculation history |
| `quit` / `exit` | Close Mani-Calc |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt + Space` | Toggle calculator overlay |
| `Enter` | Execute & copy result to clipboard |
| `Escape` | Close overlay |

---

## 🛠️ Development

### Project Structure
```
mani-calc/
├── src/
│   ├── core/
│   │   ├── math-engine.js       # Math calculations
│   │   ├── currency-converter.js # Currency conversion
│   │   ├── date-time-calculator.js # Date/time calculations
│   │   ├── programmer-calc.js   # Hex/Binary/Bitwise
│   │   ├── unit-converter.js    # Unit conversions
│   │   ├── nlp-parser.js        # Natural language parsing
│   │   ├── history-manager.js   # Calculation history
│   │   ├── clipboard-manager.js # Clipboard operations
│   │   └── settings-manager.js  # User settings
│   ├── ui/
│   │   ├── main-electron.js     # Electron main process
│   │   ├── floating-search.js   # Overlay window logic
│   │   └── overlay.html         # UI template
│   ├── integration/
│   │   └── windows-search.js    # Windows Search integration
│   └── index.js                 # Main entry point
├── bin/
│   ├── cli.js                   # CLI interface
│   └── overlay.js               # Overlay launcher
├── test/
│   └── test.js                  # Test suite
└── package.json
```

### Run in Development
```bash
# Run overlay mode
npm run overlay

# Run CLI mode
npm start

# Run tests
npm test
```

---

## 📋 Requirements

- **OS:** Windows 10/11
- **Node.js:** v14.0.0 or higher
- **Electron:** Included in dependencies

---

## 📝 Changelog

### v2.1.0 (January 2026)
- ✨ **Password Generator** - Generate secure random passwords (8-64 chars)
- ✨ **Random Generator** - Random numbers, dice rolls, coin flips, UUIDs
- ✨ **Color Converter** - Convert HEX, RGB, HSL formats
- ✨ **Text Utilities** - upper, lower, reverse, capitalize, camelcase, snakecase, kebabcase, count
- ✨ **Emoji Search** - Find emojis by category (30+ categories)
- ✨ **Hash Generator** - MD5, SHA1, SHA256, SHA512 hashes
- ✨ **Base64 Encoding** - Encode/decode Base64 strings
- ✨ **Quick Web Search** - Google, YouTube, Wikipedia, GitHub, StackOverflow, Amazon, Reddit, Maps
- 📚 Complete README documentation with all features

### v2.0.0 (January 2026)
- ✨ **Currency Converter** - 40+ world currencies
- ✨ **Date/Time Calculator** - World clock, date arithmetic, countdowns
- ✨ **Programmer Mode** - Hex, Binary, Octal, Bitwise operations
- ✨ **8 Color Themes** - Dark, Light, Midnight, Forest, Sunset, Purple, Neon, Ocean
- ✨ **25+ System Commands** - Control Windows from the overlay
- ✨ **Auto-Start** - Start with Windows option
- ✨ **Live Calculation** - See results as you type
- 🔧 Fixed volume controls (replaced nircmd with native PowerShell)
- 🔧 Fixed help command visibility
- 🔧 Improved settings persistence

### v1.2.3 (Previous)
- Basic math calculations
- Unit conversions
- Windows Search integration

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👨‍💻 Author

**Manideep Reddy Eevuri**

---

Made with ❤️ for Windows users who love productivity!

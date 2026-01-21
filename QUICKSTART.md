# 🚀 Quick Start Guide - Mani-Calc

Get up and running with Mani-Calc in under 2 minutes!

## Step 1: Install

```bash
npm install -g mani-calc
```

## Step 2: Set Up Windows Search Integration

```bash
mani-calc install
```

**Note:** You may need to run this as Administrator for full Windows Search integration.

## Step 3: Start Using!

### Option A: Windows Search (Recommended)
1. Press `Win + S` to open Windows Search
2. Type: `calc: 2 + 3 * 5`
3. See instant result: **17**
4. Result is automatically copied to clipboard!

### Option B: Command Line
```bash
mani-calc "2 + 3 * 5"
# Output: ✓ 2 + 3 * 5 = 17
```

### Option C: Interactive Mode
```bash
mani-calc
# Then type your calculations:
calc> 2 + 3 * 5
✓ 2 + 3 * 5 = 17

calc> 10 km to miles
✓ 10 km = 6.21 miles

calc> what is 25 percent of 200
✓ what is 25 percent of 200 = 50
```

## Common Examples

### Math
```bash
mani-calc "sqrt(144)"              # 12
mani-calc "2^10"                   # 1024
mani-calc "(100 - 20) / 4"         # 20
```

### Natural Language
```bash
mani-calc "what is 15 percent of 300"    # 45
mani-calc "half of 120"                  # 60
mani-calc "square root of 81"            # 9
```

### Unit Conversions
```bash
mani-calc "5 miles to km"                # 8.05 km
mani-calc "10 kg to pounds"              # 22.05 pounds
mani-calc "25 celsius to fahrenheit"     # 77 fahrenheit
```

### History
```bash
mani-calc history                  # View recent calculations
mani-calc "clear history"          # Clear all history
```

## Tips & Tricks

### 💡 Pro Tips
- Results are **automatically copied** to your clipboard
- Type `calc:` in Windows Search for instant access
- Use `history` to review past calculations
- All calculations work **100% offline**

### 🎯 Keyboard Shortcuts
- `Ctrl+C` in interactive mode to exit
- Type `exit` or `quit` to leave interactive mode
- Type `clear` to clear the screen
- Type `help` for examples

## Troubleshooting

### Windows Search not working?
```bash
# Run as Administrator
mani-calc install

# Then restart Windows Explorer
taskkill /f /im explorer.exe && start explorer.exe
```

### Need help?
```bash
mani-calc --help
```

## What's Next?

- ⭐ Star the project on [GitHub](https://github.com/manireddy/mani-calc)
- 📖 Read the full [README](README.md) for all features
- 🐛 Report bugs or request features in [Issues](https://github.com/manireddy/mani-calc/issues)
- 🤝 Contribute! See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Happy calculating! 🧮**

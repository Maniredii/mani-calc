# 🎨 Overlay Mode - Floating Search Box

## ✨ New Feature: Spotlight-Style Overlay

Mani-Calc now includes a **beautiful floating search box** that appears anywhere on your screen with a simple keyboard shortcut!

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Overlay Mode
```bash
npm run overlay
```

Or after global installation:
```bash
mani-calc-overlay
```

### 3. Use the Hotkey
Press **`Alt+Space`** anywhere in Windows to toggle the search box!

---

## 🎯 Features

### ⚡ Global Hotkey
- **Default**: `Alt+Space`
- Works from any application
- Instant access to calculations
- Always-on-top overlay

### 🧮 All Calculation Features
- Math expressions
- Natural language queries
- Unit conversions
- Calculation history

### 💻 System Commands
Control your computer with simple commands:

| Command | Action |
|---------|--------|
| `help` | Show available commands |
| `theme` | Toggle Light/Dark mode |
| `quit` | Quit application |
| `sleep` | Put computer to sleep |
| `shutdown` | Shutdown computer |
| `restart` | Restart computer |
| `lock` | Lock computer |
| `logout` | Log out current user |
| `empty recycle bin` | Empty recycle bin |
| `volume up` | Increase volume |
| `volume down` | Decrease volume |
| `mute` | Mute volume |
| `unmute` | Unmute volume |

### 🎨 Beautiful UI
- Glassmorphism design
- Smooth animations
- Live preview
- Auto-hide on blur
- Keyboard shortcuts

---

## 📖 Usage

### Basic Calculations
```
Type: 2 + 3 * 5
Result: ✓ 2 + 3 * 5 = 17
```

### Natural Language
```
Type: what is 25% of 200
Result: ✓ what is 25% of 200 = 50
```

### Unit Conversions
```
Type: 10 km to miles
Result: ✓ 10 km = 6.21 miles
```

### System Commands
```
Type: sleep
Result: ✓ System going to sleep...
```

```
Type: lock
Result: ✓ Locking computer...
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+Space` | Toggle search box |
| `Enter` | Execute query |
| `Esc` | Close search box |
| `Ctrl+C` | Exit overlay mode |

---

## 🎨 UI Features

### Glassmorphism Design
- Semi-transparent white background
- Blur effect
- Smooth shadows
- Modern aesthetic

### Live Preview
- See results as you type
- Instant feedback
- No need to press Enter for simple calculations

### Auto-Hide
- Automatically hides when you click outside
- Keeps your desktop clean
- Instant recall with hotkey

### Smooth Animations
- Slide-down effect for results
- Fade transitions
- Professional feel

---

## 🔧 Advanced Configuration

### Change Hotkey
Edit `src/ui/floating-search.js`:

```javascript
this.hotkey = 'Ctrl+Shift+Space'; // Your custom hotkey
```

### Customize Position
Edit `src/ui/floating-search.js`:

```javascript
const y = Math.floor(height * 0.3); // Change 0.3 to adjust vertical position
```

### Customize Appearance
Edit `src/ui/overlay.html` CSS section to change:
- Colors
- Size
- Transparency
- Border radius
- Shadows

---

## 💡 Use Cases

### Quick Calculations While Working
```
Working in Excel → Alt+Space → "2500 * 0.15" → Enter
Result copied → Paste in Excel
```

### System Control
```
Finishing work → Alt+Space → "lock" → Enter
Computer locked instantly
```

### Unit Conversions
```
Reading recipe → Alt+Space → "2 cups to ml" → Enter
Result: 473.18 ml
```

### Quick Sleep
```
Alt+Space → "sleep" → Enter
Computer goes to sleep
```

---

## 🛠️ Troubleshooting

### Hotkey Not Working?

**Check for conflicts:**
```bash
# Other apps might be using Alt+Space
# Change the hotkey in floating-search.js
```

### Overlay Not Appearing?

**Restart overlay mode:**
```bash
# Press Ctrl+C to stop
# Run: npm run overlay
```

### System Commands Not Working?

**Run as Administrator:**
```bash
# Right-click Command Prompt → Run as Administrator
# Then: npm run overlay
```

---

## 🎯 Comparison: Overlay vs Windows Search

| Feature | Overlay Mode | Windows Search |
|---------|--------------|----------------|
| **Hotkey** | Alt+Space (customizable) | Win+S |
| **Position** | Center screen | Top-right |
| **Design** | Modern glassmorphism | Windows default |
| **System Commands** | ✅ Yes | ❌ No |
| **Live Preview** | ✅ Yes | ❌ No |
| **Always Available** | ✅ Yes | ✅ Yes |

**Use Both!**
- **Overlay**: Quick calculations, system commands
- **Windows Search**: File search, web search, calculations

---

## 🚀 Auto-Start on Windows Boot

### Option 1: Task Scheduler
1. Open Task Scheduler
2. Create Basic Task
3. Name: "Mani-Calc Overlay"
4. Trigger: At log on
5. Action: Start program
6. Program: `C:\Program Files\nodejs\node.exe`
7. Arguments: `C:\Users\[YourName]\AppData\Roaming\npm\node_modules\mani-calc\bin\overlay.js`

### Option 2: Startup Folder
1. Press `Win+R`
2. Type: `shell:startup`
3. Create shortcut to overlay.js
4. Restart computer

---

## 📊 Performance

- **Memory Usage**: ~50-80 MB (Electron)
- **CPU Usage**: <1% when idle
- **Startup Time**: ~2 seconds
- **Response Time**: <100ms

---

## 🎨 Customization Ideas

### Change Theme
Edit `overlay.html` CSS:
```css
/* Dark theme */
.search-box {
  background: rgba(30, 30, 30, 0.95);
  color: white;
}
```

### Add More System Commands
Edit `floating-search.js`:
```javascript
'screenshot': {
  action: async () => {
    await execAsync('snippingtool');
    return 'Opening Snipping Tool...';
  }
}
```

### Change Size
Edit `floating-search.js`:
```javascript
width: 800,  // Make wider
height: 100, // Make taller
```

---

## 🔐 Privacy & Security

### System Commands
- All commands run locally
- No network requests
- Requires user confirmation (Enter key)
- Can be disabled by removing commands

### Data Storage
- Same as CLI mode
- History stored locally
- No telemetry

---

## 🎉 Tips & Tricks

### 1. Quick Math
```
Alt+Space → "15*23" → Enter
Result copied instantly
```

### 2. Chain Commands
```
Alt+Space → "100 km to miles" → Enter
Alt+Space → "lock" → Enter
```

### 3. Use as Calculator Replacement
```
Never open Calculator app again!
Alt+Space is faster
```

### 4. System Control Hub
```
Alt+Space → "sleep"
Alt+Space → "lock"
Alt+Space → "mute"
```

---

## 🗺️ Future Enhancements

- [ ] Custom themes
- [ ] Plugin system
- [ ] File search integration
- [ ] Web search integration
- [ ] Clipboard history
- [ ] Snippets/templates
- [ ] Multi-monitor support
- [ ] Custom hotkeys per command

---

## 🤝 Contributing

Want to add more system commands or features? See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**Enjoy your new productivity superpower!** ⚡

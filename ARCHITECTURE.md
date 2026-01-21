# 📁 Project Structure - Mani-Calc

```
mani-calc/
│
├── 📦 bin/
│   └── cli.js                    # CLI entry point & interactive mode
│
├── 🧠 src/
│   ├── index.js                  # Main ManiCalc class (orchestrator)
│   │
│   ├── 🔧 core/                  # Core calculation engines
│   │   ├── math-engine.js        # Math expression evaluator (mathjs)
│   │   ├── nlp-parser.js         # Natural language parser
│   │   ├── unit-converter.js     # Unit conversion system
│   │   ├── history-manager.js    # Calculation history storage
│   │   └── clipboard-manager.js  # Clipboard integration
│   │
│   └── 🔌 integration/
│       └── windows-search.js     # Windows Search protocol handler
│
├── 🧪 test/
│   └── test.js                   # Comprehensive test suite
│
├── 📚 Documentation/
│   ├── README.md                 # Main documentation
│   ├── QUICKSTART.md             # Quick start guide
│   ├── EXAMPLES.md               # Usage examples
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   └── CHANGELOG.md              # Version history
│
├── ⚙️ Configuration/
│   ├── package.json              # npm package configuration
│   ├── .gitignore                # Git ignore rules
│   └── LICENSE                   # MIT License
│
└── 🔧 .vscode/
    └── extensions.json           # Recommended VS Code extensions
```

## 📋 File Descriptions

### Core Components

#### `src/index.js`
- **Purpose**: Main orchestrator class
- **Responsibilities**:
  - Coordinates all subsystems
  - Processes user queries
  - Routes to appropriate handler (math/NLP/conversion)
  - Manages initialization and shutdown

#### `src/core/math-engine.js`
- **Purpose**: Mathematical expression evaluator
- **Features**:
  - Uses mathjs for robust calculations
  - Supports all standard math functions
  - Custom functions (percent, half, double, triple)
  - Variable storage for sessions
  - Smart result formatting

#### `src/core/nlp-parser.js`
- **Purpose**: Natural language query parser
- **Capabilities**:
  - Percentage queries ("what is 25% of 200")
  - Fraction queries ("half of 80")
  - Power queries ("10 squared")
  - Square root queries ("square root of 64")
  - Unit conversion detection
  - Pattern-based regex matching

#### `src/core/unit-converter.js`
- **Purpose**: Comprehensive unit conversion
- **Supported Categories**:
  - Length (km, miles, feet, etc.)
  - Weight (kg, pounds, etc.)
  - Temperature (C, F, K) - special handling
  - Time (seconds, hours, days, etc.)
  - Volume (liters, gallons, etc.)
  - Speed (km/h, mph, etc.)

#### `src/core/history-manager.js`
- **Purpose**: Calculation history management
- **Features**:
  - Stores last 100 calculations
  - Timestamps each entry
  - Search functionality
  - Formatted output
  - Persistent storage in AppData

#### `src/core/clipboard-manager.js`
- **Purpose**: Clipboard integration
- **Features**:
  - Auto-copy results
  - Read clipboard content
  - Toggle auto-copy on/off

#### `src/integration/windows-search.js`
- **Purpose**: Windows Search integration
- **Methods**:
  - Protocol handler registration (calc:)
  - Search connector creation
  - Registry modifications
  - Protocol URL parsing

### Entry Points

#### `bin/cli.js`
- **Purpose**: Command-line interface
- **Modes**:
  - Direct query: `mani-calc "2+3"`
  - Interactive REPL: `mani-calc`
  - Protocol handler: `calc:2+3`
  - Install/uninstall: `mani-calc install`
- **Features**:
  - Colored output (chalk)
  - Help system
  - Error handling
  - Readline interface for interactive mode

### Testing

#### `test/test.js`
- **Coverage**:
  - Math engine tests (16 tests)
  - NLP parser tests
  - Unit converter tests
  - All core functionality
- **Output**: Colored test results

## 🔄 Data Flow

```
User Input
    ↓
CLI / Windows Search
    ↓
ManiCalc.processQuery()
    ↓
┌─────────────┬──────────────┬─────────────┐
│             │              │             │
NLP Parser    Math Engine    Unit Converter
│             │              │             │
└─────────────┴──────────────┴─────────────┘
    ↓
Result Formatting
    ↓
┌─────────────┬──────────────┐
│             │              │
Clipboard     History Manager
│             │              │
└─────────────┴──────────────┘
    ↓
Display to User
```

## 💾 Storage Locations

### History File
```
Windows: %APPDATA%\mani-calc\history.json
```

### Registry Keys (Windows Search)
```
HKEY_CURRENT_USER\Software\Classes\calc
```

### Search Connector
```
%APPDATA%\Microsoft\Windows\Libraries\ManiCalc.searchConnector-ms
```

## 🎯 Key Design Decisions

### 1. **Modular Architecture**
- Each component has a single responsibility
- Easy to test and maintain
- Simple to extend with new features

### 2. **Offline-First**
- No external API calls
- All processing happens locally
- Fast and private

### 3. **User-Friendly**
- Natural language support
- Automatic clipboard integration
- Smart error messages
- Multiple input methods

### 4. **Windows Integration**
- Custom protocol handler
- Search connector
- Native feel

### 5. **Developer Experience**
- Clean code structure
- Comprehensive tests
- Well-documented
- Easy to contribute

## 🚀 Extension Points

Want to add new features? Here's where to start:

### Add New Unit Category
→ Edit `src/core/unit-converter.js`
→ Add to `conversions` object

### Add New NLP Pattern
→ Edit `src/core/nlp-parser.js`
→ Add to `patterns` object

### Add New Math Function
→ Edit `src/core/math-engine.js`
→ Add to `addCustomFunctions()`

### Add New Command
→ Edit `bin/cli.js`
→ Add to command handling logic

## 📊 Dependencies

### Production
- **mathjs**: Mathematical expression evaluator
- **clipboardy**: Cross-platform clipboard access
- **chalk**: Terminal colors
- **node-windows**: Windows service management

### Development
- None (lightweight!)

## 🔐 Security Considerations

1. **No External Requests**: All processing is local
2. **No Data Collection**: Zero telemetry
3. **Safe Evaluation**: mathjs prevents code injection
4. **Local Storage**: History stays on user's machine
5. **Registry Safety**: Only modifies user-level keys

---

**This structure is designed for:**
- ✅ Easy maintenance
- ✅ Simple testing
- ✅ Quick feature additions
- ✅ Clear separation of concerns
- ✅ Excellent developer experience

# Examples - Mani-Calc

Comprehensive examples of what you can do with Mani-Calc.

## 📐 Basic Math

### Arithmetic
```bash
mani-calc "2 + 3"                  # 5
mani-calc "10 - 4"                 # 6
mani-calc "5 * 6"                  # 30
mani-calc "20 / 4"                 # 5
mani-calc "2 + 3 * 5"              # 17 (order of operations)
mani-calc "(2 + 3) * 5"            # 25 (parentheses)
```

### Powers & Roots
```bash
mani-calc "2^8"                    # 256
mani-calc "10^3"                   # 1000
mani-calc "sqrt(49)"               # 7
mani-calc "sqrt(144)"              # 12
mani-calc "cbrt(27)"               # 3 (cube root)
```

### Advanced Math
```bash
mani-calc "sin(pi/2)"              # 1
mani-calc "cos(0)"                 # 1
mani-calc "tan(pi/4)"              # 1
mani-calc "log(100)"               # 2 (log base 10)
mani-calc "ln(e)"                  # 1 (natural log)
mani-calc "abs(-42)"               # 42
```

### Constants
```bash
mani-calc "pi"                     # 3.14159...
mani-calc "e"                      # 2.71828...
mani-calc "pi * 2"                 # 6.28318...
mani-calc "e^2"                    # 7.38906...
```

## 💬 Natural Language

### Percentages
```bash
mani-calc "what is 25 percent of 200"      # 50
mani-calc "15% of 300"                     # 45
mani-calc "calculate 10 percent of 500"    # 50
mani-calc "what is 7.5 percent of 1000"    # 75
```

### Fractions
```bash
mani-calc "half of 80"             # 40
mani-calc "quarter of 100"         # 25
mani-calc "third of 90"            # 30
```

### Powers (Natural Language)
```bash
mani-calc "10 squared"             # 100
mani-calc "5 cubed"                # 125
mani-calc "2 to the power of 10"   # 1024
mani-calc "3 raised to 4"          # 81
```

### Square Roots (Natural Language)
```bash
mani-calc "square root of 64"      # 8
mani-calc "sqrt of 100"            # 10
```

## 🔄 Unit Conversions

### Length
```bash
mani-calc "10 km to miles"         # 6.21 miles
mani-calc "5 miles to km"          # 8.05 km
mani-calc "100 cm to inches"       # 39.37 inches
mani-calc "6 feet to meters"       # 1.83 meters
mani-calc "1000 mm to cm"          # 100 cm
mani-calc "2 yards to feet"        # 6 feet
```

### Weight
```bash
mani-calc "10 kg to pounds"        # 22.05 pounds
mani-calc "5 pounds to kg"         # 2.27 kg
mani-calc "1000 grams to kg"       # 1 kg
mani-calc "16 oz to pounds"        # 1 pound
mani-calc "2 tons to kg"           # 2000 kg
```

### Temperature
```bash
mani-calc "0 celsius to fahrenheit"        # 32 fahrenheit
mani-calc "100 celsius to fahrenheit"      # 212 fahrenheit
mani-calc "98.6 fahrenheit to celsius"     # 37 celsius
mani-calc "273.15 kelvin to celsius"       # 0 celsius
mani-calc "32 fahrenheit to kelvin"        # 273.15 kelvin
```

### Time
```bash
mani-calc "2 hours to minutes"     # 120 minutes
mani-calc "120 seconds to minutes" # 2 minutes
mani-calc "1 day to hours"         # 24 hours
mani-calc "1 week to days"         # 7 days
mani-calc "365 days to hours"      # 8760 hours
```

### Volume
```bash
mani-calc "5 liters to gallons"    # 1.32 gallons
mani-calc "1 gallon to liters"     # 3.79 liters
mani-calc "500 ml to liters"       # 0.5 liters
mani-calc "2 cups to ml"           # 473.18 ml
mani-calc "1 quart to liters"      # 0.95 liters
```

### Speed
```bash
mani-calc "100 km/h to mph"        # 62.14 mph
mani-calc "60 mph to km/h"         # 96.56 km/h
mani-calc "10 m/s to km/h"         # 36 km/h
```

## 📚 History Commands

```bash
mani-calc history                  # View last 10 calculations
mani-calc "clear history"          # Clear all history
```

## 🎯 Real-World Use Cases

### Shopping
```bash
# Calculate discount
mani-calc "what is 20 percent of 150"      # 30 (discount amount)
mani-calc "150 - 30"                       # 120 (final price)

# Tax calculation
mani-calc "what is 8.5 percent of 100"     # 8.5 (tax)
```

### Cooking
```bash
mani-calc "2 cups to ml"           # 473.18 ml
mani-calc "350 fahrenheit to celsius"      # 176.67 celsius
mani-calc "half of 250"            # 125 (halving recipe)
```

### Travel
```bash
mani-calc "500 km to miles"        # 310.69 miles
mani-calc "120 km/h to mph"        # 74.56 mph
mani-calc "10 kg to pounds"        # 22.05 pounds (luggage weight)
```

### Fitness
```bash
mani-calc "5 miles to km"          # 8.05 km (running distance)
mani-calc "150 pounds to kg"       # 68.04 kg (body weight)
```

### Science & Engineering
```bash
mani-calc "9.8 * 5"                # 49 (acceleration * time)
mani-calc "sqrt(2) * 10"           # 14.14 (diagonal calculation)
mani-calc "pi * 5^2"               # 78.54 (circle area)
```

## 🔧 Advanced Features

### Chaining Calculations
```bash
# In interactive mode
calc> x = 100
calc> x * 2
✓ 200

calc> x / 4
✓ 25
```

### Complex Expressions
```bash
mani-calc "((10 + 5) * 3 - 20) / 5"        # 5
mani-calc "sqrt(16) + sqrt(9)"             # 7
mani-calc "2^3 + 3^2"                      # 17
```

## 💡 Tips

1. **Quotes**: Use quotes for queries with spaces
   ```bash
   mani-calc "10 km to miles"  # ✓ Correct
   mani-calc 10 km to miles    # ✗ Won't work
   ```

2. **Case Insensitive**: Units are case-insensitive
   ```bash
   mani-calc "10 KM to MILES"  # Works!
   mani-calc "10 Km to Miles"  # Works!
   ```

3. **Flexible Syntax**: Multiple ways to express the same thing
   ```bash
   mani-calc "10 kilometers to miles"
   mani-calc "10 km to miles"
   mani-calc "10 kilometer to mile"
   # All work!
   ```

---

**Want more examples? Check out the [README](README.md) or run `mani-calc --help`**

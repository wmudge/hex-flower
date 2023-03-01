# Hex Flower Game Engine



Derived from [Goblin's Henchman](https://goblinshenchman.wordpress.com).

# Install

```bash
npm install hex-flower
```

# Use

```javascript
import { HexFlowerEngine } from "hex-flower";

const hexflower = new HexFlowerEngine();
console.log("Starting Hex: " + hexflower.current);

for (let i = 0; i < 10; i++) {
  console.log(`Next Hex: ${hexflower.roll()}`)
}
```
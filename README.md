# Hex Flower Game Engine

The Hex Flower game engine is a random number generator using a 19-cell hex grid. The engine keeps track of the last visited hex/number and is supplied several rules for choosing the next hex/number and what to do if this new direction leaves the hex grid.

Derived from the excellent work of [Goblin's Henchman](https://goblinshenchman.wordpress.com).

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
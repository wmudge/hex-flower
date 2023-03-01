/*
The MIT License (MIT)
Copyright © 2023 Webster Mudge

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export const DEFAULTS = {
  INFINITE: {
    grid: [
      { a: 4, b: 2, c: 2, d: null, e: 1, f: 1 },
      { d: 16, c: 0, e: 10 },
      { c: 8, d: 17, e: 0 },
      { d: 13, e: 15, f: 0 },
      { d: 0 },
      { b: 0, c: 13, d: 15 },
      {},
      {},
      { e: 17, f: 2 },
      {},
      { b: 1, c: 16 },
      {},
      {},
      { a: 3, e: 18, f: 5 },
      { a: 18 },
      { a: 5, b: 3, c: 18 },
      { a: 1, f: 10, b: 18 },
      { a: 2, b: 8, f: 18 },
      { a: null, b: null, c: 17, d: 14, e: 16, f: null },
    ],
    steps: {
      a: 5,
      b: 3,
      c: -2,
      d: -5,
      e: -3,
      f: 2,
    },
  },
};

export class HexFlowerGrid {
  constructor(config = {}) {
    this.grid = config.grid || DEFAULTS.INFINITE.grid;
    this.steps = config.steps || DEFAULTS.INFINITE.steps;
    this.navigationHex = config.navigationHex || NavigationHex.create2D6();
  }

  roll(currentHex) {
    let sourceHex = this.grid[currentHex];
    let direction = this.navigationHex.navigate();

    if (direction in sourceHex) {
      if (sourceHex[direction] != null) {
        return sourceHex[direction];
      } else {
        return currentHex;
      }
    } else {
      return currentHex + this.steps[direction];
    }
  }
}

export class HexFlowerEngine {
  constructor(config = {}) {
    this.currentHex = config.startingHex || 0;
    this.hexGrid = config.hexGrid || new HexFlowerGrid();
  }

  get current() {
    return this.currentHex;
  }

  roll() {
    this.currentHex = this.hexGrid.roll(this.currentHex);
    return this.currentHex;
  }
}

export class NavigationHex {
  constructor(generatorFunction) {
    this.generator = generatorFunction;
  }

  navigate() {
    return this.generator();
  }

  static create2D6() {
    return new NavigationHex(function () {
      this.roll = rollDie(6) + rollDie(6);
      switch (this.roll) {
        case 12:
          return "a";
        case 2:
        case 3:
          return "b";
        case 4:
        case 5:
          return "c";
        case 6:
        case 7:
          return "d";
        case 8:
        case 9:
          return "e";
        case 10:
        case 11:
          return "f";
        default:
          throw new Error("Invalid NavigationHex roll result: " + this.roll);
      }
    });
  }

  static createD4D10() {}
}

// See https://gist.github.com/hperantunes/05a930649413b7785df5
function rollDie(sides) {
  return ~~(Math.random() * sides) + 1;
}

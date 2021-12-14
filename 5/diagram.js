const { green, cyan, grey } = require("colors/safe");

class Diagram {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.gridStartX = 0;
        this.gridStartY = 0;

        let precision = 10;
        this.gridEndX =
            Math.round(
                Math.max(
                    ...[].concat(...coordinates.map((coord) => coord[0]))
                ) / precision
            ) * precision;
        this.gridEndY =
            Math.round(
                Math.max(
                    ...[].concat(...coordinates.map((coord) => coord[1]))
                ) / precision
            ) * precision;
        this.squareGrid = this.gridEndX * this.gridEndY;

        this.cells = {};
        for (let cell = 0; cell < this.squareGrid; cell++) {
            this.cells[cell] = 0;
        }
    }

    mapLines(mapDiagonal) {
        for (let i = 0; i < this.coordinates.length; i++) {
            const x1 = this.coordinates[i][0][0];
            const x2 = this.coordinates[i][1][0];
            const y1 = this.coordinates[i][0][1];
            const y2 = this.coordinates[i][1][1];

            const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);
            const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);

            const yRange = [...Array(yMax - yMin + 1).keys()].map((i) => {
                if (y1 > y2) {
                    return (i - y1) * -1;
                } else {
                    return i + y1;
                }
            });

            const xRange = [...Array(xMax - xMin + 1).keys()].map((i) => {
                if (x1 > x2) {
                    return (i - x1) * -1;
                } else {
                    return i + x1;
                }
            });

            if (x1 === x2) {
                for (let i = 0; i < yRange.length; i++) {
                    let cell = yRange[i] * this.gridEndY + x1;
                    this.cells[cell] += 1;
                }
            } else if (y1 === y2) {
                for (let i = 0; i < xRange.length; i++) {
                    let cell = y1 * this.gridEndY + xRange[i];
                    this.cells[cell] += 1;
                }
            } else if (mapDiagonal && x1 !== x2 && y1 !== y2) {
                for (let i = 0; i < yRange.length; i++) {
                    let cell = yRange[i] * this.gridEndY + xRange[i];
                    this.cells[cell] += 1;
                }
            }
        }

        return this.cells;
    }

    totalOverlaps() {
        let total = [];

        for (const [key, value] of Object.entries(this.cells)) {
            if (value > 1) {
                total.push(key);
            }
        }

        return total.length;
    }

    print() {
        let grid = "";
        for (let row = 0; row < this.gridEndX; row++) {
            let rows = [];
            for (let col = 0; col < this.gridEndY; col++) {
                let cell = this.cells[row * this.gridEndX + col];
                let paddedCell = cell !== 0 ? String(cell) : grey("*");
                rows.push(cell > 1 ? green(paddedCell) : cyan(paddedCell));
            }
            grid += `${rows.join(" ")}\n`;
        }

        return grid;
    }
}

module.exports = {
    Diagram,
};

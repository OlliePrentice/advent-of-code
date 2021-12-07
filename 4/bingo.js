const { green, red } = require("colors/safe");

class Scorecard {
    constructor(block, id) {
        this.id = id;
        this.block = block;
        // Parse the scorecard string to an array
        this.grid = block.split("\n").map((row) =>
            row
                .trim()
                .split(/\s+/)
                .map((v) => parseInt(v))
        );

        // Populate coordinate positions of the numbers
        this.cells = {};
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                let cell = this.grid[row][col];
                this.cells[cell] = [row, col];
            }
        }

        // Create an empty grid to score picked numbers
        // Top to bottom
        this.match_rows = Array(this.grid.length).fill(0);
        // Left to right
        this.match_cols = Array(this.grid.length).fill(0);
    }

    hasMatch(number) {
        return Boolean(this.cells[number]);
    }

    score(number) {
        if (!this.hasMatch(number)) {
            return;
        }

        const [row, col] = this.cells[number];
        this.match_rows[row] += 1;
        this.match_cols[col] += 1;

        return this.match_rows[row] === 5 || this.match_cols[col] === 5;
    }

    bingo() {
        return (
            this.match_rows.some((row) => row === 5) ||
            this.match_cols.some((col) => col === 5)
        );
    }

    getScore(called) {
        const uncalled = [];
        for (let number of Object.keys(this.cells)) {
            number = parseInt(number, 10);

            if (!called.includes(number)) {
                uncalled.push(number);
            }
        }

        const uncalledSum = uncalled.reduce(
            (total, current) => total + current,
            0
        );

        const lastCall = called[called.length - 1];

        return uncalledSum * lastCall;
    }

    print(called) {
        if (!called) {
            return this.block;
        }

        let calledLookup = called.reduce(
            (obj, num) => ((obj[num] = true), obj),
            {}
        );

        let grid = this.grid
            .map((row) => {
                let rows = [];
                for (let cell of row) {
                    let paddedCell = String(cell).padStart(2);
                    rows.push(
                        calledLookup[cell] ? green(paddedCell) : red(paddedCell)
                    );
                }

                return rows.join(" ");
            })
            .join("\n");

        return grid;
    }
}

class Picker {
    constructor(numbers, scorecards) {
        this.numbers = numbers;
        this.scorecards = scorecards;
        this.picked = -1;

        this.called = [];
    }

    next() {
        this.picked++;
        const number = this.numbers[this.picked];

        this.called.push(number);

        const bingos = [];
        for (const scorecard of this.scorecards) {
            if (scorecard.bingo()) {
                continue;
            }

            if (scorecard.score(number)) {
                bingos.push(scorecard);
            }
        }

        if (bingos.length > 0) {
            return bingos;
        }

        return;
    }
}

module.exports = {
    Scorecard,
    Picker,
};

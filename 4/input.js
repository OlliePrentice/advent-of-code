const fs = require("fs");
const path = require("path");

const { numbers, scorecards } = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .toString()
    .trim()
    .split("\n\n")
    .reduce(
        (obj, block, i) => {
            if (i === 0) {
                obj.numbers = block.split(",").map((v) => parseInt(v, 10));
            } else {
                obj.scorecards.push(block);
            }

            return obj;
        },
        { numbers: null, scorecards: [] }
    );

module.exports = {
    numbers,
    scorecards,
};

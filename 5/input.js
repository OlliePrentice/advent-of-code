const fs = require("fs");
const path = require("path");

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map((line) =>
        line
            .trim()
            .split(/->/)
            .map((paths) =>
                paths
                    .trim()
                    .split(",")
                    .map((coords) => parseInt(coords.trim(), 10))
            )
    );

module.exports = {
    input,
};

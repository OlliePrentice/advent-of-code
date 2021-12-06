const { input } = require("./input.js");

(() => {
    let count = 0;

    input.reduce((previousDepth, currentDepth, index) => {
        if (previousDepth < currentDepth) {
            count++;
        }

        return input[index];
    });

    console.log('Part 1:', count);
})();

(() => {
    let count = 0;

    input.reduce((previousDepth, currentDepth, index) => {
        const current = previousDepth + currentDepth + input[index + 1];
        const next = currentDepth + input[index + 1] + input[index + 2];

        if (current < next) {
            count++;
        }

        return input[index];
    });

    console.log('Part 2:', count);
})();

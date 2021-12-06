const { input } = require("./input");

(() => {
    let horizontal = 0;
    let vertical = 0;

    input.forEach((control) => {
        switch (control.movement) {
            case "up":
                vertical -= control.amount;
                break;
            case "down":
                vertical += control.amount;
                break;
            default:
                horizontal += control.amount;
                break;
        }
    });

    console.log("Part 1:", horizontal * vertical);
})();

(() => {
    let horizontal = 0;
    let vertical = 0;
    let aim = 0;

    input.forEach((control) => {
        switch (control.movement) {
            case "up":
                aim -= control.amount;
                break;
            case "down":
                aim += control.amount;
                break;
            default:
                vertical += aim * control.amount;
                horizontal += control.amount;
                break;
        }
    });

    console.log("Part 2:", horizontal * vertical);
})();

const { scorecards, numbers } = require("./input");
const { Picker, Scorecard } = require("./bingo");
const { cyan } = require("colors/safe");

(() => {
    const picker = new Picker(numbers, scorecards.map((v, i) => new Scorecard(v, i)));
    let winners;

    while (!winners) {
        winners = picker.next();
    }

    const [winner, ...rest] = winners;

    if (rest.length > 0) {
        throw new Error("More than one board won first!");
    }

    console.log("\nPART ONE\n");
    console.log(
        picker.called
            .map((num) => (winner.hasMatch(num) ? cyan(num) : num))
            .join(" ") + "\n"
    );
    console.log("Winner:", winner.id);
    console.log("Score:", winner.getScore(picker.called));
    console.log("-----");
    console.log(winner.print(picker.called));
})();

(() => {
    const picker = new Picker(numbers, scorecards.map((v, i) => new Scorecard(v, i)));
    let winners;
    let boardsRemaining = scorecards.length;


    while(boardsRemaining > 0) {
        winners = picker.next();

        if(winners) {
            boardsRemaining -= winners.length;
        }
    }

    let [winner, ...rest] = winners;

    if (rest.length > 0) {
        throw new Error('More than one board won last!');
    }

    console.log("-----");
    console.log("\nPART TWO\n");
    console.log(
        picker.called
            .map((num) => (winner.hasMatch(num) ? cyan(num) : num))
            .join(" ") + "\n"
    );
    console.log("Winner:", winner.id);
    console.log("Score:", winner.getScore(picker.called));
    console.log("-----");
    console.log(winner.print(picker.called));
})();

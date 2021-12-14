const { Diagram } = require("./diagram");
const { input } = require("./input");

(() => {
    const map = new Diagram(input);
    map.mapLines();
    console.log("Part 1:", map.totalOverlaps());
    // console.log("-----");
    // console.log(map.print());
})();

(() => {
    const map = new Diagram(input);
    map.mapLines(true);
    console.log("Part 2:", map.totalOverlaps());
    // console.log("-----");
    // console.log(map.print());
})();

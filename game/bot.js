const combinationToPointMapping = [
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
    [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
    [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],

    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}],
    [{x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}],

    [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}],
];

function getAllCombinations(a) {
    return [
        [...a[0]],
        [...a[1]],
        [...a[2]],

        [a[0][0], a[1][0], a[2][0]],
        [a[0][1], a[1][1], a[2][1]],
        [a[0][2], a[1][2], a[2][2]],

        [a[0][0], a[1][1], a[2][2]],
        [a[0][2], a[1][1], a[2][0]],
    ];
}

// This function is playing with the random tactic, it's pretty stupid I must say

const lvl0 = (gameArray) => {
    let emptyBlocks = [];
    gameArray.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
            if (cell === 0) emptyBlocks.push({
                x: rowIdx,
                y: cellIdx
            });
        });
    });
    const choice = Math.round(Math.random() * (emptyBlocks.length - 1));
    return emptyBlocks[choice];
};



// This function is playing with some thinking but he is not very strong!

const lvl1 = (gameArray) => {
    const combinations = getAllCombinations(gameArray);
    let possibleChoice;
    // If we can win, let's win
    for (let i = 0; i < combinations.length; i++) {
        if (combinations[i].reduce((a, b) => a + b) === -2) {
            const idx = combinations[i].indexOf(0);
            return combinationToPointMapping[i][idx];
        } else if (combinations[i].reduce((a, b) => a + b) === 2) {
            const idx = combinations[i].indexOf(0);
            possibleChoice = combinationToPointMapping[i][idx];
        }
    }

    // If we can block opponent, than block, else playing stupid
    return possibleChoice || lvl0(gameArray);
};



// This function is playing with the best tactic to draw, he will not try to win, but it's impossible to win him HAHA!

const lvl2 = (gameArray) => {
    // On the first move handling situation manually
    // Then lvl1 can handle the situation

    let moves = 0;
    gameArray.forEach(row => row.forEach(cell => {
        if (cell !== 0) moves++;
    }));

    if (moves === 1) {
        if (gameArray[1][1] === 0) {
            return {x: 1, y: 1};
        } else {
            // If user have chosen the central box, than checking any corner to not lose by force
            const choices = [
                {x: 0, y: 0},
                {x: 2, y: 2},
                {x: 0, y: 2},
                {x: 2, y: 0},
                ];
            return choices[Math.round(Math.random() * 3)]
        }
    }
    return lvl1(gameArray);
};

export default [lvl0, lvl1, lvl2];
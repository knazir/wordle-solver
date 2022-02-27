/***** Optional Browser Code for https://www.nytimes.com/games/wordle/index.html (RUN THIS IN CONSOLE TO GET DATA) *****/
function scrapeAndPrintConfig() {
    const configWrongSpotLetters = [new Set(), new Set(), new Set(), new Set(), new Set()];
    const configGuessedSpotLetters = ["", "", "", "", ""];
    const invalidLetters = new Set();

    const gameApp = document.querySelector("game-app").shadowRoot;
    for (const rowContainer of gameApp.querySelectorAll("game-row")) {
        if (!rowContainer.getAttribute("letters")) continue;
        const actualRow = rowContainer.shadowRoot;
        const row = actualRow.querySelector(".row");
        for (let i = 0; i < row.children.length; i++) {
            const guessLetter = row.children[i];
            const actualLetter = guessLetter.getAttribute("letter").toLowerCase();
            const evaluation = guessLetter.getAttribute("evaluation");

            if (evaluation === "absent") {
                invalidLetters.add(actualLetter);
            } else if (evaluation === "present") {
                configWrongSpotLetters[i].add(actualLetter);
            } else if (evaluation === "correct") {
                configGuessedSpotLetters[i] = actualLetter;
            }
        }
    }

    console.log(`

// 1. Which letters were incorrect?
const CONFIG_INVALID_LETTERS = "${Array.from(invalidLetters).sort().join("")}";

// 2. Which letters did you guess that were in the word but not in the correct spot?
const CONFIG_WRONG_SPOT_LETTERS = [
    "${Array.from(configWrongSpotLetters[0]).join("")}",
    "${Array.from(configWrongSpotLetters[1]).join("")}",
    "${Array.from(configWrongSpotLetters[2]).join("")}",
    "${Array.from(configWrongSpotLetters[3]).join("")}",
    "${Array.from(configWrongSpotLetters[4]).join("")}",
]

// 3. Which letters did you guess in the correct spots?
const CONFIG_GUESSED_SPOT_LETTERS = [
    "${configGuessedSpotLetters[0]}", 
    "${configGuessedSpotLetters[1]}", 
    "${configGuessedSpotLetters[2]}", 
    "${configGuessedSpotLetters[3]}", 
    "${configGuessedSpotLetters[4]}",
];
    `.trim());
}

scrapeAndPrintConfig();
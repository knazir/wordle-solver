/***** Optional Browser Code for https://www.wordleunlimited.com (RUN THIS IN CONSOLE TO GET DATA) *****/
function scrapeAndPrintConfig() {
    const configWrongSpotLetters = [new Set(), new Set(), new Set(), new Set(), new Set()];
    const configGuessedSpotLetters = ["", "", "", "", ""];
    const invalidLetters = new Set();

    for (const guessRow of document.querySelectorAll(".RowL-locked-in"))  {
        for (let i = 0; i < guessRow.children.length; i++) {
            const guessLetter = guessRow.children[i];
            const actualLetter = guessLetter.textContent.trim().toLowerCase();

            if (guessLetter.classList.contains("letter-absent")) {
                invalidLetters.add(actualLetter);
            } else if (guessLetter.classList.contains("letter-elsewhere")) {
                configWrongSpotLetters[i].add(actualLetter);
            } else if (guessLetter.classList.contains("letter-correct")) {
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
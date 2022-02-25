const fs = require("fs");
const path = require("path");

/***** Create Dictionary *****/
const validWords = new Set()

// macOS Dictionary (pretty limited)
// const dictFile = fs.readFileSync("/usr/share/dict/words").toString();
// for (const word of dictFile.split(/\r?\n/)) {
//     validWords.add(word)
// }

// Custom Dictionary, thanks to Tushar from StackOverflow:
// https://stackoverflow.com/questions/41768215/english-json-dictionary-with-word-word-type-and-definition
const filenames = fs.readdirSync(path.join(__dirname, "data"), {
    withFileTypes: true
}).map(file => file.name).filter(filename => filename.endsWith(".json"));
for (const filename of filenames) {
    const contents = fs.readFileSync(path.join(__dirname, "data", filename));
    const dictJson = JSON.parse(contents);
    for (const word of Object.keys(dictJson)) {
        validWords.add(word.toLowerCase());
    }
}

/***** Helper Methods *****/
function getCurrentFinalLetters() {
    const finalLetters = new Set();
    for (const spotLetters of wrongSpotLetters) {
        for (const letter of spotLetters.split("")) {
            finalLetters.add(letter);
        }
    }
    for (const letter of guessedSpots) {
        for (const splitLettersInCase of letter.split("")) {
            finalLetters.add(splitLettersInCase);
        }
    }
    return finalLetters;
}

function isWordValid(word) {
    if (!validWords.has(word)) return false;
    const wordLetters = new Set(word.split(""));
    for (const requiredLetter of currentFinalLetters) {
        if (!wordLetters.has(requiredLetter)) return false;
    }
    return true;
}

/***** Letter Guessing (FILL OUT THIS SECTION AS YOU GO) *****/
const CONFIG_ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";

// 1. Which letters were incorrect?
const CONFIG_INVALID_LETTERS = "";

// 2. Which letters did you guess that were in the word but not in the correct spot?
const CONFIG_WRONG_SPOT_LETTERS = [
    "",
    "",
    "",
    "",
    "",
]

// 3. Which letters did you guess in the correct spots?
const CONFIG_GUESSED_SPOT_LETTERS = [
    "", 
    "", 
    "", 
    "", 
    "",
];

// Don't mind me... just formatting your guesses
const allLetters = new Set(CONFIG_ALL_LETTERS.toLowerCase().split(""));
const invalidLetters = new Set(CONFIG_INVALID_LETTERS.toLowerCase().split(""));
const wrongSpotLetters = CONFIG_WRONG_SPOT_LETTERS.map(letters => letters.toLowerCase());
const guessedSpots = CONFIG_GUESSED_SPOT_LETTERS.map(letter => letter.toLowerCase());
const currentFinalLetters = getCurrentFinalLetters();

/***** Generate Valid Words *****/
function makePermutations(results, cur = "") {
    // We finished a word, let's see if it's valid
    if (cur.length === 5) {
        if (isWordValid(cur)) results.push(cur);
        return;
    }
    
    // Check if the next spot has to be a certain letter
    const nextGuaranteedLetter = guessedSpots[cur.length];
    if (nextGuaranteedLetter) {
        makePermutations(results, cur + nextGuaranteedLetter);
        return;
    }

    // Figure out which letters we can't guess
    const lettersToGuess = new Set(allLetters);
    for (const invalidLetter of invalidLetters) {
        lettersToGuess.delete(invalidLetter);
    }
    const invalidLettersForSpot = wrongSpotLetters[cur.length].split("");
    for (const invalidLetter of invalidLettersForSpot) {
        lettersToGuess.delete(invalidLettersForSpot);
    }
    
    // Time to make some guesses
    for (const letter of lettersToGuess) {
        makePermutations(results, cur + letter);
    }
}

/***** Print Results *****/
let results = [];
makePermutations(results);
console.log(results);

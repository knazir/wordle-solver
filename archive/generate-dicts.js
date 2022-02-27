const fs = require("fs");
const path = require("path");

const dicts = {};

// Custom Dictionary, thanks to Tushar from StackOverflow:
// https://stackoverflow.com/questions/41768215/english-json-dictionary-with-word-word-type-and-definition
const filenames = fs.readdirSync(path.join(__dirname, "data", "full"), {
    withFileTypes: true
}).map(file => file.name).filter(filename => filename.endsWith(".json"));

let maxLength = 0;

for (const filename of filenames) {
    const contents = fs.readFileSync(path.join(__dirname, "data", "full", filename));
    const dictJson = JSON.parse(contents);
    for (const word of Object.keys(dictJson)) {
        const normalizedWord = word.toLowerCase();
        const length = normalizedWord.length;
        if (!dicts[length]) dicts[length] = {};
        dicts[normalizedWord.length][normalizedWord] = true;
        if (length > maxLength) maxLength = length;
    }
}

for (let i = 1; i <= maxLength; i++) {
    const filename = `D${i}.json`;
    const contents = JSON.stringify(dicts[i] || {}, null, 2);
    fs.writeFileSync(path.join(__dirname, "data", "lightweight", filename), contents);
}

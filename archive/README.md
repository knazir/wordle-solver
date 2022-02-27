# wordle-solver
A small command-line aid to help your latest [Wordle](nytimes.com/games/wordle) addiction.

## Instructions
You'll need Node.js to run this, not super sure what version... I'm on v16.6.2 which is probably way higher than it needs to be.

1. Clone or download the repository.
2. Run `npm install` in the project root if you have the instinctual urge to do so (there are no dependencies...).
3. Open `solver.js` and find the config section:
```js
/***** Letter Guessing (FILL OUT THIS SECTION AS YOU GO) *****/
```
4. Make a guess or two on the site.
5. Update the configuration with your guesses, here's an example:
```js
/***** Letter Guessing (FILL OUT THIS SECTION AS YOU GO) *****/
const CONFIG_ALL_LETTERS = "abcdefghijklmnopqrstuvwxyz";

// 1. Which letters were incorrect?
const CONFIG_INVALID_LETTERS = "egimnoptuch";

// 2. Which letters did you guess that were in the word but not in the correct spot?
const CONFIG_WRONG_SPOT_LETTERS = [
    "",
    "a",
    "rs",
    "",
    "",
]

// 3. Which letters did you guess in the correct spots?
const CONFIG_GUESSED_SPOT_LETTERS = [
    "", 
    "r", 
    "a", 
    "s", 
    "",
];
```
6. Run the solver using either `npm start` or `node solver.js`.
7. The solver will give you a list of possible words.
8. Update your guesses and rerun the solver.

## Optional
If you, like me, are too lazy to manually input your guesses each time, I sure do have a terribly hacky solution for you. This is purely optional.
1. If you are playing on [Wordle Unlimited](https://www.wordleunlimited.com/), open the `browser-unlimited.js` file.
2. If you are playing on the original [Wordle](nytimes.com/games/wordle), open the `browser-original.js` file.
3. Copy paste the file's code into your browser's developer console and hit enter.
4. Open `solver.js` and copy-paste the contents into the config section, replacing all of the `CONFIG_*` variables.

## TODOs
- [ ] Make a nice-looking web page instead of a gross command-line program.
- [ ] Make a chrome extension that can help you on the actual Wordle pages.

## Credits
- A big thank you to Tusher for their JSON dictionary from [this StackOverflow post](https://stackoverflow.com/questions/41768215/english-json-dictionary-with-word-word-type-and-definition).

## Disclaimers
- Yes, I know I'm ruining the fun.
- Yes, I know I'm a bad person.
- Yes, I still can sleep very well at night.

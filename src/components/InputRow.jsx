import { useCallback, useEffect, useRef, useState } from "react";

import "./Row.css"

export default ({ isFocused, onAddRow, wordLength }) => {
    const [letters, setLetters] = useState([]);
    const stateRef = useRef();
    stateRef.current = letters;

    const handleKeyDown = (event) => {
        if (!isFocused) return;
        // const letters = stateRef.current;
        const key = event.key.toUpperCase();
        if (key === "BACKSPACE" && letters.length > 0) {
            setLetters(letters.slice(0, letters.length - 1));
        } else if (key === "ENTER" && letters.length === wordLength) {
            onAddRow(letters);
            setLetters([]);
        } else if (key.length === 1 && key.match(/[A-Z]/i) && letters.length < wordLength) {
            setLetters([...letters, key])
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const letterSquares = [];
    for (let i = 0; i < wordLength; i++) {
        letterSquares.push(<div key={i} className="letter empty">{letters[i] || ""}</div>);
    }

    return (
        <div className="rowContainer">
            <div className="lettersContainer">
                {letterSquares}
            </div>
        </div>
    );
}

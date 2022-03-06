import { useCallback, useEffect, useRef, useState } from "react";

import Letter from "./Letter";

import "./Row.css"

const Row = ({ rowData, isFocused, wordLength, onAdd, onDelete, onLetterStatusChange, onSave, onStartEditing  }) => {
    const initialLetters = rowData ? rowData.letters.map(letterData => letterData.letter) || [] : [];

    const [isEditing, setIsEditing] = useState(false);
    const [letters, setLetters] = useState(initialLetters);

    // TODO: Remove letters state and make it a controlled component passing down letters from overall
    // game board that are set by the handleKeyDown callback through a new onAddLetter callback
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isFocused) return;
            const key = event.key.toUpperCase();
            if (key === "BACKSPACE" && letters.length > 0) {
                setLetters(letters.slice(0, letters.length - 1));
            } else if (key === "ENTER" && letters.length === wordLength) {
                onAdd(letters);
                setLetters([]);
            } else if (key.length === 1 && key.match(/[A-Z]/i) && letters.length < wordLength) {
                setLetters([...letters, key])
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isFocused, letters, onAdd, wordLength]);

    const letterSquares = [];
    for (let i = 0; i < wordLength; i++) {
        const letterData = letters[i];
        const key = letterData ? letterData.id : `empty-${i}`;
        letterSquares.push(
            <Letter key={key} letterData={letterData} onStatusChange={onLetterStatusChange}/>
        );
    }

    const onEditRow = () => {
        setIsEditing(true);
        onStartEditing(rowData.id);
    };

    const onSaveRow = () => {
        setIsEditing(false);
        onSave(rowData.id);
    };

    const onDeleteRow = () => {
        setIsEditing(false);
        onDelete(rowData.id);
    };

    return (
        <div className="rowContainer">
            <div className="lettersContainer" style={{ gridTemplateColumns: `repeat(${wordLength}, 4rem)` }}>
                {letterSquares}
            </div>
            <div className="rowButtons">
                {
                    !isEditing && onStartEditing && 
                    <button className="editButton" title="Edit" onClick={onEditRow}>
                        <i className="fa-solid fa-pen-to-square"/>
                    </button>
                }
                {
                    isEditing && onSave &&
                    <button className="saveButton" title="Save" onClick={onSaveRow}>
                        <i className="fa-solid fa-check"/>
                    </button>
                }
                {
                    onDelete &&
                    <button className="deleteButton" title="Delete" onClick={onDeleteRow}>
                        <i className="fa-solid fa-trash"/>
                    </button>
                }
            </div>
        </div>
    );
}

export default Row;

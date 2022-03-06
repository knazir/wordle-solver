import { useState } from "react";

import "./Row.css"

const Row = ({ data, onStartEditingRow, onSaveRow, onDeleteRow }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [letters, setLetters] = useState(data.letters.map(letterData => letterData.letter));

    const onEdit = () => {
        setIsEditing(true);
        onStartEditingRow(data.id);
    };

    const onSave = () => {
        setIsEditing(false);
        onSaveRow(data.id);
    };

    return (
        <div className={`rowContainer ${isEditing ? "editing" : ""}`}>
            <div className="lettersContainer">
                {data.letters.map((letterData) => {
                    return <div key={letterData.id} className={`letter ${letterData.status}`}>{letterData.letter}</div>;
                })}
            </div>
            <div className="rowButtons">
                {
                    !isEditing 
                        ?
                        <button className="editButton" title="Edit" onClick={onEdit}>
                            <i className="fa-solid fa-pen-to-square"/>
                        </button>
                        :
                        <button className="saveButton" title="Save" onClick={onSave}>
                            <i className="fa-solid fa-check"/>
                        </button>
                }
                <button className="deleteButton" title="Delete" onClick={() => onDeleteRow(data.id)}>
                    <i className="fa-solid fa-trash"/>
                </button>
            </div>
        </div>
    );
}

export default Row;

import { useState } from "react";

import { LetterStatus } from "../utils";

import "./Letter.css";

const Letter = ({ letterData, onStatusChange }) => {
    const actualLetterData = letterData || { letter: "", status: LetterStatus.Empty };
    const { letter, status } = actualLetterData;

    const onLetterStatusChange = () => {
        if (!actualLetterData.id) return;
        const statuses = Object.values(LetterStatus);
        const newIndex = (statuses.indexOf(status) + 1) % statuses.length;
        onStatusChange(actualLetterData, newIndex)
    };

    // TODO: Change to <input> when editing
    return (
        <div className={`letter ${status}`} onClick={onLetterStatusChange}>{letter}</div>
    );
}
export default Letter;

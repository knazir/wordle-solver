import { useRef, useState, useEffect } from "react";

import Row from "./Row";

import "./Board.css";

const Board = ({ rowData, wordLength, onAddRow, onDeleteRow, onLetterStatusChange }) => {
    const onStartEditingRow = (rowId) => {
        // TODO
    };

    const onSaveRow = (rowId) => {
        // TODO
    };

    // TODO: Store letters in 2D array and determine which is being edited/focused by
    // current index stored in state variable

    return (
        <div className="board">
            <h2>Board</h2>
            <div className="rows">
                {
                    rowData.map((data) => 
                        <Row key={data.id} data={data} onStartEditingRow={onStartEditingRow}
                             onSaveRow={onSaveRow} onDeleteRow={onDeleteRow}/>
                    )
                }
                <Row isFocused wordLength={wordLength} onAddRow={onAddRow}/>
            </div>
        </div>
    );
};

export default Board;

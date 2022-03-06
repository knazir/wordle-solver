import { useRef, useState, useEffect } from "react";

import InputRow from "./InputRow";
import Row from "./Row";

import "./Board.css";

const Board =({ rowData, wordLength, onAddRow, onDeleteRow }) => {
    const [isInputRowFocused, setIsInputRowFocused] = useState(true);
    const focusedState = useRef();
    focusedState.current = isInputRowFocused;

    const onStartEditingRow = (rowId) => {
        setIsInputRowFocused(false);
    };

    const onSaveRow = (rowId) => {
        setIsInputRowFocused(true);
    };

    return (
        <div className="board">
            <h2>Board</h2>
            <div className="rows" onKeyDown={evt => console.log(evt.key)}>
                {
                    rowData.map((data) => 
                        <Row key={data.id} data={data} onStartEditingRow={onStartEditingRow}
                             onSaveRow={onSaveRow} onDeleteRow={onDeleteRow}/>
                    )
                }
                <InputRow isFocused={isInputRowFocused} wordLength={wordLength} onAddRow={onAddRow}/>
            </div>
        </div>
    );
};

export default Board;

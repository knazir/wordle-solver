import { useRef, useState } from "react";

import Board from "./Board";
import Header from "./Header";
import { LetterStatus, getUniqueId } from "../utils";
import Suggestions from "./Suggestions";

import "./App.css"

const DEFAULT_WORD_LENGTH = 5;

const App = () => {
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  const [rowData, setRowData] = useState([]);
  const stateRef = useRef();
  stateRef.current = rowData;

  const onAddRow = (newRowLetters) => {
    const rowData = stateRef.current;
    const newRowData = {
      id: getUniqueId("row"),
      letters: []
    };
    for (let i = 0; i < newRowLetters.length; i++) {
      newRowData.letters.push({
        id: getUniqueId("letter"),
        letter: newRowLetters[i],
        status: LetterStatus.Incorrect
      });
    }
    setRowData([...rowData, newRowData]);
  }

  const onDeleteRow = (rowId) => {
    const rowData = stateRef.current;
    let deleteIndex = -1;
    for (let i = 0; i < rowData.length; i++) {
      if (rowData[i].id === rowId) {
        deleteIndex = i;
        break;
      }
    }
    if (deleteIndex !== -1) {
      setRowData([...rowData.slice(0, deleteIndex), ...rowData.slice(deleteIndex + 1)]);
    }
  }

  return (
    <>
      <Header/>
      <div className="split">
        <Board rowData={rowData} wordLength={wordLength} onAddRow={onAddRow} onDeleteRow={onDeleteRow}/>
        <Suggestions rowData={rowData}/>
      </div>
    </>
  );
};

export default App;

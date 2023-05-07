// import Board from "./Board";
import Header from "../../components/Header";
// import { LetterStatus, getUniqueId } from "../utils";
// import Suggestions from "./Suggestions";

import "./App.css"

const DEFAULT_WORD_LENGTH = 5;

const App = () => {
  return (
    <>
      <Header/>
      <div className="split">
        <h1 style={{textAlign: "center", marginTop: "2rem"}}>Board</h1>
        <h1 style={{textAlign: "center", marginTop: "2rem"}}>Suggestions</h1>
        {/* <Board rowData={rowData} onAddRow={onAddRow} onDeleteRow={onDeleteRow} wordLength={DEFAULT_WORD_LENGTH}/>
        <Suggestions rowData={rowData}/> */}
      </div>
    </>
  );
};

export default App;

import { useRef, useState } from "react";

let uniqueId = 0;
const uniqueIds = {
    __default: 0,
};
export function getUniqueId(prefix = "__default") {
    if (!uniqueIds[prefix]) uniqueIds[prefix] = 0;
    return uniqueIds[prefix]++;
}

export const LetterStatus = {
    Incorrect: "incorrect",
    Elsewhere: "elsewhere",
    Correct: "correct",
    Empty: "empty",
};

export const useRefState = (defaultValue) => {
    const [state, _setState] = useState(defaultValue);
    const stateRef = useRef();
    stateRef.current = state;
    const setState = (data) => {
        stateRef.current = data;
        _setState(data);
    };
    return [state, setState, stateRef];
};

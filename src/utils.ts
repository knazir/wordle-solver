type UniqueIdMap = {
    [key in UniqueType]?: number;
};

export enum UniqueType {
    Default,
};

const uniqueIds: UniqueIdMap = {};
export const getUniqueId = (key = UniqueType.Default): Number => {
    if (uniqueIds[key] == null) uniqueIds[key] = 0;
    return (uniqueIds[key]!)++;
};

export enum LetterStatus {
    Empty,
    Incorrect,
    Elsewhere,
    Correct,
};

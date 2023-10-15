export const globalAllKeysAreNotNull = (obj, keyToExclude) => {
    for (const key in obj) {
        if (key !== keyToExclude && (obj[key] === null || obj[key] <= 0 || obj[key] === "")) {
            return false;
        }
    }
    return true;
};

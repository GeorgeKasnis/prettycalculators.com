export const globalAllKeysAreNotNull = (obj, keysToExclude) => {
    for (const key in obj) {
        if (
            (!keysToExclude || !keysToExclude.includes(key)) && // Check if the key should not be excluded
            (obj[key] === null || obj[key] <= 0 || obj[key] === "")
        ) {
            return false;
        }
    }
    return true;
};

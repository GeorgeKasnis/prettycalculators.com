export const clearEverything = (form) => {
    for (let key in form) {
        form[key] = null;
    }
};

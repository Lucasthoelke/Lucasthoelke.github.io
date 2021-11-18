
export const setAttributes = function (el, attrs) {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

export const getArrayDepth = function (value) {
    return Array.isArray(value) ?
        1 + Math.max(...value.map(getArrayDepth)) :
        0;
}

export function setStyles(target, styles) {
    if (!target || !styles)
        return;
    if (styles instanceof Object && !(styles instanceof Array)) {
        for (let prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                target.style.setProperty(prop, styles[prop]);
            }
        }
    }
}

"use strict";
module.exports.getDate = getDateNow;
function getDateNow() {
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date().toLocaleDateString('th-TH', dateOptions);
}
//# sourceMappingURL=date.js.map
function get(element) {
    return document.getElementById(element);
}

/*
 * Null Checks
 */
function isNull(myValue) {
    if (myValue === undefined || myValue === null || myValue === "undefined") {
        return true;
    }
    return false;
}

/**
 * CSS
 */
function addCSS(object, cssClass) {
    if (!hasCSS(object, cssClass)) {
        object.className = object.className + ' ' + cssClass;
    }
}

function removeCSS(object, cssClass) {
    if (hasCSS(object, cssClass)) {
        object.className = object.className.replace(cssClass, '');
    }
}

function hasCSS(object, cssClass) {
    if (isNull(object.className)) {
        return false;
    }
    if (object.className.indexOf(cssClass) != -1) {
        return true;
    }
    return false;
}


function hide(object) {
    addCSS(object, 'hidden');
}

function unhide(object) {
    removeCSS(object, 'hidden');
}

const closeMenu = (id) => {
    hide(get(id));
}

export default {
    get,
    hide,
    unhide,
    closeMenu
}
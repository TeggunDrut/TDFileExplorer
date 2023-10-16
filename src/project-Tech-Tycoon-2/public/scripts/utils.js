/*
 * Basic Element Functions
 */
function get(element) {
    return document.getElementById(element);
}

function deleteElement(id) {
    var element = get(id);
    if (element != null) {
        element.outerHTML = "";
        delete element;
    }
}

function getText(element) {
    return get(element).innerHTML;
}

function setText(element, text) {
    get(element).innerHTML = text;
}

function getValue(element) {
    return get(element).value;
}

function setValue(element, value) {
    get(element).value = value;
}

function quickCopy(myObject) {
    return Object.assign({}, myObject);
}



/*
 * Hide / Display Function
 */
function hide(object) {
    addCSS(object, 'hidden');
}

function unhide(object) {
    removeCSS(object, 'hidden');
}

function isHidden(object) {
    return hasCSS(object, 'hidden');
}

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

function toggleCSS(object, cssClass) {
    if (object.id == undefined) {
        object = get(object);
    }
    if (hasCSS(object, cssClass)) {
        removeCSS(object, cssClass);
    } else {
        addCSS(object, cssClass);
    }
}



/*
 * Null Checks
 */
function isNull(myValue) {
    if (myValue == undefined || myValue == null || myValue == "undefined") {
        return true;
    }
    return false;
}

function notNull(myValue) {
    return !isNull(myValue);
}



/*
 * List Functions
 */
function findSelected(elementList, elementName, element) {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i][elementName] == element) {
            return elementList[i];
        }
    }
    return -1;
}

function findSelectedIndex(elementList, elementName, element) {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i][elementName] == element) {
            return i;
        }
    }
    return -1;
}

function beginsWith(elementList, elementName, element) {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i][elementName].indexOf(element) == 0) {
            return elementList[i];
        }
    }
    return -1;
}

function listContainsElements(myList) {
    if (myList == undefined || myList == null) {
        return false;
    }
    if (myList.length == 0) {
        return false;
    }
    return true;
}


/*
 * Textbox Functions
 */
function setSelectBoxByText(id, selectedValue) {
    var element = get(id);
    for (var i = 0; i < element.options.length; i++) {
        if (element.options[i].text == selectedValue) {
            element.options[i].selected = true;
        } else {
            element.options[i].selected = false;
        }
    }
}



/*
 * Numeric Functions
 */
function isPositive(value) {
    if (value < 0) {
        value = value * -1;
    }
    return value;
}

function inRange(value, minValue, maxValue) {
    if (value >= minValue && value <= maxValue) {
        return true;
    }
    return false;
}

function outOfRange(value, minValue, maxValue) {
    return !inRange(value, minValue, maxValue);
}

function moneyFormat(data) {
    data = parseFloat(data);
    return data.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function decimalFormat(value) {
    if (value.indexOf('.') == -1) {
        value = value + '.00';
    } else {
        var amountSplit = value.split('.');
        if (amountSplit[1] == '') {
            amountSplit[1] = '00';
        } else if (amountSplit[1].length == 1) {
            amountSplit[1] = amountSplit[1] + '0';
        }
        value = amountSplit[0] + '.' + amountSplit[1];
    }
    return value;
}



/*
 * Character Functions
 */
function removeBegginingSpaces(element) {
    element = element + '';
    if (element.charAt(0) == ' ') {
        return removeBegginingSpaces(element.replace(' ', ''));
    }
    return element;
}

function removeEndingSpaces(element) {
    element = element + '';
    if (element.length == 0) {
        return element;
    }
    if (element.charAt(element.length - 1) == ' ') {
        return removeEndingSpaces(element.substring(0, element.length - 1));
    }
    return element;
}

function addFrontPadding(element, padder, finalSize) {
    element = element + "";
    if (element.length >= finalSize) {
        return element;
    }
    return addFrontPadding((padder + element), padder, finalSize);
}

function replaceAll(myString, removeString, replacementString) {
    return myString.split(removeString).join(replacementString);
}

function keepCaseReplace(myString, removeString, replacementString) {
    var expresssion = new RegExp(removeString, "gi");
    return myString.replace(expresssion, replacementString, 'gi');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function contains(word, element) {
    var index = word.indexOf(element);
    if (index == -1) {
        return false;
    }
    return true;
}

function formatVariableName(data) {
    var word = '';
    var words = data.split(' ');
    word = words[0].toLowerCase();
    for (var i = 1; i < words.length; i++) {
        word = word + words[i].substring(0, 1).toUpperCase() + words[i].substring(1).toLowerCase();
    }
    return word;
}



/*
 * Date Functions
 */
function getCurrentDate() {
    displayDate(new Date());
}

function displayDate(date) {
    //var dd = date.getUTCDate()+1;
    //var mm = date.getUTCMonth()+1;
    //var yyyy = date.getUTCFullYear();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    dd = addFrontPadding(dd, '0', 2);
    mm = addFrontPadding(mm, '0', 2);
    date = yyyy + mm + dd;
    return date;
}


/*
 * Browser Functions
 */
function openInNewTab(url) {
    window.open(url, "_blank");
}


/*
 * Event Handler
 */
var keyPressedMap = new Object();
keyPressedMap['enter'] = 13;
keyPressedMap['left'] = 37;
keyPressedMap['up'] = 38;
keyPressedMap['left'] = 37;
keyPressedMap['down'] = 49;

function getKeyPressed(keyPressed) {
    return keyPressedMap[keyPressed];
}

function addEvent(id, eventType, eventFunction) {
    get(id).addEventListener(eventType, eventFunction, false);
}



/*
 * HTML 5 Data Attributres
 */
function hasDataAttribute(object, attribute) {
    try {
        var temp = getDataAttribute(object, attribute);
        if (temp == false || isNull(temp)) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

function getDataAttribute(object, attribute) {
    attribute = "data-" + attribute;
    try {
        //return getManualDataAttribute(object, attribute);
        return object.getAttribute(attribute);
    } catch (error) {
        return getManualDataAttribute(object, attribute);
    }
}

function setDataAttribute(object, attribute, value) {
    attribute = "data-" + attribute;
    try {
        return object.setAttribute(attribute, value);
    } catch (error) {
        return setManualDataAttribute(object, attribute, value);
    }
}

/*
 * Useful Commands
 *
 * Remove one element from array
 * myArray.splice(arrayPosition, 1);
 *
 */
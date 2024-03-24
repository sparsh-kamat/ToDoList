// set attributes for an element
function setAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create a element with classname
function createElementWithClass(elementType, className) {
  var element = document.createElement(elementType);
  
  if(Array.isArray(className)) {
    className.forEach(function(name) {
      element.classList.add(name);
    });
  } else {
    element.classList.add(className);
  }

    return element;
}

export { setAttributes, createElementWithClass };
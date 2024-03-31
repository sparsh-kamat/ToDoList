//DOM Helper functions
function createElementWithClass(elementType, className) {
  var element = document.createElement(elementType);

  if (Array.isArray(className)) {
      className.forEach(function (name) {
          element.classList.add(name);
      });
  } else {
      element.classList.add(className);
  }

  return element;
}

function createElementWithText(elementType, className, text) {
  var element = createElementWithClass(elementType, className);
  element.textContent = text;
  return element;
}

function setAttributes(element, attributes) {
  for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
  }
}

export { setAttributes, createElementWithClass, createElementWithText };

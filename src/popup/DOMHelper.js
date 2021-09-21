export function constructNodeWithText(type, text, classesString) {
  const node = document.createElement(type);
  node.textContent = text;

  if (classesString) {
    node.className = classesString;
  }

  return node;
}

export function constructNodeWithText(type, text) {
  const node = document.createElement(type);
  node.textContent = text;

  return node;
}
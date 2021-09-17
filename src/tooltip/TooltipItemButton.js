export function createHoverButton(icon, title) {
  const hoverButton = document.createElement("input");
  hoverButton.setAttribute("type", "image");
  hoverButton.setAttribute("src", icon);
  hoverButton.setAttribute("width", "24");
  hoverButton.setAttribute("height", "24");
  hoverButton.setAttribute("title", title);

  return hoverButton;
}

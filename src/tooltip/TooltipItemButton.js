const iconPath = {
  highlight: "public/images/highlight.png",
  "user-note": "public/images/userNote.png",
};

export function createHoverButton(itemType, title) {
  const itemIcon = chrome.runtime.getURL(iconPath[itemType]);
  const hoverButton = document.createElement("input");
  hoverButton.setAttribute("type", "image");
  hoverButton.setAttribute("src", itemIcon);
  hoverButton.setAttribute("width", "24");
  hoverButton.setAttribute("height", "24");
  hoverButton.setAttribute("title", title);
  hoverButton.classList.add(`tooltip-buttons-${itemType}`);

  return hoverButton;
}

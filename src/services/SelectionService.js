export function getSelected() {
  let selection = "";

  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.getSelection) {
    selection = document.getSelection();
  }

  return selection;
}

export function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}

export function getSelectionVerticalCoordinate() {
  return getSelected().getRangeAt(0).getBoundingClientRect().y + window.scrollY;
}

export function getSelectionHorizontalCoordinate() {
  return getSelected().getRangeAt(0).getBoundingClientRect().x;
}

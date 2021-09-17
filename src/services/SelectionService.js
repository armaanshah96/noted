export function getSelected() {
  var selection = '';

  if (window.getSelection) {
    selection = window.getSelection();
  } else if (document.getSelection) {
    selection = document.getSelection();
  }

  return selection;
}

export function clearSelection() {
  if ( window.getSelection ) {
    window.getSelection().removeAllRanges();
  }
}
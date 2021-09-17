import { saveSelected } from "../services/StorageService";
import { DomParser
 } from "../DomParser";
import { clearSelection, getSelected, getSelectionHorizontalCoordinate, getSelectionVerticalCoordinate } from "../services/SelectionService";
import { removeTooltip } from "./Tooltip";

let domParser = new DomParser();

const icon = {
  'highlight': "public/images/highlight.png",
  'user-note': "public/images/note.png"
}

export const createTooltipItem = (itemType, buttonTitle) => {
  const item = document.createElement('li');
  const itemIcon = chrome.runtime.getURL(icon[itemType]);
  const itemBtn = createHoverButton(itemIcon, buttonTitle)

  itemBtn.addEventListener("click", function() {
    const selection = getSelected();
    const pathStack = domParser.generateDomPath(selection.focusNode.parentElement);
    const selectionString = selection.toString();

    if(selectionString != '') {
      itemType === 'user-note' 
        ? promptNote(saveSelected(location.href, document.title, selectionString, pathStack, note))
        : saveSelected(location.href, document.title, selectionString, pathStack);

      clearSelection()
      removeTooltip();
    }
  });

  item.append(itemBtn);
  item.id = `${itemType}-item`;

  return item;
};

function createHoverButton(icon, title) {
  var hoverButton = document.createElement("input");
  hoverButton.setAttribute("type", "image");
  hoverButton.setAttribute("src", icon);
  hoverButton.setAttribute("width", "24");
  hoverButton.setAttribute("height", "24");
  hoverButton.setAttribute("title", title);

  return hoverButton;
}

function promptNote(callback) {
  var inputDiv = document.createElement("div");
  var textBox = document.createElement("textarea");
  var saveButton = document.createElement("input");
  var cancelButton = document.createElement("input");
  var divider = document.createElement('br');
  
  textBox.id = "noteTextBox";
  textBox.cols = 30;
  textBox.rows = 4;
  textBox.autofocus = true;
  cancelButton.type = "button";
  cancelButton.id = "cancelNoteButton";
  cancelButton.value = "cancel";
  saveButton.type = "button";
  saveButton.id = "saveNoteButton";
  saveButton.value = "save";

  inputDiv.appendChild(textBox);
  inputDiv.appendChild(divider);
  inputDiv.appendChild(cancelButton);
  inputDiv.appendChild(saveButton);

  inputDiv.id = 'notePrompt';
  inputDiv.style.left = `${getSelectionHorizontalCoordinate() - 30}px`;
  inputDiv.style.top = `${getSelectionVerticalCoordinate() - 55}px`;
 
  document.body.appendChild(inputDiv);

  saveButton.addEventListener("click", function() {
    var noteResult = textBox.value;
    console.debug("inner text of input element is : " + noteResult);
    inputDiv.remove();
    
    callback(noteResult);
  });


  cancelButton.addEventListener("click", function() {
    console.debug("Note was cancelled");
    inputDiv.remove();
  });
}
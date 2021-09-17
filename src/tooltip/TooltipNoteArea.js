import { getSelectionHorizontalCoordinate, getSelectionVerticalCoordinate } from "../services/SelectionService";

export function createUserNoteArea(callback) {
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
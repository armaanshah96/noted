import { saveSelected } from "./services/StorageService";
import { DomParser
 } from "./DomParser";
import { clearSelection, getSelected } from "./services/SelectionService";

var pageX;
var pageY;
var isShown = false;

let domParser = new DomParser();

//mousedown event start
document.addEventListener("mousedown", function(event){
  //right click
  if(event.button == 0) {
    pageX = event.pageX - 30;
    pageY = event.pageY - 55;

    if(isShown) {
      $("#tooltip").fadeOut(300, function(){
        $(this).remove();
      });

      isShown = false;
    }
  }
}, true);
// mousedown event ends

//mouseup event start
document.addEventListener("mouseup", function(event){
  //right click
  if(event.button == 0) {
    var selection =  getSelected().toString();
    if(selection != '') {
      showPopup();
    }
  }
}, true);
//mouseup event ends


function createHoverButton(icon, title) {
  var hoverButton = document.createElement("input");
  hoverButton.setAttribute("type", "image");
  hoverButton.setAttribute("src", icon);
  hoverButton.setAttribute("width", "24");
  hoverButton.setAttribute("height", "24");
  hoverButton.setAttribute("title", title);

  return hoverButton;
}

//make and show popup
// RENDER TOOLTIP
function showPopup() {
  var div = document.createElement( 'div' );
  div.id = 'tooltip';
  div.style.left = pageX+'px';
  div.style.top = pageY+'px';

  var ul = document.createElement('ul');
  ul.id = "tooltipButtons"

  var highlightLI = document.createElement('li');
  var noteLI = document.createElement('li');

  highlightLI.id = "highlightTooltip"
  noteLI.id = "noteTooltip"

  var highlightIcon = chrome.runtime.getURL("public/images/highlight.png");
  var noteIcon = chrome.runtime.getURL("public/images/note.png");

  var highlightBtn = createHoverButton(highlightIcon, "highlight")
  var noteBtn  = createHoverButton(noteIcon, "add note")

  highlightBtn.addEventListener("click", function() {
    var selection = getSelected();
    var pathStack = domParser.generateDomPath(selection.focusNode.parentElement);
    var selectionString = selection.toString();

    if(selectionString != '') {
      document.execCommand('copy');
      saveSelected(location.href, document.title, selectionString, pathStack, function() { 
          setHighlights(pathStack, selectionString)
      });

      clearSelection()
    }
  });

  noteBtn.addEventListener("click", function() {
    var selection = getSelected();
    var pathStack = domParser.generateDomPath(selection.focusNode.parentElement);
    var selectionString = selection.toString();

    if(selectionString != '') {
      promptNote(function(note) {
        saveSelected(location.href, document.title, selectionString , pathStack, function() {
          setHighlights(pathStack, selectionString)
        }, note);
      });

      clearSelection();
    }
  });

  highlightLI.appendChild(highlightBtn);
  noteLI.appendChild(noteBtn);

  ul.appendChild(highlightLI);
  ul.appendChild(noteLI);

  div.appendChild(ul);

  document.body.appendChild( div );

  $("#tooltip").fadeIn(300);

  isShown = true;
}

function setHighlights(pathStack, selection) {
  var node = domParser.findNodeByPath(pathStack);
  var fullText = node.textContent;
  var startOfSelection = fullText.indexOf(selection);

  if(startOfSelection === -1) {
    return;
  }

  var m = document.createElement("mark");
  m.className += 'highlighted';

  var selectionLength = selection.length;
  var previousText = fullText.substring(0, startOfSelection);
  var markedText = document.createTextNode(fullText.substring(startOfSelection, startOfSelection + selectionLength));
  var afterText = document.createTextNode(fullText.substring(startOfSelection + selectionLength));

  m.appendChild(markedText);

  node.textContent = previousText;
  node.appendChild(m);
  node.appendChild(afterText);

  console.debug("highlighted node is: ");
  console.debug(node);
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
  inputDiv.style.left = pageX+'px';
  inputDiv.style.top = pageY+'px';
 
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
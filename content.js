var pageX;
var pageY;
var isShown = false;

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
    var selection =  getSelectedAsString();
    if(selection != '') {
      showPopup();
    }
  }
}, true);
//mouseup event ends

// this function gets selected text in clipboard
function getSelected() {
  var t = '';

  if (window.getSelection) {
    t = window.getSelection();
  } else if (document.getSelection) {
    t = document.getSelection();
  } else if (document.selection) {
    t = document.selection.createRange().text;
  }

  return t;
}

function getSelectedAsString() {
  return getSelected().toString();
}

function createHoverButton(icon) {
  var hoverButton = document.createElement("input");
  hoverButton.setAttribute("type", "image");
  hoverButton.setAttribute("src", icon);
  hoverButton.setAttribute("width", "24");
  hoverButton.setAttribute("height", "24");

  return hoverButton;
}

//make and show popup
function showPopup() {
  var div = document.createElement( 'div' );
  div.id = 'tooltip';
  div.style.left = pageX+'px';
  div.style.top = pageY+'px';

  var ul = document.createElement('ul');
  ul.id = "tooltipButtons"

  var selectionLI = document.createElement('li');
  var noteLI = document.createElement('li');

  selectionLI.id = "selectionTooltip"
  noteLI.id = "noteTooltip"

  var selectionIcon = chrome.runtime.getURL("images/highlight.png");
  var noteIcon = chrome.runtime.getURL("images/note.png");

  var selectionBtn = createHoverButton(selectionIcon)
  var noteBtn  = createHoverButton(noteIcon)

  selectionBtn.addEventListener("click", function() {
    var selection = getSelected();
    var pathStack = DomParser.generateDomPath(selection.focusNode.parentElement);
    var selectionString = selection.toString();

    if(selection != '') {
      document.execCommand('copy');
      StorageManager.saveSelected(location.href, document.title, selectionString, pathStack, function() { 
          setHighlights(pathStack, selectionString)
      });

      clearSelection()
    }
  });

  noteBtn.addEventListener("click", function() {
    var selection = getSelected();
    var pathStack = DomParser.generateDomPath(selection.focusNode.parentElement);
    var selectionString = selection.toString();

    if(selection != '') {
      promptNote(function(note) {
        StorageManager.saveSelectedWithNote(location.href, document.title, selectionString , note, pathStack, function() {
          setHighlights(pathStack, selectionString)
        });
      });

      clearSelection();
    }
  });

  selectionLI.appendChild(selectionBtn);
  noteLI.appendChild(noteBtn);

  ul.appendChild(selectionLI);
  ul.appendChild(noteLI);

  div.appendChild(ul);

  document.body.appendChild( div );

  $("#tooltip").fadeIn(300);

  isShown = true;
}

function setHighlights(pathStack, selection) {
  var node = DomParser.findNodeByPath(pathStack);
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
  var inputTextBox = document.createElement("input");
  var inputButton = document.createElement("input");
  var divider = document.createElement('br');
  
  inputTextBox.type = "text";
  inputTextBox.id = "noteInputBox";
  inputButton.type = "button";
  inputButton.id = "saveNoteButton";
  inputButton.value = "save";

  inputDiv.appendChild(inputTextBox);
  inputDiv.appendChild(divider);
  inputDiv.appendChild(inputButton);

  inputDiv.id = 'notePrompt';
  inputDiv.style.left = pageX+'px';
  inputDiv.style.top = pageY+'px';
 
  document.body.appendChild(inputDiv);

  inputButton.addEventListener("click", function() {
    var noteResult = inputTextBox.value;
    console.debug("inner text of input element is : " + noteResult);
    inputDiv.remove();
    
    callback(noteResult);
  });
}

function popupCenter(url, title, w, h) {
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
}

function clearSelection() {
  if ( document.selection ) {
    document.selection.empty();
  } else if ( window.getSelection ) {
    window.getSelection().removeAllRanges();
  }
}
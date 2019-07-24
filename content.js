var pageX;
var pageY;
var isShown = false;

icons = {
  "search": chrome.runtime.getURL("images/search.png")
}

//mousedown event start
document.addEventListener("mousedown", function(event){
  //right click
  if(event.button == 0) {
    pageX = event.pageX - 30;
    pageY = event.pageY - 55;

    if(isShown) {
      $("#myDiv").fadeOut(300, function(){
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
    var selection =  getSelected();
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

  return encodeURIComponent(t.toString());
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
  div.id = 'myDiv';
  div.style.backgroundColor = '#333333';
  div.style.position = "absolute";
  div.style.boxSizing = 'content-box';
  div.style.left = pageX+'px';
  div.style.top = pageY+'px';
  div.style.padding = "6px 6px 0px 6px";
  div.style.display = "none";
  div.style.borderRadius = "6px";
  div.style.zIndex = '100000001';


  var ul = document.createElement('ul');

  ul.style.listStyleType =  "none";
  ul.style.listStyle = "none";
  ul.style.padding  = "0px";
  ul.style.margin = "0px";


  var li_search = document.createElement('li');
  var li_copy = document.createElement('li');

  var li_twitter = document.createElement('li');


  li_search.style.padding  = "0px 5px 0px 0px";
  li_search.style.margin = "0px";

  li_copy.style.padding  = "0px 5px 0px 0px";
  li_copy.style.margin = "0px";

  li_twitter.style.padding  = "0px";
  li_twitter.style.margin = "0px";


  li_search.style.display = "inline";
  li_copy.style.display = "inline";
  li_twitter.style.display = "inline";


  var searchIcon = chrome.runtime.getURL("images/search.png");
  var copyIcon = chrome.runtime.getURL("images/copy.png");
  var twitterIcon = chrome.runtime.getURL("images/twitter.png");

  var searchBtn = createHoverButton(searchIcon)
  var copyBtn = createHoverButton(copyIcon)
  var twitterBtn  = createHoverButton(twitterIcon)

  searchBtn.addEventListener("click", function() {
    var selection =  getSelected();

    if(selection != '') {
      chrome.runtime.sendMessage({"message": "open_new_tab", "q": selection});
      clearSelection()
    }
  });

  copyBtn.addEventListener("click", function() {
    var selection =  getSelected();
    if(selection != '') {
      document.execCommand('copy');
      clearSelection()
    }

    StorageManager.saveHighlightedText(selection);
  });


  twitterBtn.addEventListener("click", function() {
    var selection =  getSelected();
    if(selection != '') {
      popupCenter("https://twitter.com/intent/tweet?text=" + decodeURI(selection), "Share on twitter" ,550, 420)
      clearSelection()
    }
  });

  // {
  //   "some.url.com": {
  //     text: [{
  //       collaborate: somecomment
  //     }, {
  //       and: some_other_comment
  //     }]
  //   }
  //   some.other.url.com: {
  //     text:
  //   }
  // }



  li_search.appendChild(searchBtn);
  li_copy.appendChild(copyBtn);
  li_twitter.appendChild(twitterBtn);

  ul.appendChild(li_search);
  ul.appendChild(li_copy);
  ul.appendChild(li_twitter);

  div.appendChild(ul);

  document.body.appendChild( div );

  $("#myDiv").fadeIn(300);

  isShown = true;
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

var StorageManager = function(){
  function retrieveTextByKey(key) {
    chrome.storage.sync.get(['highlightedKey'], function(items) {
      alert('Settings retrieved ' + items.highlightedKey);

      console.debug(items)
    });
  }

  function saveHighlightedText(highlightedValue) {
    chrome.storage.sync.set({'highlightedKey': highlightedValue}, function() {
      console.debug('Text saved ' + highlightedValue);

      retrieveTextByKey('highlightedKey')
    });
  }

  return {
    retrieveTextByKey: retrieveTextByKey,
    saveHighlightedText: saveHighlightedText
  }
}();

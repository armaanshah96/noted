
var pageX;
var pageY;
var isShown = false;

//mousedown event start
document.addEventListener("mousedown", function(event){

//right click
if(event.button == 0) {

  pageX = event.pageX - 30;
  pageY = event.pageY - 55;

  if(isShown)
  {

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
    if(selection != '')
    {
      showPopup();
    }

   }
}, true);
//mouseup event ends


// write to local function

function localSave(theValue){
  chrome.storage.sync.set({'highlightedKey': theValue}, function() {
    // Notify that we saved.
    // message('Text saved' + theValue);
    console.log('Text saved ' + theValue);
    chrome.storage.sync.get(['highlightedKey'], function(items) {
      alert('Settings retrieved ' + items.highlightedKey);

      console.log(items)
    });
  });
}


// this function get selected text
function getSelected() {

  var t = '';

  if (window.getSelection) {
  t = window.getSelection();
  }
  else if (document.getSelection) {
  t = document.getSelection();
  }
  else if (document.selection) {
  t = document.selection.createRange().text;
  }


  return encodeURIComponent(t.toString());
}



//make and show popup
function showPopup()
{

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




var searchIcon = chrome.extension.getURL("images/search.png");
var copyIcon = chrome.extension.getURL("images/copy.png");
var twitterIcon = chrome.extension.getURL("images/twitter.png");

var searchBtn = document.createElement("input");
searchBtn.setAttribute("type", "image");
searchBtn.setAttribute("src", searchIcon);
searchBtn.setAttribute("width", "24");
searchBtn.setAttribute("height", "24");

var copyBtn = document.createElement("input");
copyBtn.setAttribute("type", "image");
copyBtn.setAttribute("src", copyIcon);
copyBtn.setAttribute("width", "24");
copyBtn.setAttribute("height", "24");

var twitterBtn = document.createElement("input");
twitterBtn.setAttribute("type", "image");
twitterBtn.setAttribute("src", twitterIcon);
twitterBtn.setAttribute("width", "24");
twitterBtn.setAttribute("height", "24");

searchBtn.addEventListener("click", function() {
  var selection =  getSelected();
    if(selection != '')
    {
      chrome.runtime.sendMessage({"message": "open_new_tab", "q": selection});
      clearSelection()
    }



});

copyBtn.addEventListener("click", function() {
  var selection =  getSelected();
    if(selection != '')
    {
      document.execCommand('copy');
      clearSelection()
    }

    localSave(selection);

});


twitterBtn.addEventListener("click", function() {
  var selection =  getSelected();
    if(selection != '')
    {

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

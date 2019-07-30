StorageManager.retrieveAllText(function(items) {
	for(var urlKey of Object.keys(items)) {
    var webpage = items[urlKey];
    var titleText = hasTitle(webpage[0]) ? webpage.shift().title : undefined;

    var listNode = document.createElement("UL");
    listNode.className += "project-item";

    var titleContainer = constructHeaderNode(urlKey, titleText);

    listNode.appendChild(titleContainer);

    for(var saved of webpage) {
      (function() {
        var listItem = constructNodeWithText("LI", saved);
        listItem.className += "project-item-title";

        var trashIcon = constructTrashIconNode();
        listItem.appendChild(trashIcon);
        listItem.addEventListener("mouseover", function() { trashIcon.className = 'trash-icon-visible'; });
        listItem.addEventListener("mouseout", function() { trashIcon.className = 'trash-icon-hidden'; });

        listNode.appendChild(listItem);
      }());
    }

    document.getElementById("titleContainer").appendChild(listNode);
	}
});

function constructTrashIconNode() {
  var trashButton = document.createElement("input");
  trashButton.type = "image";
  trashButton.src = './icons/trash32.png';
  trashButton.className = 'trash-icon-hidden';

  trashButton.addEventListener("click", function() { console.log("delete this!"); });

  return trashButton;
}

function hasTitle(obj) {
  return obj.hasOwnProperty('title');
}

function constructHeaderNode(url, titleText) {
  var container = document.createElement('div');
  var hostnameNode = constructNodeWithText("p", extractUrlHostname(url));
  hostnameNode.className += "no-margin";

  if( titleText !== undefined) {
    var titleNode = constructNodeWithText("h5", titleText);
    titleNode.className += "no-margin";

    container.appendChild(titleNode);
  }
  
  container.appendChild(hostnameNode);
  container.className += "project-item-header";

  container.addEventListener("click", function() { window.open(url) });

  return container;
}

function constructNodeWithText(type, text) {
  var fullText = text;

  if(typeof text === 'object') {
    fullText = '(Selection =) ' + text.selection + ': (Note =) ' + text.note;
  }

  var node = document.createElement(type);
  var textNode = document.createTextNode(fullText);
  node.appendChild(textNode);

  return node;
}

function extractUrlHostname(url) {
  var hostname;

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?,.com,.co"
  hostname = hostname.split('?')[0];
  hostname = hostname.split('.com')[0];
  hostname = hostname.split('.co')[0];

  // for local files, take the name of the file
  if(url.indexOf("file:") > -1 && hostname.length === 0) {
    var nameOfLocalFile = url.split('/').pop();
    var extensionIndex = nameOfLocalFile.lastIndexOf('.');

    hostname = nameOfLocalFile.slice(0, extensionIndex);
  }

  return decodeURI(hostname);
}
StorageManager.retrieveAllText(function(items) {
	for(var key of Object.keys(items)) {
    var listNode = document.createElement("UL")
    listNode.className += "project-item";

    var titleContainer = constructHeaderNode(key);

    listNode.appendChild(titleContainer);

    var webpage = items[key]
    for(var saved of webpage) {
      var listItem = constructNodeWithText("LI", saved);
      listItem.className += "project-item-title";

      listNode.appendChild(listItem);
    }

    document.getElementById("titleContainer").appendChild(listNode);
	}
});

function constructHeaderNode(url) {
  var titleNode = constructNodeWithText("h5", "Some Title");
  titleNode.className += "no-margin";
  var hostnameNode = constructNodeWithText("p", extractUrlHostname(url));
  hostnameNode.className += "no-margin";
  var container = document.createElement('div');

  container.appendChild(titleNode);
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
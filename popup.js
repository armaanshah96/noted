StorageManager.retrieveAllText(function(items) {
	for(var key of Object.keys(items)) {
    var listNode = document.createElement("UL");
    listNode.className = "listFormat"

    var urlHeader = constructNodeWithText("H3", key);

    listNode.appendChild(urlHeader);

		var item = items[key]
		for(var text of item) {
      var listItem = constructNodeWithText("LI", text);

			listNode.appendChild(listItem);
		}

    document.getElementById("titleContainer").appendChild(listNode);
	}
});

function constructNodeWithText(type, key) {
  var node = document.createElement(type);
  var textNode = document.createTextNode(key);
  node.appendChild(textNode);

  return node;
}
StorageManager.retrieveAllText(function(items) {
	for(var key of Object.keys(items)) {
    var listNode = document.createElement("UL");
    listNode.class = "listFormat"

    var urlHeader = document.createElement("H3");
    var urlText = document.createTextNode(key);
    urlHeader.appendChild(urlText);

    listNode.appendChild(urlHeader);

		var item = items[key]
		for(var text of item) {
      var node = document.createElement("LI");
			var textNode = document.createTextNode(text);
			node.appendChild(textNode);

			listNode.appendChild(node)
		}

    document.getElementById("titleContainer").appendChild(listNode);
	}
});
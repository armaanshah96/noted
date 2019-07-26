StorageManager.retrieveAllText(function(items) {
	for(var key of Object.keys(items)) {
		var item = items[key]

		var node = document.createElement("LI");
		var textNode = document.createTextNode(item[0]);
		node.appendChild(textNode);

		document.getElementById("savedList").appendChild(node)
	}
});
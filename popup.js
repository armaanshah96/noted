StorageManager.retrieveAllText(function(items) {
	for(var key of Object.keys(items)) {
		var item = items[key]

		for(var text of item) {
			var node = document.createElement("LI");
			var textNode = document.createTextNode(text);
			node.appendChild(textNode);

			document.getElementById("savedList").appendChild(node)
		}
	}
});
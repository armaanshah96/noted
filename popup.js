StorageManager.retrieveTextByKey('highlightedKey', function(saved) {
	var node = document.createElement("LI");
	var textNode = document.createTextNode(saved);
	node.appendChild(textNode);
	
	document.getElementById("savedList").appendChild(node)
});

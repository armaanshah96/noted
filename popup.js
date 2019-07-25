StorageManager.retrieveTextByKey('highlightedKey', function(saved) {
	console.log('in POPUP ' + saved)
	document.getElementById("status").innerHTML = saved + ''
});

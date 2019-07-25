var StorageManager = function(){
  function retrieveTextByKey(key, callback) {
    chrome.storage.sync.get(['highlightedKey'], function(items) {
      alert('Settings retrieved ' + items.highlightedKey);
      console.debug(items)

      callback(items.highlightedKey)
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
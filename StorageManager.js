var StorageManager = function(){
  function retrieveTextByKey(key, callback) {
    chrome.storage.sync.get(['highlightedKey'], function(items) {
      alert('Settings retrieved ' + items.highlightedKey);
      console.debug(items)
      
      typeof callback === 'function' && callback(items.highlightedKey)
    });
  }

  function retrieveAllText(callback) {
    chrome.storage.sync.get(null, function(items) {
      callback(items);
    });
  }

// 1) save text by url into array
// 2) append text to array on url key if exists, else 1)
  function saveHighlightedText(url, text) {
    var uid = url
    var saveObj = {[url]: [text]}

    chrome.storage.sync.set(saveObj, function() {
      console.debug('uid of text saved ' + uid);
      console.debug(saveObj[url]);
    });
  }

  return {
    retrieveTextByKey: retrieveTextByKey,
    retrieveAllText: retrieveAllText,
    saveHighlightedText: saveHighlightedText
  }
}();
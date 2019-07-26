var StorageManager = function(){
  function retrieveTextByKey(key, callback) {
    chrome.storage.sync.get(key, function(items) {
      typeof callback === 'function' && callback(items[key])
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
    var saveObj = {[url]: null}; 

    retrieveTextByKey(url, function(existingSavedText) {
      console.debug(existingSavedText)
      console.debug('uid of text saved ' + url);

      if(typeof existingSavedText === 'object' && existingSavedText.length > 0) {
        saveObj[url] = existingSavedText.concat(text);
      } else {
        saveObj[url] = [text]
      }

      chrome.storage.sync.set(saveObj, function() {
        console.debug(saveObj[url]);
      });
    })
  }

  return {
    retrieveTextByKey: retrieveTextByKey,
    retrieveAllText: retrieveAllText,
    saveHighlightedText: saveHighlightedText
  }
}();
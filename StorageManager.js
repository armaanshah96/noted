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

  function saveSelected(url, text) {
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : []
      var saveObj = {[url]: existingSavedText.concat(text)}; 

      chrome.storage.sync.set(saveObj, function() {
        console.debug(saveObj[url]);
      });
    })
  }

  function saveSelectedWithNote(url, selection, note) {
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : []

      var textAndNote = { selection: selection, note: note };
      var saveObj = { [url] : existingSavedText.concat(textAndNote) };

      chrome.storage.sync.set(saveObj, function() {
        alert("Saved your note!");
        console.debug('new text and note on this url: ' + saveObj[url]);
      });
    })
  }

  return {
    retrieveTextByKey: retrieveTextByKey,
    retrieveAllText: retrieveAllText,
    saveSelected: saveSelected,
    saveSelectedWithNote: saveSelectedWithNote
  }
}();
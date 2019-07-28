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
    var saveObj = {[url]: null}; 

    retrieveTextByKey(url, function(existingSavedText) {
      console.debug(existingSavedText)
      console.debug('uid of text saved ' + url);

      // fixme: necessary to check 'object' type
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

  function saveSelectedWithNote(url, selection, note) {
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = existingSavedText.length > 0 ? existingSavedText : []
      var saveObj = { [url] : existingSavedText };

      var textAndNote = { selection: selection, note: note };

      saveObj[url] = existingSavedText.concat(textAndNote);

      chrome.storage.sync.set(saveObj, function() {
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
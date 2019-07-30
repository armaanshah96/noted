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

  function saveSelected(url, title, text) {
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : [{title: title}]

      var textObj = { selection: text };
      var saveObj = {[url]: existingSavedText.concat(text)}; 

      chrome.storage.sync.set(saveObj, function() {
        console.debug(saveObj[url]);
      });
    })
  }

  function saveSelectedWithNote(url, title, selection, note) {
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : [{title: title}]

      var textAndNote = { selection: selection, note: note };
      var saveObj = { [url] : existingSavedText.concat(textAndNote) };

      chrome.storage.sync.set(saveObj, function() {
        alert("Saved your note!");
        console.debug('new text and note on this url: ' + saveObj[url]);
      });
    })
  }

  function deleteTextInKey(url, textIndex, callback) {
    console.log(url)
    console.log(textIndex)
    retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText.splice(textIndex,1);
      console.log(existingSavedText);
      if(existingSavedText < 1) {
        console.error("Storage under this URL is in an unexpected state");
      } else if(existingSavedText.length === 1) {
        // Only {title: ""} object remains, remove from storage because not tracking any data
        chrome.storage.sync.remove(url, function() {
          console.log("No more remaining notes or highlights under this url");
          callback();
        });
      } else {
        // Maintain existing data by overwrite storage contents in key
        chrome.storage.sync.set({[url] : existingSavedText}, function() {
          console.log("Removed highlight and/or note from saved content for this url");
          callback();
        });
      }
    });
  }

  return {
    retrieveTextByKey: retrieveTextByKey,
    retrieveAllText: retrieveAllText,
    saveSelected: saveSelected,
    saveSelectedWithNote: saveSelectedWithNote,
    deleteTextInKey: deleteTextInKey
  }
}();
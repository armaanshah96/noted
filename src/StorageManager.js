export class StorageManager {
  retrieveTextByKey(key, callback) {
    chrome.storage.sync.get(key, function(items) {
      typeof callback === 'function' && callback(items[key])
    });
  }

  retrieveAllText(callback) {
    chrome.storage.sync.get(null, function(items) {
      callback(items);
    });
  }

  saveSelected(url, title, text, pathStack, callback) {
    this.retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : [{title: title}]

      var textObj = { selection: text, path: pathStack };
      var saveObj = {[url]: existingSavedText.concat(textObj)}; 

      chrome.storage.sync.set(saveObj, function() {
        console.debug(saveObj[url]);
        callback();
      });
    })
  }

  saveSelectedWithNote(url, title, selection, note, pathStack, callback) {
    this.retrieveTextByKey(url, function(existingSavedText) {
      existingSavedText = (existingSavedText && existingSavedText.length > 0) ? existingSavedText : [{title: title}]

      var textAndNote = { selection: selection, note: note, path: pathStack };
      var saveObj = { [url] : existingSavedText.concat(textAndNote) };

      chrome.storage.sync.set(saveObj, function() {
        alert("Saved your note!");
        console.debug('new text and note on this url: ' + saveObj[url]);
        callback();
      });
    })
  }

  deleteTextInKey(url, textIndex, callback) {
    this.retrieveTextByKey(url, function(existingSavedText) {
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
}
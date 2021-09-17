export class StorageManager {
  retrieveNotes(key = null) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (items) => {
        const extractedNote = key ? items[key] : items;
        resolve(extractedNote);
      });
    });
  }

  saveNote(note) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(note, () => {
        resolve();
      });
    });
  }

  saveSelected(url, title, text, pathStack, callback, note) {
    this.retrieveNotes(url)
      .then((savedText) => {
        savedText =
          savedText && savedText.length > 0 ? savedText : [{ title: title }];

        const textObj = note
          ? { selection: text, note, path: pathStack }
          : { selection: text, path: pathStack };
        const noteToSave = { [url]: savedText.concat(textObj) };

        return this.saveNote(noteToSave);
      })
      .then(() => {
        note && alert("Saved your note");
        callback();
      });
  }

  deleteTextInKey(url, textIndex, callback) {
    this.retrieveNotes(url).then(function (existingSavedText) {
      existingSavedText.splice(textIndex, 1);
      console.log(existingSavedText);
      if (existingSavedText < 1) {
        console.error("Storage under this URL is in an unexpected state");
      } else if (existingSavedText.length === 1) {
        // Only {title: ""} object remains, remove from storage because not tracking any data
        chrome.storage.sync.remove(url, function () {
          console.log("No more remaining notes or highlights under this url");
          callback();
        });
      } else {
        // Maintain existing data by overwrite storage contents in key
        chrome.storage.sync.set({ [url]: existingSavedText }, function () {
          console.log(
            "Removed highlight and/or note from saved content for this url"
          );
          callback();
        });
      }
    });
  }
}

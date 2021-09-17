export class StorageManager {
  retrieveNotes(key = null) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (items) => {
        const extractedNote = key ? items[key] : items;
        resolve(extractedNote);
      });
    });
  }

  updateNote(note) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(note, () => {
        resolve();
      });
    });
  }

  removeNoteCategory(key) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove(key, function () {
        resolve();
      });
    });
  }

  saveSelected(url, title, text, pathStack, callback, note) {
    this.retrieveNotes(url)
      .then(savedText => {
        savedText =
          savedText && savedText.length > 0 ? savedText : [{ title: title }];

        const textObj = note
          ? { selection: text, note, path: pathStack }
          : { selection: text, path: pathStack };
        const noteToSave = { [url]: savedText.concat(textObj) };

        return this.updateNote(noteToSave);
      })
      .then(() => {
        note && alert("Saved your note");
        callback();
      });
  }

  deleteNote(url, textIndex, callback) {
    this.retrieveNotes(url)
      .then(existingSavedText => {
        existingSavedText.splice(textIndex, 1);
        console.log(existingSavedText);
        if (existingSavedText < 1) {
          console.error("Storage under this URL is in an unexpected state");
        } else if (existingSavedText.length === 1) {
          return this.removeNoteCategory(url);
        } else {
          // Maintain existing data by overwrite storage contents in key
          return this.updateNote({ [url]: existingSavedText });
        }
      })
      .then(() => callback());
  }
}

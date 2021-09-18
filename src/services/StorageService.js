const updateNote = (note) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(note, () => {
      resolve();
    });
  });
};

const removeNoteCategory = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, function () {
      resolve(true);
    });
  });
};

export const retrieveNotes = (key = null) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (items) => {
      const extractedNote = key ? items[key] : items;
      resolve(extractedNote);
    });
  });
};

export const saveSelected = (url, title, text, note) => {
  retrieveNotes(url)
    .then((savedText) => {
      savedText =
        savedText && savedText.length > 0 ? savedText : [{ title: title }];

      const textObj = note ? { selection: text, note } : { selection: text };
      const noteToSave = { [url]: savedText.concat(textObj) };

      return updateNote(noteToSave);
    })
    .then(() => {
      note && alert("Saved your note");
    });
};

export const deleteNote = (url, selectionToDelete, callback) => {
  retrieveNotes(url)
    .then((existingSavedText) => {
      const deleteIndex = existingSavedText.findIndex(
        (notes) => notes.selection === selectionToDelete
      );
      existingSavedText.splice(deleteIndex, 1);

      if (existingSavedText < 1) {
        console.error("Storage under this URL is in an unexpected state");
      } else if (existingSavedText.length === 1) {
        return removeNoteCategory(url);
      } else {
        // Maintain existing data by overwrite storage contents in key
        return updateNote({ [url]: existingSavedText });
      }
    })
    .then((shouldRemoveNoteCategory) => callback(shouldRemoveNoteCategory))
};

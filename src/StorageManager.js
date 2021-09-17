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
      resolve();
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

export const saveSelected = (url, title, text, pathStack, callback, note) => {
  retrieveNotes(url)
    .then((savedText) => {
      savedText =
        savedText && savedText.length > 0 ? savedText : [{ title: title }];

      const textObj = note
        ? { selection: text, note, path: pathStack }
        : { selection: text, path: pathStack };
      const noteToSave = { [url]: savedText.concat(textObj) };

      return updateNote(noteToSave);
    })
    .then(() => {
      note && alert("Saved your note");
      callback();
    });
};

export const deleteNote = (url, textIndex, callback) => {
  retrieveNotes(url)
    .then((existingSavedText) => {
      existingSavedText.splice(textIndex, 1);
      if (existingSavedText < 1) {
        console.error("Storage under this URL is in an unexpected state");
      } else if (existingSavedText.length === 1) {
        return removeNoteCategory(url);
      } else {
        // Maintain existing data by overwrite storage contents in key
        return updateNote({ [url]: existingSavedText });
      }
    })
    .then(() => callback());
};

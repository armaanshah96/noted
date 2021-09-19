const updateNote = (note) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(note, () => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve();
    });
  });
};

const removeNoteCategory = (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, function () {
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(true);
    });
  });
};

export const retrieveNotes = (key = null) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (items) => {
      const extractedNote = key ? items[key] : items;
      chrome.runtime.lastError
        ? reject(chrome.runtime.lastError)
        : resolve(extractedNote);
    });
  });
};

export const saveSelected = (url, title, text, note) => {
  retrieveNotes(url)
    .then((savedData) => {
      if (!savedData) {
        savedData = { title, savedContent: [] };
      }

      const newDataToSave = note
        ? { selection: text, note }
        : { selection: text };
      savedData.savedContent.push(newDataToSave);

      const noteToSave = { [url]: savedData };

      return updateNote(noteToSave);
    })
    .then(() => {
      note && alert("Saved your note");
    })
    .catch((error) => {
      const noteErrorMessage = note && " and note";
      alert(
        `Your highlight ${noteErrorMessage} were not saved with the following error: ${error}`
      );
    });
};

export const deleteNote = (url, selectionToDelete, callback) => {
  retrieveNotes(url)
    .then(({ title, savedContent }) => {
      const deleteIndex = savedContent.findIndex(
        (notes) => notes.selection === selectionToDelete
      );
      savedContent.splice(deleteIndex, 1);

      if (savedContent.length === 0) {
        return removeNoteCategory(url);
      } else {
        return updateNote({ [url]: { title, savedContent } });
      }
    })
    .then((shouldRemoveNoteCategory) => callback(shouldRemoveNoteCategory))
    .catch((error) => {
      alert(`Your deletion failed with the following error: ${error}`);
    });
};

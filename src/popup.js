import { retrieveNotes } from "./StorageManager";
import { noteCategoryElement  } from "./NoteCategory";

const render = () => {
  const containerEl = document.getElementById("notes-container");

  retrieveNotes().then(function(items) {
    for (const urlKey in items) {
      const listNode = noteCategoryElement(items, urlKey)

      containerEl.append(listNode);
    }
  });
};

render();

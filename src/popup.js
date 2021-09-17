import { retrieveNotes } from "./services/StorageService";
import { noteCategoryElement  } from "./popup/NoteCategory";

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

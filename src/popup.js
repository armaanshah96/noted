import { noteCategoryElement } from "./popup/NoteCategory";
import { retrieveNotes } from "./services/StorageService";

const render = () => {
  const containerEl = document.getElementById("popup-container");

  retrieveNotes().then(function (items) {
    for (const urlKey in items) {
      const listNode = noteCategoryElement(items, urlKey);

      containerEl.append(listNode);
    }
  });
};

render();

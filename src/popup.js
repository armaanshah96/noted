import { noteCategoryElement } from "./popup/NoteCategory";
import { renderSettings } from "./popup/settings/Settings";
import { retrieveNotes } from "./services/StorageService";

const render = () => {
  const containerEl = document.getElementById("popup-container");

  const settingsButton = document.createElement('button');
  settingsButton.textContent = 'Settings';
  settingsButton.addEventListener('click', () => renderSettings());
  containerEl.append(settingsButton);

  retrieveNotes().then(function (items) {
    for (const urlKey in items) {
      const listNode = noteCategoryElement(items, urlKey);

      containerEl.append(listNode);
    }
  });
};

render();

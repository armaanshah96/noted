import { retrieveNotes, WEBSITE_POLICIES_STORAGE_KEY } from "../services/StorageService";
import { noteCategoryElement } from "./NoteCategory";
import { createSitePolicyButton } from "./settings/SitePolicyButton";
import { createExportButton } from "./settings/ExportButton";

export const renderPopupMainContent = () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('popup-content-noted');

  retrieveNotes().then(function (items) {
    for (const urlKey in items) {
      if(urlKey ===  WEBSITE_POLICIES_STORAGE_KEY) continue;
      const listNode = noteCategoryElement(items, urlKey);

      contentContainer.append(listNode);
    }
  });

  cleanupContent('.popup-content-settings');

  return contentContainer;
};

export const createSettingsContent = async () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('popup-content-settings');
  contentContainer.append(await createSitePolicyButton());
  contentContainer.append(createExportButton());

  cleanupContent('.popup-content-noted');

  return contentContainer;
};

const cleanupContent = (contentClass) => {
  const contentToRemove = document.querySelector(contentClass);
  if(contentToRemove) {
    contentToRemove.remove();
  }
}
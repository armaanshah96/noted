import { createNoteCategoryHeader } from "./NoteCategoryHeader";
import { createNoteItem } from "./NoteItem";

export const noteCategoryElement = (items, urlKey) => {
  const webpage = items[urlKey];
  const titleText = webpage.title;
  const headerElement = createNoteCategoryHeader(urlKey, titleText);

  const listNode = document.createElement("ul");
  listNode.classList.add("note-category");
  listNode.append(headerElement);

  for (const noteObj of webpage.savedContent) {
    const noteItem = createNoteItem(noteObj, urlKey);

    listNode.append(noteItem);
  }

  return listNode;
};

import { createNoteCategoryHeader } from "../NoteCategoryHeader";
import { createNoteItem } from "./NoteItem";

export const noteCategoryElement = (items, urlKey) => {
  const webpage = items[urlKey];
  const titleText = webpage[0].hasOwnProperty("title") && webpage.shift().title;
  const headerElement = createNoteCategoryHeader(urlKey, titleText);

  const listNode = document.createElement("ul");
  listNode.classList.add("project-item");
  listNode.append(headerElement);

  for (const noteObj of webpage) {
    const noteItem = createNoteItem(noteObj, urlKey);

    listNode.append(noteItem);
  }

  return listNode;
};

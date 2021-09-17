import { deleteNote } from "./StorageManager";
import { constructNodeWithText } from "../UIUtil";

export function createNoteItem(noteData, urlKey) {
  const listItem = document.createElement("li");
  const quoteIcon = constructQuoteIconNode();
  const selectionItem = constructNodeWithText("p", noteData.selection, "project-item-selection");
  const trashIcon = constructTrashIconNode();
  addListenersToTrashNode(trashIcon, listItem, urlKey, noteData.selection);

  if (noteData.note) {
    const noteItem = constructNodeWithText("p", noteData.note, "project-item-note offset-1");

    selectionItem.append(noteItem);
  }

  listItem.classList.add("project-item-title");

  listItem.append(quoteIcon);
  listItem.append(selectionItem);
  listItem.append(trashIcon);

  return listItem;
}

function addListenersToTrashNode(trashIcon, listItem, url, selection) {
  listItem.addEventListener("mouseover", function () {
    trashIcon.classList.toggle("trash-icon--hidden");
  });

  listItem.addEventListener("mouseout", function () {
    trashIcon.classList.toggle("trash-icon--hidden");
  });

  trashIcon.addEventListener("click", function () {
    deleteNote(url, selection, function () {
      location.reload();
    });
  });
}

function constructQuoteIconNode() {
  const quoteImg = document.createElement("img");
  quoteImg.src = "public/icons/quote16.png";
  quoteImg.classList.add( "quote-icon");

  return quoteImg;
}

function constructTrashIconNode() {
  const trashButton = document.createElement("input");

  trashButton.type = "image";
  trashButton.src = "public/icons/trash32.png";
  trashButton.className = "trash-icon trash-icon--hidden";

  return trashButton;
}
import { deleteNote } from "./StorageManager";
import { constructNodeWithText } from "./UIUtil";

const STORAGE_OFFSET = 1;

export function createNoteItem(noteData, urlKey) {
  const listItem = document.createElement("li");
  const quoteIcon = constructQuoteIconNode();
  const selectionItem = constructNodeWithText("p", noteData.selection, "project-item-selection");
  const trashIcon = constructTrashIconNode();
  addListenersToTrashNode(trashIcon, listItem, urlKey);

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

function addListenersToTrashNode(trashIcon, listItem, url) {
  listItem.addEventListener("mouseover", function () {
    trashIcon.classList.toggle("trash-icon--hidden");
  });

  listItem.addEventListener("mouseout", function () {
    trashIcon.classList.toggle("trash-icon--hidden");
  });

  trashIcon.addEventListener("click", function () {
    var i = 0;
    var item = listItem;

    while ((item = item.previousSibling) != null) {
      if (item.nodeName.toLowerCase() === "li") {
        i++;
      }
    }

    deleteNote(url, STORAGE_OFFSET + i, function () {
      location.reload();
    });
  });
}

function constructQuoteIconNode() {
  var quoteImg = document.createElement("img");
  quoteImg.src = "public/icons/quote16.png";
  quoteImg.classList.add( "quote-icon");

  return quoteImg;
}

function constructTrashIconNode() {
  var trashButton = document.createElement("input");

  trashButton.type = "image";
  trashButton.src = "public/icons/trash32.png";
  trashButton.className = "trash-icon trash-icon--hidden";

  return trashButton;
}
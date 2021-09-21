import { deleteNote } from "../services/StorageService";
import { constructNodeWithText } from "../UIUtil";
import { createNoteItemUserNote } from "./NoteItemUserNote";

export function createNoteItem(noteData, urlKey) {
  const listItem = document.createElement("li");
  const selectionAndNoteContainer = document.createElement('div');
  selectionAndNoteContainer.classList.add('note-category-content')
  const selectionItem = constructNodeWithText(
    "p",
    noteData.selection,
    "note-category-item-selection"
  );
  const trashIcon = constructTrashIconNode();
  addListenersToTrashNode(trashIcon, listItem, urlKey, noteData.selection);
  selectionAndNoteContainer.append(selectionItem);

  if (noteData.note) {
    selectionAndNoteContainer.append(createNoteItemUserNote(noteData));
  }

  listItem.classList.add("note-category-item");
  listItem.append(selectionAndNoteContainer);
  listItem.append(trashIcon);

  return listItem;
}

function addListenersToTrashNode(trashIcon, listItem, url, selection) {
  trashIcon.addEventListener("click", function () {
    deleteNote(url, selection, shouldRemoveNoteCategory => {
      shouldRemoveNoteCategory ? listItem.parentElement.remove() : listItem.remove();
    });
  });
}

function constructTrashIconNode() {
  const trashButton = document.createElement("input");

  trashButton.type = "image";
  trashButton.src = "public/icons/trash.png";
  trashButton.className = "trash-icon";

  return trashButton;
}

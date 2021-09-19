import { deleteNote } from "../services/StorageService";
import { constructNodeWithText } from "../UIUtil";

export function createNoteItem(noteData, urlKey) {
  const listItem = document.createElement("li");
  const selectionItem = constructNodeWithText(
    "p",
    noteData.selection,
    "note-category-item-selection"
  );
  const trashIcon = constructTrashIconNode();
  addListenersToTrashNode(trashIcon, listItem, urlKey, noteData.selection);

  if (noteData.note) {
    const noteItem = constructNodeWithText(
      "p",
      noteData.note,
      "note-category-item-user-note offset-1"
    );

    selectionItem.append(noteItem);
  }

  listItem.classList.add("note-category-item");

  listItem.append(selectionItem);
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

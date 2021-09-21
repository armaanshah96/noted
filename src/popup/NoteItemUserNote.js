import { constructNodeWithText } from "./DOMHelper";

export function createNoteItemUserNote(noteData) {
    const noteContainer = document.createElement('div')
    const notePrefix = document.createElement('b');
    notePrefix.textContent = 'Your note: ';
    notePrefix.classList.add('note-category-item-user-note-prefix');
    const noteItem = constructNodeWithText(
      "p",
      noteData.note,
      "note-category-item-user-note-content offset-1"
    );

    noteContainer.classList.add('note-category-item-user-note-container');
    noteContainer.append(notePrefix);
    noteContainer.append(noteItem);

    return noteContainer;
}
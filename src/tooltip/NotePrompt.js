import {
  getSelectionHorizontalCoordinate,
  getSelectionVerticalCoordinate
} from "../services/SelectionService";
import { createNoteButton } from "./NoteButton";
import { createNoteTextarea } from "./NoteTextarea";

export function createUserNoteArea(callback) {
  const inputContainer = document.createElement("div");

  const noteTextarea = createNoteTextarea();
  const saveButton = createNoteButton(
    "save",
    "Enter",
    noteTextarea,
    callback
  );
  const cancelButton = createNoteButton("cancel", "Escape");
  const buttonContainer = document.createElement('div');
  buttonContainer.append(cancelButton);
  buttonContainer.append(saveButton);

  inputContainer.append(noteTextarea);
  inputContainer.append(buttonContainer);

  inputContainer.classList.add('note-prompt');
  inputContainer.style.left = `${getSelectionHorizontalCoordinate() - 30}px`;
  inputContainer.style.top = `${getSelectionVerticalCoordinate() - 55}px`;

  document.body.append(inputContainer);
}

export const removeNotePrompt = () => {
  return document.querySelector('.note-prompt').remove();
}

export const notePromptVisible = () => {
  return !!document.querySelector('.note-prompt');
}
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
    inputContainer,
    noteTextarea,
    callback
  );
  const cancelButton = createNoteButton("cancel", inputContainer);
  const divider = document.createElement("br");

  inputContainer.append(noteTextarea);
  inputContainer.append(divider);
  inputContainer.append(cancelButton);
  inputContainer.append(saveButton);

  inputContainer.id = "notePrompt";
  inputContainer.style.left = `${getSelectionHorizontalCoordinate() - 30}px`;
  inputContainer.style.top = `${getSelectionVerticalCoordinate() - 55}px`;

  document.body.append(inputContainer);
}

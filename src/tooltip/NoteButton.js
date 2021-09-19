import { removeNotePrompt } from "./NotePrompt";

export const createNoteButton = (
  buttonType,
  shortcutKey,
  textareaEl,
  callback
) => {
  const noteButton = document.createElement("input");
  noteButton.type = "button";
  noteButton.classList.add(`note-prompt-${buttonType}-btn`);
  noteButton.value = buttonType;

  noteButton.addEventListener("click", () => {
    if (buttonType === "save") {
      const noteResult = textareaEl.value;
      removeNotePrompt();
      callback(noteResult);
    }

    removeNotePrompt()
  });

  setupShortcut(shortcutKey, noteButton);

  return noteButton;
};

function setupShortcut(key, button) {
  document.addEventListener('keydown', (event) => {
    if(event.key === key && document.contains(button)) {
      button.click();
    }
  });
}

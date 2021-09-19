export const createNoteButton = (
  buttonType,
  container,
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
      container.remove();
      callback(noteResult);
    }

    container.remove();
  });

  return noteButton;
};

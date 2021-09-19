export const createNoteTextarea = () => {
  const textarea = document.createElement("textarea");
  textarea.classList.add("note-prompt-textarea");
  textarea.cols = 30;
  textarea.rows = 4;
  textarea.autofocus = true;

  return textarea;
};

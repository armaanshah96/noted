export const createNoteTextarea = () => {
  const textarea = document.createElement("textarea");
  textarea.classList.add("note-prompt-textarea");
  textarea.cols = 20;
  textarea.rows = 2;
  textarea.autofocus = true;

  return textarea;
};

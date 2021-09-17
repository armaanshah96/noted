export const createNoteTextarea = () => {
  const textarea = document.createElement("textarea");
  textarea.id = "noteTextBox";
  textarea.cols = 30;
  textarea.rows = 4;
  textarea.autofocus = true;

  return textarea;
};

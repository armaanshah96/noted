export const createPopupHeaderText = (isMainPage) => {
  const headerText = document.createElement("b");
  const text = isMainPage ? "Noted" : "Settings";

  headerText.textContent = text;

  headerText.classList.add("popup-header-text");
  headerText.classList.add(`${text.toLowerCase()}-text`);

  const headerClassToRemove = isMainPage ? ".settings-text" : ".noted-text";
  cleanupHeaderText(headerClassToRemove);

  return headerText;
};

const cleanupHeaderText = (headerClass) => {
  const headerToRemove = document.querySelector(headerClass);
  if (headerToRemove) {
    headerToRemove.remove();
  }
};

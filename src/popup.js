import { createSettingsContent, renderPopupMainContent } from "./popup/PopupContent";
import {
  createBackButton,
  createSettingsButton
} from "./popup/PopupHeaderButton";
import { createPopupHeaderText } from "./popup/PopupHeaderText";

export const render = async (isMainPage) => {
  renderPopupHeader(isMainPage);
  await renderPopupContent(isMainPage);
};

const renderPopupHeader = (isMainPage) => {
  const popupHeaderContainer = document.querySelector(".popup-header");

  popupHeaderContainer.append(createPopupHeaderText(isMainPage));
  popupHeaderContainer.append(
    isMainPage ? createSettingsButton() : createBackButton()
  );
};

const renderPopupContent = async (isMainPage) => {
  const containerEl = document.querySelector(".popup-content");
  let contentEl;

  if(isMainPage) {
    contentEl = renderPopupMainContent();
  } else {
    contentEl = await createSettingsContent();
  }

  containerEl.append(contentEl);
};

render(true);

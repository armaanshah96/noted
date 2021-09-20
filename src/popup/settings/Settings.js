import { createSitePolicyButton } from "./SitePolicyButton";

export const renderSettings = async () => {
  const popupHeader = document.querySelector(".popup-header");

  popupHeader.textContent = "Settings";

  popupHeader.append(await createSitePolicyButton());
};

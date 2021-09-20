import { render } from "../popup";

export const createSettingsButton = () => {
  const settingsButton = document.createElement("button");

  settingsButton.textContent = "Settings";
  settingsButton.addEventListener("click", () => render(false));
  settingsButton.classList.add('popup-header-button');
  settingsButton.classList.add('settings-button');

  cleanupButtons('.back-button');

  return settingsButton;
};

export const createBackButton = () => {
  const backButton = document.createElement("button");

  backButton.textContent = "Back";
  backButton.addEventListener("click", () => render(true));
  backButton.classList.add('popup-header-button');
  backButton.classList.add('back-button');

  cleanupButtons('.settings-button');

  return backButton;
}

const cleanupButtons = (buttonClass) => {
  const buttonToRemove = document.querySelector(buttonClass);
  if(buttonToRemove) {
    buttonToRemove.remove();
  }
}
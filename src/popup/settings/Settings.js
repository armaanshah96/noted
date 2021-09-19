import { POLICIES } from "../../constants";

export const renderSettings = () => {
  const popupHeader = document.querySelector(".popup-header");

  popupHeader.textContent = "Settings";

  popupHeader.append(createSitePolicyButton());
  // render export button
  // render exclude/include this website button
  // feedback is the button converts to opposite version
  // functionality:
  // saves to storage under excludedSites: []
  // triggers excludeCurrentSite() to remove listeners for content script
  // convert content script to be `notExcluded && setupListeners`
};

function createSitePolicyButton() {
  const policyButton = document.createElement("button");
  policyButton.textContent = POLICIES[0].policy;
  policyButton.dataset.policyKey = POLICIES[0].policyKey;
  policyButton.classList.add('settings-policy-button');

  policyButton.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        sendPolicyMessage(tabs[0].id);
        togglePolicyButton();
      });
  });

  return policyButton;
};

function sendPolicyMessage(activeTab) {
  const policyButton = getPolicyButton();
  chrome.tabs.sendMessage(
    activeTab,
    { policyKey: policyButton.dataset.policyKey }
  );
}

function togglePolicyButton() {
  const policyButton = getPolicyButton();
  const currentPolicyKey = policyButton.dataset.policyKey;
  const currentPolicyIndex = POLICIES.findIndex(
    (item) => item.policyKey === currentPolicyKey
  );

  const newPolicy = POLICIES[(currentPolicyIndex + 1) % 2];
  policyButton.dataset.policyKey = newPolicy.policyKey;
  policyButton.textContent = newPolicy.policy;
}

function getPolicyButton() {
  return document.querySelector('.settings-policy-button');
}
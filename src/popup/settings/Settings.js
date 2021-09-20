import { policy_configs } from "../../constants";

export const renderSettings = async () => {
  const popupHeader = document.querySelector(".popup-header");

  popupHeader.textContent = "Settings";

  popupHeader.append(await createSitePolicyButton());
};

async function createSitePolicyButton() {
  const activeTab = await getActiveTab();
  const activeHost = new URL(activeTab.url).host;
  const activePolicy = await policy_configs.getActivePolicy(activeHost);

  const policyButton = document.createElement("button");

  policyButton.textContent = activePolicy.policy;
  policyButton.dataset.policyKey = activePolicy.policyKey;
  policyButton.classList.add("settings-policy-button");

  policyButton.addEventListener("click", policyButtonListener);

  return policyButton;
}

function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      resolve(activeTab);
    });
  });
}

function policyButtonListener() {
  getActiveTab().then((activeTab) => {
    const activeHostname = new URL(activeTab.url).host;
    const policyKey = getPolicyButton().dataset.policyKey;

    sendPolicyMessage(activeTab.id, policyKey);
    togglePolicyButton();

    policy_configs.rules
      .find((policy) => policy.policyKey === policyKey)
      .updatePoliciesAction(activeHostname);
  });
}

function sendPolicyMessage(activeTab, policyKey) {
  chrome.tabs.sendMessage(activeTab, { policyKey });
}

function togglePolicyButton() {
  const policyButton = getPolicyButton();
  const currentPolicyKey = policyButton.dataset.policyKey;
  const currentPolicyIndex = policy_configs.rules.findIndex(
    (item) => item.policyKey === currentPolicyKey
  );

  const newPolicy = policy_configs.rules[(currentPolicyIndex + 1) % 2];
  policyButton.dataset.policyKey = newPolicy.policyKey;
  policyButton.textContent = newPolicy.policy;
}

function getPolicyButton() {
  return document.querySelector(".settings-policy-button");
}

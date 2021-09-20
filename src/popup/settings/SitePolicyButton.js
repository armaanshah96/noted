import * as PolicyService from "../../services/PolicyService";
import { getActiveTab } from "../../services/TabService";

export async function createSitePolicyButton() {
  const policyButton = document.createElement("button");
  const activePolicy = await PolicyService.getActivePolicy();

  policyButton.textContent = activePolicy.policy;
  policyButton.dataset.policyKey = activePolicy.policyKey;
  policyButton.classList.add("settings-content-button-policy");
  policyButton.classList.add("settings-content-button");

  policyButton.addEventListener("click", policyButtonListener);

  return policyButton;
}

function policyButtonListener() {
  getActiveTab().then((activeTab) => {
    const policyButton = getPolicyButton();
    const oldPolicyKey = policyButton.dataset.policyKey;
    const [newPolicy, oldPolicy] = PolicyService.toggleSitePolicy(oldPolicyKey);

    PolicyService.sendPolicyMessage(activeTab.id, oldPolicyKey);
    PolicyService.updatePoliciesStore(oldPolicy, activeTab);
    togglePolicyButton(policyButton, newPolicy);
  });
}

function togglePolicyButton(policyButton, newPolicy) {
  policyButton.dataset.policyKey = newPolicy.policyKey;
  policyButton.textContent = newPolicy.policy;
}

function getPolicyButton() {
  return document.querySelector(".settings-content-button-policy");
}

import { excludeCurrentSite, setNotedListeners } from "../content";
import {
  addWebsitePolicy,
  isUrlExcluded,
  removeWebsitePolicy
} from "./StorageService";
import { getActiveTab } from "./TabService";

export const POLICY_CONFIG_MAP = {
  rules: [
    {
      policyKey: "EXCLUDE_SITE",
      policy: "Exclude This Site",
      currentSiteAction: () => excludeCurrentSite(),
      updatePoliciesAction: (urlToAdd) => addWebsitePolicy(urlToAdd),
    },
    {
      policyKey: "INCLUDE_SITE",
      policy: "Include This Site",
      currentSiteAction: () => setNotedListeners(),
      updatePoliciesAction: (urlToRemove) => removeWebsitePolicy(urlToRemove),
    },
  ],
  getActivePolicy: async function (urlHost) {
    return (await isUrlExcluded(urlHost)) ? this.rules[1] : this.rules[0];
  },
};

export async function getActivePolicy() {
  const activeTab = await getActiveTab();
  const activeHost = new URL(activeTab.url).host;
  return await POLICY_CONFIG_MAP.getActivePolicy(activeHost);
}

export function updatePoliciesStore(policy, activeTab) {
  const activeHostname = new URL(activeTab.url).host;

  policy.updatePoliciesAction(activeHostname);
}

export function sendPolicyMessage(activeTab, policyKey) {
  chrome.tabs.sendMessage(activeTab, { policyKey });
}

export function toggleSitePolicy(oldPolicyKey) {
  const oldPolicyIndex = POLICY_CONFIG_MAP.rules.findIndex(
    (item) => item.policyKey === oldPolicyKey
  );

  return [
    POLICY_CONFIG_MAP.rules[(oldPolicyIndex + 1) % 2],
    POLICY_CONFIG_MAP.rules[oldPolicyIndex],
  ];
}

import { excludeCurrentSite, setNotedListeners } from "./content";
import {
  addWebsitePolicy, isUrlExcluded, removeWebsitePolicy
} from "./services/StorageService";

export const policy_configs = {
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

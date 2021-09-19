import { excludeCurrentSite, setNotedListeners } from './content';

export const POLICIES = [
  { policyKey: "EXCLUDE_SITE", policy: "Exclude This Site", action: () => excludeCurrentSite() },
  { policyKey: "INCLUDE_SITE", policy: "Include This Site", action: () => setNotedListeners()},
];

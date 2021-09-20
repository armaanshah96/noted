import { POLICY_CONFIG_MAP } from "./services/PolicyService";
import { getSelected } from "./services/SelectionService";
import { isUrlExcluded } from "./services/StorageService";
import { notePromptVisible, removeNotePrompt } from "./tooltip/NotePrompt";
import {
  removeTooltip,
  renderTooltip,
  tooltipVisible,
} from "./tooltip/Tooltip";

setMessageListener();
isUrlExcluded(location.host).then(
  (isExcluded) => isExcluded || setNotedListeners()
);

export function setNotedListeners() {
  document.documentElement.addEventListener(
    "mouseup",
    renderTooltipOnSelection
  );
  document.documentElement.addEventListener(
    "mousedown",
    removeTooltipOnMouseDown
  );
  document.documentElement.addEventListener(
    "mousedown",
    removeNotePromptOnMouseDown
  );
}

export function excludeCurrentSite() {
  document.documentElement.removeEventListener(
    "mouseup",
    renderTooltipOnSelection
  );
  document.documentElement.removeEventListener(
    "mousedown",
    removeTooltipOnMouseDown
  );
  document.documentElement.removeEventListener(
    "mousedown",
    removeNotePromptOnMouseDown
  );
}

function setMessageListener() {
  chrome.runtime.onMessage.addListener((request) => {
    POLICY_CONFIG_MAP.rules
      .find((policy) => policy.policyKey === request.policyKey)
      .currentSiteAction();
  });
}

function renderTooltipOnSelection(event) {
  if (event.button === 0) {
    const selection = getSelected().toString();
    if (selection !== "" && !tooltipVisible()) {
      renderTooltip();
    }
  }
}

function removeTooltipOnMouseDown(event) {
  if (event.button === 0) {
    const mouseDownOnTooltip = event.target.closest("#tooltip");
    if (tooltipVisible() && !mouseDownOnTooltip) {
      removeTooltip();
    }
  }
}

function removeNotePromptOnMouseDown(event) {
  if (event.button === 0) {
    const mouseDownOnNotePrompt = event.target.closest(".note-prompt");

    if (notePromptVisible() && !mouseDownOnNotePrompt) {
      removeNotePrompt();
    }
  }
}

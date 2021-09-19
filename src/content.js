import { getSelected } from "./services/SelectionService";
import { notePromptVisible, removeNotePrompt } from "./tooltip/NotePrompt";
import {
  removeTooltip, renderTooltip, tooltipVisible
} from "./tooltip/Tooltip";

document.documentElement.addEventListener("mousedown", function (event) {
  if (event.button === 0) {
    const mouseDownOnTooltip = event.target.closest("#tooltip");
    const mouseDownOnNotePrompt = event.target.closest(".note-prompt");
    if (tooltipVisible() && !mouseDownOnTooltip) {
      removeTooltip();
    }

    if (notePromptVisible() && !mouseDownOnNotePrompt) {
      removeNotePrompt();
    }
  }
});

document.documentElement.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    const selection = getSelected().toString();
    if (selection !== "" && !tooltipVisible()) {
      renderTooltip();
    }
  }
});

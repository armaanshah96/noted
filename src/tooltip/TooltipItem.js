import { clearSelection, getSelected } from "../services/SelectionService";
import { saveSelected } from "../services/StorageService";
import { createUserNoteArea } from "./NotePrompt";
import { removeTooltip } from "./Tooltip";
import { createHoverButton } from "./TooltipItemButton";

export const createTooltipItem = (itemType, buttonTitle) => {
  const item = document.createElement("li");
  const itemBtn = createHoverButton(itemType, buttonTitle);

  itemBtn.addEventListener("click", function () {
    const selectionString = getSelected().toString();

    if (selectionString !== "") {
      itemType === "user-note"
        ? createUserNoteArea((note) =>
            saveSelected(location.href, document.title, selectionString, note)
          )
        : saveSelected(location.href, document.title, selectionString);

      clearSelection();
      removeTooltip();
    }
  });

  item.append(itemBtn);
  item.classList.add(`tooltip-buttons-button`);

  return item;
};

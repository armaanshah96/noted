import { clearSelection, getSelected } from "../services/SelectionService";
import { saveSelected } from "../services/StorageService";
import { createUserNoteArea } from "./NotePrompt";
import { removeTooltip } from "./Tooltip";
import { createHoverButton } from "./TooltipItemButton";

const iconPath = {
  highlight: "public/images/highlight.png",
  "user-note": "public/images/note.png",
};

export const createTooltipItem = (itemType, buttonTitle) => {
  const item = document.createElement("li");
  const itemIcon = chrome.runtime.getURL(iconPath[itemType]);
  const itemBtn = createHoverButton(itemIcon, buttonTitle);

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
  item.id = `${itemType}-item`;

  return item;
};

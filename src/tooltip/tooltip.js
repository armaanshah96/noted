import {
  getSelectionHorizontalCoordinate,
  getSelectionVerticalCoordinate
} from "../services/SelectionService";
import { createTooltipItem } from "./TooltipItem";

export const renderTooltip = () => {

  const ul = document.createElement("ul");
  ul.id = 'tooltip';
  ul.style.left = `${getSelectionHorizontalCoordinate() - 30}px`;
  ul.style.top = `${getSelectionVerticalCoordinate() - 55}px`;
  ul.classList.add("tooltip-buttons");

  ul.append(createTooltipItem("highlight", "Highlight"));
  ul.append(createTooltipItem("user-note", "Add note"));

  document.body.append(ul);
};

export function removeTooltip() {
  document.getElementById("tooltip").remove();
}

export const tooltipVisible = () => {
  return !!document.getElementById("tooltip");
};

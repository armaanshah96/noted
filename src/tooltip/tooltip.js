import {
  getSelectionHorizontalCoordinate,
  getSelectionVerticalCoordinate
} from "../services/SelectionService";
import { createTooltipItem } from "./TooltipItem";

export const renderTooltip = () => {
  const div = document.createElement("div");
  div.id = "tooltip";
  div.style.left = `${getSelectionHorizontalCoordinate() - 30}px`;
  div.style.top = `${getSelectionVerticalCoordinate() - 55}px`;

  const ul = document.createElement("ul");
  ul.classList.add("tooltip-buttons");

  ul.append(createTooltipItem("highlight", "Highlight"));
  ul.append(createTooltipItem("user-note", "Add note"));

  div.append(ul);

  document.body.append(div);
};

export function removeTooltip() {
  document.getElementById("tooltip").remove();
}

export const tooltipVisible = () => {
  return !!document.getElementById("tooltip");
};

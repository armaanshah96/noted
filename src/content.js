import { getSelected } from "./services/SelectionService";
import { renderTooltip, clearTooltip, tooltipVisible } from "./tooltip/tooltip";

document.documentElement.addEventListener(
  "mousedown",
  function (event) {
    if (event.button === 0) {
      const mouseDownOnTooltip = event.target.closest("#tooltip");
      if (tooltipVisible() && !mouseDownOnTooltip) {
        clearTooltip();
      }
    }
  }
);

document.documentElement.addEventListener("mouseup", function (event) {
  if (event.button === 0) {
    var selection = getSelected().toString();
    if (selection !== "" && !tooltipVisible()) {
      renderTooltip();
    }
  }
});

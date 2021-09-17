import { deleteNote } from "./StorageManager";
import { constructNodeWithText } from "./UIUtil";
import { createCategoryHeader } from "./CategoryHeader";

const STORAGE_OFFSET = 1;

export const noteCategoryElement = (items, urlKey) => {
  const webpage = items[urlKey];
  const titleText = webpage[0].hasOwnProperty("title") && webpage.shift().title;
  const headerElement = createCategoryHeader(urlKey, titleText);

  const listNode = document.createElement("ul");
  listNode.classList.add("project-item");
  listNode.append(headerElement);

  for (const noteObj of webpage) {
    (function () {
      var listItem = document.createElement("li");
      var quoteIcon = constructQuoteIconNode();
      var selectionItem = constructNodeWithText("P", noteObj.selection);
      selectionItem.className += "project-item-selection";

      if (noteObj.note !== undefined) {
        var noteItem = constructNodeWithText("P", noteObj.note);
        noteItem.className += "project-item-note offset-1";

        selectionItem.appendChild(noteItem);
      }

      listItem.className += "project-item-title";

      listItem.append(quoteIcon);
      listItem.append(selectionItem);

      var trashIcon = constructTrashIconNode();
      addListenerToTrashNode(trashIcon, listItem, urlKey);
      listItem.appendChild(trashIcon);
      listItem.addEventListener("mouseover", function () {
        trashIcon.className = "trash-icon-visible";
      });
      listItem.addEventListener("mouseout", function () {
        trashIcon.className = "trash-icon-hidden";
      });

      listNode.appendChild(listItem);
    })();
  }
  return listNode;
};

function addListenerToTrashNode(trashIcon, listItem, url) {
  trashIcon.addEventListener("click", function () {
    var i = 0;
    var item = listItem;

    while ((item = item.previousSibling) != null) {
      if (item.nodeName.toLowerCase() === "li") {
        i++;
      }
    }

    deleteNote(url, STORAGE_OFFSET + i, function () {
      location.reload();
    });
  });
}

function constructQuoteIconNode() {
  var quoteImg = document.createElement("img");
  quoteImg.src = "public/icons/quote16.png";
  quoteImg.className += "quote-icon";

  return quoteImg;
}

function constructTrashIconNode() {
  var trashButton = document.createElement("input");

  trashButton.type = "image";
  trashButton.src = "public/icons/trash32.png";
  trashButton.className = "trash-icon-hidden";

  return trashButton;
}


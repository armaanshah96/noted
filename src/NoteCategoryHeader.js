import { constructNodeWithText } from "./UIUtil";

export function createNoteCategoryHeader(url, titleText) {
  const container = document.createElement("div");
  const subtitle = constructNodeWithText("p", extractUrlHostname(url));

  if (titleText) {
    const title = constructNodeWithText("h5", titleText);

    container.append(title);
  }

  container.append(subtitle);
  container.classList.add("project-item-header");

  container.addEventListener("click", function () {
    window.open(url);
  });

  return container;
}

function extractUrlHostname(url) {
  let hostname;

  if (url.indexOf("//") > -1) {
    hostname = url.split("//")[1];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?,.com,.co"
  hostname = hostname.split("?")[0];
  hostname = hostname.split(".co")[0];
  hostname = hostname.split(".com")[0];

  // for local files, take the name of the file
  if (url.indexOf("file:") > -1 && hostname.length === 0) {
    const nameOfLocalFile = url.split("/").pop();
    const extensionIndex = nameOfLocalFile.lastIndexOf(".");

    hostname = nameOfLocalFile.slice(0, extensionIndex);
  }

  return decodeURI(hostname);
}
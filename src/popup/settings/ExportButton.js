import {
  retrieveNotes,
  WEBSITE_POLICIES_STORAGE_KEY
} from "../../services/StorageService";

export function createExportButton() {
  const exportButton = document.createElement("button");
  exportButton.textContent = "Export Data";
  exportButton.classList.add("settings-content-button");
  exportButton.classList.add("settings-content-button-export");

  exportButton.addEventListener("click", exportButtonListener);

  return exportButton;
}

function exportButtonListener() {
  retrieveNotes().then((items) => {
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = URL.createObjectURL(constructExportFile(items));
    downloadAnchor.download = "Noted-User-Data.txt";

    downloadAnchor.click();
  });
}

function constructExportFile(items) {
  const userData = { ...items };
  delete userData[WEBSITE_POLICIES_STORAGE_KEY];
  const userDataJSON = JSON.stringify(userData);

  return new Blob([userDataJSON], { type: "text/plain" });
}
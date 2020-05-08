// index2.ts
//
/*
const { BlobServiceClient } = require("@azure/storage-blob");
*/
// Now do something interesting with BlobServiceClient




const selectButton: HTMLButtonElement  = <HTMLButtonElement>document.getElementById("select-button");
const fileInput: HTMLInputElement = <HTMLInputElement>document.getElementById("file-input");
const deleteButton: HTMLButtonElement  = <HTMLButtonElement>document.getElementById("delete-button");
const statuss: HTMLElement = <HTMLElement>document.getElementById("status");

const fileList: HTMLSelectElement = <HTMLSelectElement>document.getElementById("file-list");

const uploadFiles = async () => {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        for (var i = 0; i <  fileInput.files.length; i++) {
            const blockBlobClient = containerClient.getBlockBlobClient(fileInput.files[i].name);
            promises.push(blockBlobClient.uploadBrowserData(fileInput.files[i]));
        }
        await Promise.all(promises);
        reportStatus("Done.");
        listFiles();
    }
    catch (error) {
            reportStatus(error.message);
    }
}

selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);

const deleteFiles = async () => {
    try {
        if (fileList.selectedOptions.length > 0) {
            reportStatus("Deleting files...");
            for (var i = 0; i < fileList.selectedOptions.length; i++) {
                await containerClient.deleteBlob(fileList.selectedOptions[i].text);
            }
            reportStatus("Done.");
            listFiles();
        } else {
            reportStatus("No files selected.");
        }
    } catch (error) {
        reportStatus(error.message);
    }
};

deleteButton.addEventListener("click", deleteFiles);


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// index2.ts
//
/*
const { BlobServiceClient } = require("@azure/storage-blob");
*/
// Now do something interesting with BlobServiceClient
const selectButton = document.getElementById("select-button");
const fileInput = document.getElementById("file-input");
const deleteButton = document.getElementById("delete-button");
const fileList = document.getElementById("file-list");
const uploadFiles = () => __awaiter(this, void 0, void 0, function* () {
    try {
        reportStatus("Uploading files...");
        const promises = [];
        for (var i = 0; i < fileInput.files.length; i++) {
            const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(containerURL, fileInput.files[i].name);
            promises.push(azblob.uploadBrowserDataToBlockBlob(azblob.Aborter.none, fileInput.files[i], blockBlobURL));
        }
        yield Promise.all(promises);
        reportStatus("Done.");
        listFiles();
    }
    catch (error) {
        reportStatus(error.body.message);
    }
});
selectButton.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", uploadFiles);
const deleteFiles = () => __awaiter(this, void 0, void 0, function* () {
    try {
        if (fileList.selectedOptions.length > 0) {
            reportStatus("Deleting files...");
            for (var i = 0; i < fileList.selectedOptions.length; i++) {
                const blobURL = azblob.BlobURL.fromContainerURL(containerURL, fileList.selectedOptions[i].text);
                yield blobURL.delete(azblob.Aborter.none);
            }
            reportStatus("Done.");
            listFiles();
        }
        else {
            reportStatus("No files selected.");
        }
    }
    catch (error) {
        reportStatus(error.body.message);
    }
});
deleteButton.addEventListener("click", deleteFiles);
// Now do something interesting with BlobServiceClient
const createContainerButton = document.getElementById("create-container-button");
const deleteContainerButton = document.getElementById("delete-container-button");
const listButton = document.getElementById("list-button");
const statuss = document.getElementById("statuss");
const reportStatus = message => {
    statuss.innerHTML += `${message}<br/>`;
    statuss.scrollTop = statuss.scrollHeight;
};
const account = "mediacloud";
const accountKey = "accountkey";
// Create a unique name for the container by 
// appending the current time to the file name
const containerName = "container" + new Date().getTime();
// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://mediacloud.blob.core.windows.net/?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
// Create a new BlobServiceClient
//const blobServiceClient = new BlobServiceClient(blobSasUrl);
//const blobServiceClient = BlobServiceClient.fromConnectionString("BlobEndpoint=https://mediacloud.blob.core.windows.net/;SharedAccessSignature=sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D");
var sasString = "sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
var blobUri = 'https://' + account + '.blob.core.windows.net';
//var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, InputSASToken);
const containerURL = new azblob.ContainerURL(`https://${account}.blob.core.windows.net/${containerName}?${sasString}`, azblob.StorageURL.newPipeline(new azblob.AnonymousCredential));
const createContainer = () => __awaiter(this, void 0, void 0, function* () {
    try {
        reportStatus(`Creating container "${containerName}"...`);
        yield containerURL.create(azblob.Aborter.none);
        reportStatus(`Done.`);
    }
    catch (error) {
        reportStatus(error.body.message);
    }
});
const deleteContainer = () => __awaiter(this, void 0, void 0, function* () {
    try {
        reportStatus(`Deleting container "${containerName}"...`);
        yield containerURL.delete(azblob.Aborter.none);
        reportStatus(`Done.`);
    }
    catch (error) {
        reportStatus(error.body.message);
    }
});
/*
const createContainer = async () => {

    try {
            // Get a container client from the BlobServiceClient
            reportStatus(`Creating container "${containerName}"...`);
            blobService.createContainerIfNotExists(containerName, function (error, result) {
                reportStatus(`Done.`);
                if (error) {
                    reportStatus(error.message);
                }
                else
                    reportStatus(`Done.` + result);
            });
    } catch (error) {
        reportStatus(error.message);
    }
};

const deleteContainer = async () => {
    try {
        // Get a container client from the BlobServiceClient
        reportStatus(`Creating container "${containerName}"...`);
        blobService.deleteContainerIfNotExists(containerName, function (error, result) {
            reportStatus(`Done.`);
            if (error) {
                reportStatus(error.message);
            }
            else
                reportStatus(`Done.` + result);
        });
    } catch (error) {
        reportStatus(error.message);
    }
};
*/
createContainerButton.addEventListener("click", createContainer);
deleteContainerButton.addEventListener("click", deleteContainer);
const listFiles = () => __awaiter(this, void 0, void 0, function* () {
    fileList.size = 0;
    fileList.innerHTML = "";
    try {
        reportStatus("Retrieving file list...");
        let marker = undefined;
        do {
            const listBlobsResponse = yield containerURL.listBlobFlatSegment(azblob.Aborter.none, marker);
            marker = listBlobsResponse.nextMarker;
            const items = listBlobsResponse.segment.blobItems;
            for (const blob of items) {
                fileList.size += 1;
                fileList.innerHTML += `<option>${blob.name}</option>`;
            }
        } while (marker);
        if (fileList.size > 0) {
            reportStatus("Done.");
        }
        else {
            reportStatus("The container does not contain any files.");
        }
    }
    catch (error) {
        reportStatus(error.body.message);
    }
});
listButton.addEventListener("click", listFiles);
//# sourceMappingURL=index.js.map
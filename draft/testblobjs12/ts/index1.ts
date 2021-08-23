// index1.ts
//
/*
const { BlobServiceClient } = require("@azure/storage-blob");
*/

const { BlobServiceClient } = require("@azure/storage-blob");

// Now do something interesting with BlobServiceClient
const createContainerButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("create-container-button");
const deleteContainerButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("delete-container-button");
const listButton: HTMLButtonElement  = <HTMLButtonElement>document.getElementById("list-button");


const reportStatus = message => {
    statuss.innerHTML += `${message}<br/>`;
    statuss.scrollTop = statuss.scrollHeight;
}
const account = "mediacloud";
const accountKey = "accountkey";


// Update <placeholder> with your Blob service SAS URL string
const blobSasUrl = "https://mediacloud.blob.core.windows.net/?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
// Create a new BlobServiceClient
//const blobServiceClient = new BlobServiceClient(blobSasUrl);
//const blobServiceClient = BlobServiceClient.fromConnectionString("BlobEndpoint=https://mediacloud.blob.core.windows.net/;SharedAccessSignature=sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D");
var InputSASToken = "?sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D";
var blobUri = 'https://' + account + '.blob.core.windows.net';
//var blobService = AzureStorage.Blob.createBlobServiceWithSas(blobUri, InputSASToken);

// Create a new BlobServiceClient
//const blobServiceClient = new BlobServiceClient(blobSasUrl);
const blobServiceClient = BlobServiceClient.fromConnectionString("BlobEndpoint=https://mediacloud.blob.core.windows.net/;SharedAccessSignature=sv=2019-10-10&ss=b&srt=sco&sp=rwdlacx&se=2030-05-08T04:39:33Z&st=2020-05-07T20:39:33Z&spr=https,http&sig=u%2Ffs0Y%2BZbRriL49RWfcyNwnT8C6dQxlZtMPw1pXNodY%3D");


// Create a unique name for the container by 
// appending the current time to the file name
const containerName = "container" + new Date().getTime();
const containerClient = blobServiceClient.getContainerClient(containerName);



const createContainer = async () => {
    try {
        reportStatus(`Creating container "${containerName}"...`);
        await containerClient.create();
        reportStatus(`Done.`);
    } catch (error) {
        reportStatus(error.message);
    }
};

const deleteContainer = async () => {
    try {
        reportStatus(`Deleting container "${containerName}"...`);
        await containerClient.delete();
        reportStatus(`Done.`);
    } catch (error) {
        reportStatus(error.message);
    }
};
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

const listFiles = async () => {
    fileList.size = 0;
    fileList.innerHTML = "";
    try {
        reportStatus("Retrieving file list...");
        let iter = containerClient.listBlobsFlat();
        let blobItem = await iter.next();
        while (!blobItem.done) {
            fileList.size += 1;
            fileList.innerHTML += `<option>${blobItem.value.name}</option>`;
            blobItem = await iter.next();
        }
        if (fileList.size > 0) {
            reportStatus("Done.");
        } else {
            reportStatus("The container does not contain any files.");
        }
    } catch (error) {
        reportStatus(error.message);
    }
};

listButton.addEventListener("click", listFiles);


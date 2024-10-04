import { BlobServiceClient } from "@azure/storage-blob";

const sasToken = "sp=racwl&st=2024-10-01T13:47:35Z&se=2024-10-15T21:47:35Z&sv=2022-11-02&sr=c&sig=o%2Bt%2FyK5f3%2FgMFC%2BjRsobUCkBxw4T4h769%2B3oeydl2jc%3D";
const storageAccountName = "techconnectstorageacc";
const containerName = "techconnectimages";

export const Keys = {
    sasToken,
    storageAccountName,
    containerName
};

export const CreateImagePost = async (image) => {
    try {
        // Creating the blob name using a unique identifier
        const blobName = new Date().toISOString() + "." + image.type.split("/")[1];

        // Connecting to the blob service
        const blobService = new BlobServiceClient(
            `https://${Keys.storageAccountName}.blob.core.windows.net?${Keys.sasToken}`
        );

        // Capturing the container
        const containerClient = blobService.getContainerClient(Keys.containerName);

        // Creating a new blob for the file
        const blobClient = containerClient.getBlockBlobClient(blobName);

        // Setting the correct Content-Type
        const options = {
            blobHTTPHeaders: {
                blobContentType: image.type
            }
        };

        // Uploading the file to the blob
        await blobClient.uploadData(image, options);

        // Returning the URL of the created blob
        return `https://${Keys.storageAccountName}.blob.core.windows.net/${Keys.containerName}/${blobName}`;

    } catch (error) {
        console.error("Error uploading the image:", error);
        return false; // Return false on error
    }
};


export const CreateImageUser = async (image, userID) => {
    try {
        // Creating the blob name using a unique identifier
        const blobName = userID + "." + image.type.split("/")[1];

        // Connecting to the blob service
        const blobService = new BlobServiceClient(
           `https://${Keys.storageAccountName}.blob.core.windows.net?${Keys.sasToken}`
        );

        // Capturing the container
        const containerClient = blobService.getContainerClient(Keys.containerName);

        // Creating a new blob for the file
        const blobClient = containerClient.getBlockBlobClient(blobName);

        // Setting the correct Content-Type
        const options = {
            blobHTTPHeaders: {
                blobContentType: image.type
            }
        };

        // Uploading the file to the blob
        await blobClient.uploadData(image, options);

        // Returning the URL of the created blob
        return `https://${Keys.storageAccountName}.blob.core.windows.net/${Keys.containerName}/${blobName}`;

    } catch (error) {
        console.error("Error uploading the image:", error);
        return false; // Return false on error
    }
};
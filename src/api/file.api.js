const { default: FileRequest } = require("utils/file.request");

export const uploadFile = (imageFile) => {
    const file = new FormData();
    file.append('file', imageFile);

    return FileRequest({
        url: "upload",
        method: "post",
        data: file,
    });
}

export const uploadFiles = (imageFiles) => {
    const files = new FormData();

    if (Array.isArray(imageFiles)) {
        imageFiles.map(item => files.append('file', item));
    }
    else {
        return Promise.reject(new Error("uploadFiles: imageFiles is not an array"));
    }

    return FileRequest({
        url: "uploads",
        method: "post",
        data: files,
    });
}

export const getFile = (filename) => FileRequest({
    url: `${filename}`,
    method: "get",
});

export const getFileObject = (filename) => FileRequest({
    url: `${filename}`,
    method: "get",
});

export const deleteFile = (filename) => FileRequest({
    url: `${filename}`,
    method: "delete",
});
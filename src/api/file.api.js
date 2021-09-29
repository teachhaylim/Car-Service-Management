const { default: FileRequest } = require("utils/file.request");

export const uploadFile = (file) => FileRequest({
    url: "upload",
    method: "post",
    file: file,
});

export const uploadFiles = (files) => FileRequest({
    url: "uploads",
    method: "post",
    file: files,
});

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
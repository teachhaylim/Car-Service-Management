import service from "utils/request";

export const QueryCategory = (data) => service({
    url: "/category",
    method: "get",
    params: data,
});

export const CreateCategory = (data) => service({
    url: "/category",
    method: "post",
    data: data,
});

export const GetCategory = (id) => service({
    url: `/category/${id}`,
    method: "get",
});

export const UpdateCategory = (id, data) => service({
    url: `/category/${id}`,
    method: "patch",
    data: data,
});

export const DeleteCategory = (id) => service({
    url: `/category/${id}`,
    method: "delete",
});
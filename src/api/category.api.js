import ApiRequest from "utils/api.request";

export const QueryCategory = (data) => ApiRequest({
    url: "category",
    method: "get",
    params: data,
});

export const CreateCategory = (data) => ApiRequest({
    url: "category",
    method: "post",
    data: data,
});

export const GetCategory = (id) => ApiRequest({
    url: `category/${id}`,
    method: "get",
});

export const UpdateCategory = (id, data) => ApiRequest({
    url: `category/${id}`,
    method: "put",
    data: data,
});

export const DeleteCategory = (id) => ApiRequest({
    url: `category/${id}`,
    method: "delete",
});
const { default: ApiRequest } = require("utils/api.request");

export const QueryShop = (filter) => ApiRequest({
    url: "shop",
    method: "get",
    params: filter,
});

export const CreateShop = (data) => ApiRequest({
    url: "shop",
    method: "post",
    data: data,
});

export const GetShop = (id) => ApiRequest({
    url: `shop/${id}`,
    method: "get",
});

export const UpdateShop = (id, data) => ApiRequest({
    url: `shop/${id}`,
    method: "put",
    data: data,
});

export const DeleteShop = (id) => ApiRequest({
    url: `shop/${id}`,
    method: "delete",
});
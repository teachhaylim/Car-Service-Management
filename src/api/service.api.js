import ApiRequest from "utils/api.request"

export const QueryService = (filter) => ApiRequest({
    url: "service",
    method: "get",
    params: filter,
});

export const CreateService = (data) => ApiRequest({
    url: "service",
    method: "post",
    data: data,
});

export const GetService = (id) => ApiRequest({
    url: `service/${id}`,
    method: "get",
});

export const UpdateService = (id, data) => ApiRequest({
    url: `service/${id}`,
    method: "put",
    data: data,
});

export const DeleteService = (id) => ApiRequest({
    url: `service/${id}`,
    method: "delete",
});
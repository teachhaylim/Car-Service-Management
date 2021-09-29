import ApiRequest from "utils/api.request";

export const QueryUsers = (data) => ApiRequest({
    url: "user",
    method: "get",
    params: data,
});

export const CreateUser = (data) => ApiRequest({
    url: "user",
    method: "post",
    data: data,
});

export const GetUser = (id) => ApiRequest({
    url: `user/${id}`,
    method: "get",
});

export const UpdateUser = (id, data) => ApiRequest({
    url: `user/${id}`,
    method: "post",
    data: data,
});

export const DeleteUser = (id) => ApiRequest({
    url: `user/${id}`,
    method: "delete",
});

export const GetUserInfo = () => ApiRequest({
    url: "user/info",
    method: "get",
});
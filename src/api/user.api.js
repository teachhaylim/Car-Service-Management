import service from "utils/request";

export const QueryUsers = (data = {}) => service({
    url: "/user",
    method: "get",
    params: data,
});

export const CreateUser = (data) => service({
    url: "/user",
    method: "post",
    data: data,
})

export const GetUser = (id) => service({
    url: `/user/${id}`,
    method: "get",
});

export const UpdateUser = (id, data) => service({
    url: `/user/${id}`,
    method: "post",
    data: data,
});

export const DeleteUser = (id) => service({
    url: `/user/${id}`,
    method: "delete",
});
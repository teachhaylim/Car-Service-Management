import ApiRequest from "utils/api.request"

export const QueryAppointment = (filter) => ApiRequest({
    url: "appointment",
    method: "get",
    params: filter,
});

export const CreateAppointment = (data) => ApiRequest({
    url: "appointment",
    method: "post",
    data: data,
});

export const GetAppointment = (id) => ApiRequest({
    url: `appointment/${id}`,
    method: "get",
});

export const UpdateAppointment = (id, data) => ApiRequest({
    url: `appointment/${id}`,
    method: "put",
    data: data,
});

export const DeleteAppointment = (id) => ApiRequest({
    url: `appointment/${id}`,
    method: "get",
});

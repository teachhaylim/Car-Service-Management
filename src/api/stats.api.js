import ApiRequest from "utils/api.request"

export const FetchDashboardPersonal = (filter) => ApiRequest({
    url: "stats/sale",
    method: "get",
    params: filter,
});

export const FetchDashboardAdmin = (filter) => ApiRequest({
    url: "stats/admin",
    method: "get",
    params: filter,
});
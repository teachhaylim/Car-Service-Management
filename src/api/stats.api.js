import ApiRequest from "utils/api.request"

export const FetchDashboardPersonal = (filter) => ApiRequest({
    url: "stats/sale",
    method: "get",
    params: filter,
});
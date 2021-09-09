import service from "utils/request";

export function listUsers(data = {}) {
    return service({
        url: "/user/list",
        method: "post",
        data: data,
    });
};
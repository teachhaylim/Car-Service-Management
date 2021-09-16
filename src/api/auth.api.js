import service from "utils/request"

export const Login = (data) => {
    return service({
        url: "/auth/login",
        method: "post",
        data: data,
    })
};

export const Register = (data) => {
    return service({
        url: "/auth/login",
        method: "post",
        data: data
    })
}
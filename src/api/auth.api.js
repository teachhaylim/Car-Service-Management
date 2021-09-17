import service from "utils/request"

export const Login = (data) => service({
    url: "/auth/login",
    method: "post",
    data: data,
})

export const Register = (data) => service({
    url: "/auth/login",
    method: "post",
    data: data
})
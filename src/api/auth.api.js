import AuthRequest from "utils/auth.request";

export const Login = (data) => AuthRequest({
    url: "login",
    method: "post",
    data: data,
});

export const LoggedInfo = () => AuthRequest({
    url: "info",
    method: "get",
});

export const Register = (data) => AuthRequest({
    url: "login",
    method: "post",
    data: data,
});

export const ForgotPassword = (data) => AuthRequest({
    url: "forgotpassword",
    method: "post",
    data: data,
});
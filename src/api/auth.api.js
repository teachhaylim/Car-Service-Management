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

/**
 * 
 * @param {Object} data -> @required userId, @required newPassword 
 * @returns 
 */
export const ChangePassword = (data) => AuthRequest({
    url: "changepassword",
    method: "post",
    data: data,
});
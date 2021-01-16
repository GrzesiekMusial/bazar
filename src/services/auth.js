import { apiClient as client } from "./client";
import jwtDecode, { InvalidTokenError } from "jwt-decode";

const endpoint = "/auth";

const login = (body) => client.post(endpoint, body);

const getUser = (token = localStorage.getItem("token")) => {
    try {
        const user = jwtDecode(token);
        return user;
    } catch (ex) {
        return null;
    }
};

const setToken = (token = localStorage.getItem("token")) => {
    client.setHeader("x-auth-token", token);
};

const logout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
};

export { login, getUser, setToken, logout };

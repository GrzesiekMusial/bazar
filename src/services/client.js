import { create } from "apisauce";

console.log(process.env, process.env.REACT_APP_API_URL);

const apiClient = create({
    baseURL: process.env.REACT_APP_API_URL,
});

apiClient.setHeader("x-auth-token", localStorage.getItem("token"));

export { apiClient };

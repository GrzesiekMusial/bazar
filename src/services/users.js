import { apiClient as client } from "./client";

const endpoint = "/users";

const get = () => client.get(endpoint);

const me = () => client.get(endpoint + "/me");

const add = (body) => client.post(endpoint, body);

const edit = (body) => client.put(endpoint, body);

const remove = (body) => client.put(endpoint, body);

export { get, add, edit, remove };

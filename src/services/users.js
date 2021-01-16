import { apiClient as client } from "./client";

const endpoint = "/users";

const get = async () => await client.get(endpoint);

const me = async () => await client.get(endpoint + "/me");

const add = async (body) => await client.post(endpoint, body);

const edit = async (body) => await client.put(endpoint, body);

const remove = async (body) => await client.put(endpoint, body);

export { get, add, edit, remove, me };

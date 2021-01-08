const endpoint = "/images";

const get = (body) => {
    return `http://192.168.56.1:3000${endpoint}/${body}`;
};

export { get };

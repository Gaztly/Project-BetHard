import API from "../database-api";

const loginUser = (username, password) => {
    return API.post("user/login", {
        username: username,
        password: password,
    }).catch((error) => {
        return error.response;
    });
};

export default loginUser;

import API from "../database-api";

const registerUser = (user) => {
    return API.post("user/registeruser", user).catch((error) => {
        return error.response;
    });
};

export default registerUser;

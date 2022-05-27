import API from "../database-api";

const validateUser = (user) => {
    return API.post("user/validate", user).catch((error) => {
        return error.response;
    });
};

export default validateUser;

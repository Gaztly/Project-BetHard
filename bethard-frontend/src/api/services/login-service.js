import axios from "axios";
import API from "../database-api";

const loginUser = (username, password) => {
    return API.post("user/login", { username: username, password: password });
};

export default loginUser;

import axios from "axios";
import API from "../database-api";

const registerUser = (user) => {
  return API.post("user/registeruser", user);
};

export default registerUser;

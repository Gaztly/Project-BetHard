import API from "../database-api";

const betsForUser = (username, password) => {
  return API.get("bet/getbetsforuser", {
      username: username,
        password: password,
    }).catch((error) => {
    return error.response;
  });
};

const loginUser = (username, password) => {
    return API.post("user/login", {
        username: username,
        password: password,
    }).catch((error) => {
        return error.response;
    });
};


export default { betsForUser };
import API from "../database-api";

const betsForUser = (user) => {
  return API.post("bet/getbetsforuser", 
      user).catch((error) => {
    return error.response;
  });
};




export default { betsForUser };
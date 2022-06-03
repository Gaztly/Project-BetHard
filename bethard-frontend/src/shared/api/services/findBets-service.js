import API from "../database-api";

const betsForUser = (user) => {
  return API.get("bet/getbetsforuser", 
      user).catch((error) => {
    return error.response;
  });
};




export default { betsForUser };
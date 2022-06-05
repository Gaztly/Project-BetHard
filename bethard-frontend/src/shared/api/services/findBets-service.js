import API from "../database-api";

const betsForUser = (user) => {
  return API.post("bet/getbetsforuser", 
      user).catch((error) => {
    return error.response;
  });
};

const GetMatchById = (id) => {
  return API.post("matches/getmatchesbyids", 
      {matchIds:id}).catch((error) => {
    return error.response;
  });
};



export default { betsForUser,GetMatchById };
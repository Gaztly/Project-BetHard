import API from "../database-api";

const findMatchById = (id) => {
  return API.get(`matches/${id}`).catch((error) => {
    return error.response;
  });
};

const findRelevantMatches = () => {
  return API.get("matches/getrelevantmatches").catch((error) => {
    return error.response;
  });
};

export default { findMatchById, findRelevantMatches };

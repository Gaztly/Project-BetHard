import API from "../../football-api";

const getMatchesPl = () => {
    return API.get("v4/PL/matches").catch((error) => {
        return error.response;
    });
};

export default getMatchesPl;

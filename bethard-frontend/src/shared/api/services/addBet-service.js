import API from "../database-api";

const addBetForUser = (user, bet) => {
    return API.post("bet", { userReturn: user, bet: bet }).catch((error) => {
        return error.response;
    });
};

export default { addBetForUser };

import API from "../database-api";

const removeBetForUser = (user, bet) => {
    return API.post("bet/deletebet", { userReturn: user, bet: bet }).catch(
        (error) => {
            return error.response;
        }
    );
};

export default { removeBetForUser };

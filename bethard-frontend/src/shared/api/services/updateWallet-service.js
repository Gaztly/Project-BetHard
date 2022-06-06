import API from "../database-api";

const updateWallet = (user) => {
    return API.post("wallet/updatewallet", user).catch((error) => {
        return error.response;
    });
};

export default updateWallet;

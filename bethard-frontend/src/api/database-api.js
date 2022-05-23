import axios from "axios";

const databaseAPI = axios.create({
    baseURL: process.env.REACT_APP_DATABASE_URL,
    headers: {
        //prettier-ignore
        "content-type": "application/json",
    },
});

export default databaseAPI;

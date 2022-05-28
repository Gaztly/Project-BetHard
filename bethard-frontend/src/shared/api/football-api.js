import axios from "axios";

const API = axios.create({
    baseURL: "https://api.football-data.org/v4/",
    headers: {
        //prettier-ignore
        "X-Auth-Token": process.env.REACT_APP_FOOTBALL_TOKEN,
    },
});

export default API;

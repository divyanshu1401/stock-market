import axios from "axios";
const TOKEN = "cmc2juhr01qpbvb525t0cmc2juhr01qpbvb525tg"
export default axios.create({
    baseURL: "https://finnhub.io/api/v1/",
    params: {
        token: TOKEN
    },
})
import axios from "axios";
const TOKEN = "gV8yko2fkWxwoy5_QrY8b2JWgbzj9lBq"
export default axios.create({
    baseURL: "https://api.polygon.io/v2/aggs/ticker/",
    params: {
        apiKey: TOKEN
    },
})
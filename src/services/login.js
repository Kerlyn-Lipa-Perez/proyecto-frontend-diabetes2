import axios from "axios";

const URI = "http://localhost:4000/api/login";

const login = async credentials => {
    const {data} = await axios.post(URI, credentials);
    return data;

};

export default {login};
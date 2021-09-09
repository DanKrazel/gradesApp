import axios from "axios"

export default axios.create({
    baseURL:"http://localhost:5000/api/v1/grades",
    headers:{
        "Content-type":"application/json"
    }
});
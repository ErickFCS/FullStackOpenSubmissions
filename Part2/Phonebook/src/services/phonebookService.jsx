import axios from "axios";

const fetchData = async () => {
    return axios
        .get("http://localhost:3001/persons")
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to fetch")
        })
}

const createData = async (newObj) => {
    return axios.post("http://localhost:3001/persons", newObj)
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to create")
        })
}

const updateData = async (newObj) => {
    return axios.put("http://localhost:3001/persons", newObj)
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to update")
        })
}

export default { fetchData, createData, updateData }
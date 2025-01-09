import axios from "axios";

const fetchData = async () => {
    return axios
        .get("http://localhost:3001/api/persons")
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to fetch")
        })
}

const createData = async (newObj) => {
    return axios
        .post("http://localhost:3001/api/persons", newObj)
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to create")
        })
}

const updateData = async (objId, newObj) => {
    return axios
        .put(`http://localhost:3001/api/persons/${objId}`, newObj)
        .then((res) => (res.data))
        .catch((err) => {
            console.error(err);
            return Promise.reject("Unable to update")
        })
}

const deleteData = async (objId) => {
    return axios
        .delete(`http://localhost:3001/api/persons/${objId}`)
        .then((res)=>(res.data))
        .catch((err)=>{
            console.error(err);
            return Promise.reject("Unable to delete")
        })
}

export default { fetchData, createData, updateData, deleteData };
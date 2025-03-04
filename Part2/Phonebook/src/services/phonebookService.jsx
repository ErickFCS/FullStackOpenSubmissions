import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL || ''

const fetchData = async () => {
    return axios
        .get(`${backendUrl}/api/persons`,)
        .then((res,) => (res.data),)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject('Unable to fetch',)
        },)
}

const createData = async (newObj,) => {
    return axios
        .post(`${backendUrl}/api/persons`, newObj,)
        .then((res,) => (res.data),)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject(err || 'Unable to create',)
        },)
}

const updateData = async (objId, newObj,) => {
    return axios
        .put(`${backendUrl}/api/persons/${objId}`, newObj,)
        .then((res,) => (res.data),)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject(err || 'Unable to update',)
        },)
}

const deleteData = async (objId,) => {
    return axios
        .delete(`${backendUrl}/api/persons/${objId}`,)
        .then((res,) => (res.data),)
        .catch((err,) => {
            console.error(err,)
            return Promise.reject('Unable to delete',)
        },)
}

export default { fetchData, createData, updateData, deleteData, }
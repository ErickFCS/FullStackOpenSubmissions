import axios from 'axios'

const baseUrl = '/anecdotes'

const fetchAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return Promise.reject("Unable to fetch all")
        })
}

export default { fetchAll }
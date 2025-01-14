import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blog, user) => {
  const request = await axios
    .post(baseUrl, blog, { headers: { 'Authorization': `Bearer ${user.token}` } })
    .catch((err) => {
      console.error(err)
      return "Unable to create blog"
    })
  return request.data
}

export default { getAll, createBlog }
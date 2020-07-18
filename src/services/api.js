import axios from 'axios'

const api = axios.create({
    baseURL:'http://blog-prz-rest.herokuapp.com'
})


export default api
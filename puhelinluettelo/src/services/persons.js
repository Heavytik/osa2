import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll =  () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => axios.post(baseUrl, newPerson)

const destroy = (id) => axios.delete(baseUrl + '/' + id)

const update = (id, updatedPerson) => {
    const fullUrl = baseUrl + '/' + id;
    return axios.put(fullUrl, updatedPerson)
}



export default { getAll, create, destroy, update }
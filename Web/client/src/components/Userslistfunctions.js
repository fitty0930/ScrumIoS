import axios from 'axios'
export const instance_axios = axios.create({ baseURL: 'http://localhost:5000/' })
export const getUsers = () => {
    return instance_axios.get(
            '/pendingUsers')
        .then(res => res.data)
        .catch(err => err)
}
export const deleteUser = (id) => {
    return instance_axios.post(
            '/pendingUsers/deleteUser', id
        )
        .then(res => res)
        .catch(err => err)
}
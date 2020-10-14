import axios from 'axios';
export const get_users = () => {
    return axios.get('/users/getUsers')
        .then(res => {
            return res.data
        })
        .catch(err => {
            return err
        })
}
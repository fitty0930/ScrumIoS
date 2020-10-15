import axios from 'axios'
const instance_axios = axios.create({ baseURL: 'http://localhost:5000' })
export const login = user => {
    return instance_axios.post(
        '/admins/login', {
            email: user.email,                          //hace peticiones a la base de datos por medio de axios
            password: user.password                     //captura la respuesta del servidor, esta se guarda y se rotorna
        } ).then(res => {   
                localStorage.setItem("session", res.data)
                return res.data
         }).catch(err => {
                return err = { err }
         })
} 
/* export const login=user=>{
    return axios.post(
        "/admins/login",{
            email:user.email,
            password:user.password
        }
    ).then(res => {
        localStorage.setItem("session", res.data)
        return res.data
    }).catch(err => {
        return err = { err }
    })
}
       */
    

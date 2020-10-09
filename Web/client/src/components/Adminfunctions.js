import axios from 'axios'


export const login=user=>{
    return axios.post(
        "/admins/login",{
            email:user.email,
            password:user.password
        }
    ).then(res=>{
        localStorage.setItem("session",res.data)
        return res.data
    }).catch(err=>{
        
        return  err= {err}
    })
}
      
    

import axios from 'axios'
import { message } from 'antd';

const SUCCESS='success';
const FAILED='FAILED'

let initState={
    username:'',
    userType:'',
    msg:'',
    remember:false,
    isAuth:false
}

export function user(state=initState,{type,payload}){
    switch(type){
        case SUCCESS:
            return {...initState,...payload}
        case FAILED:
            return {...initState,...payload}
        default:
            return state
    }
}

export function getUserInfo(){
    return dispatch=>{
        return axios.get('/user/userInfo')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:true,...res.user}
                })
                return true
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:FAILED,
                    payload:{isAuth:false}
                })
                return false
            }
        })
        .catch(err=>{
            message.error(err.message,1.5)
        })
    }
}

export function userLogin(data){
    return dispatch=>{
        axios.post('/user/userLogin',data)
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                message.success(res.msg,1.5);
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:true,...res.user}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:FAILED,
                    payload:{isAuth:false}
                })
            }
        })
        .catch(err=>{
            message.error(err.message,1.5)
        })
    }
}
export function userRegiset(data){
    return dispatch=>{
        axios.post('/user/userRegister',data)
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                message.success(res.msg,1.5);
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:true,...res.user}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:FAILED,
                    payload:{isAuth:false}
                })
            }
        })
        .catch(err=>{
            message.error(err.message,1.5)
        })
    }
    
}

export function userUpdate(data){
    return dispatch=>{
        axios.put('/user/userInfo',data)
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                message.success(res.msg,1.5);
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:true,...res.user}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:FAILED,
                    payload:{isAuth:false}
                })
            }
        })
        .catch(err=>{
            message.error(err.message,1.5)
        })
    }
    
}




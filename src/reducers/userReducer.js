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
        axios.post('/user/userInfo')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:true,...res.user}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:SUCCESS,
                    payload:{isAuth:false}
                })
            }
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
                    type:SUCCESS,
                    payload:{isAuth:false}
                })
            }
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
                    type:SUCCESS,
                    payload:{isAuth:false}
                })
            }
        })
    }
    
}




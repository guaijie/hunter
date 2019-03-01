import axios from 'axios'
import { message } from 'antd';

const REGISTER_SUCCESS='register_success';
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
        case REGISTER_SUCCESS:
            return {...initState,...payload}
        case FAILED:
            return {...initState,...payload}
        default:
            return state
    }
}

export function userLogin(){
    // return {type}
}
export function userRegiset(data){
    return dispatch=>{
        axios.post('/userLogin',data)
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                message.success(res.msg,1.5);
                dispatch({
                    type:REGISTER_SUCCESS,
                    payload:{isAuth:true,...res.use}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch({
                    type:REGISTER_SUCCESS,
                    payload:{isAuth:false}
                })
            }
        })
    }
    
}




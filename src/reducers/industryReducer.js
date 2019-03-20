import axios from 'axios'
import { message } from 'antd';

const SUCCESS='INDUSTRY_SUCCESS';
let initState={
    industries:[]
}

export function industry(state=initState,{type,payload}){
    switch(type){
        case SUCCESS:
            return {...initState,...payload}
        default:
            return state
    }
}

export function getIndustries(){
    return dispatch=>{
        axios.get('/industry/industries')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{industries:res.industries}
                })
            }else{
                message.error(res.msg,1.5);
                dispatch()
            }
        })
        .catch(err=>{
            message.error(err.message,1.5)
        })
    }
}


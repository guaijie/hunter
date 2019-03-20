import axios from 'axios'
import { message } from 'antd';

const SUCCESS='EDUCATION_SUCCESS';
let initState={
    educations:[]
}

export function education(state=initState,{type,payload}){
    switch(type){
        case SUCCESS:
            return {...initState,...payload}
        default:
            return state
    }
}

export function getEducations(){
    return dispatch=>{
        axios.get('/education/educations')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{educations:res.educations}
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


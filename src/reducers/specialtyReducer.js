import axios from 'axios'
import { message } from 'antd';

const SUCCESS='SPECIALTY_SUCCESS';
let initState={
    specialties:[]
}

export function specialty(state=initState,{type,payload}){
    switch(type){
        case SUCCESS:
            return {...initState,...payload}
        default:
            return state
    }
}

export function getSpecialties(){
    return dispatch=>{
        axios.get('/specialty/specialties')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{specialties:res.specialties}
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
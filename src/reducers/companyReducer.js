import axios from 'axios'
import { message } from 'antd';

const SUCCESS='COMPANY_SUCCESS';
let initState={
    companyTypes:[]
}

export function company(state=initState,{type,payload}){
    switch(type){
        case SUCCESS:
            return {...initState,...payload}
        default:
            return state
    }
}

export function getCompanyTypes(){
    return dispatch=>{
        axios.get('/company/companyTypes')
        .then(({data:res})=>{
            console.log(res)
            if(res.success){
                dispatch({
                    type:SUCCESS,
                    payload:{companyTypes:res.companyTypes}
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


import {createStore} from 'redux'

const ADD_MEMBER='add_member';
const REMOVE_MEMBER='remove_member'

export function memberReducer(state=0,{type}){
    console.log(type===ADD_MEMBER)
    switch(type){
        case ADD_MEMBER:
            return state+1;

        case REMOVE_MEMBER:
            return state-1;
        
        default:
            return 10;
    }
}

export function addMem(){
    return {type:ADD_MEMBER}
}
export function removeMem(){
    return {type:REMOVE_MEMBER}
}




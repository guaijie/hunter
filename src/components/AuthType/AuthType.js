import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthType extends React.Component{
    componentDidMount(){
        let paths=['/login','/signup','/bossinfo'];
        let pathname=this.props.location.pathname;
        let push=this.props.history.push;
        if(paths.includes(pathname)){
            return null
        }else{
            push('/bossinfo')
        }
        axios.get('/user')
        .then((res)=>{
            console.log(res)
        })
    }
    render(){
        return null
    }
    
}

export default AuthType





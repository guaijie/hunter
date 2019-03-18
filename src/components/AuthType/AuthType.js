import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '@/reducers/userReducer.js'

@withRouter
@connect(
    state=>state.user,
    {getUserInfo}
)
class AuthType extends React.Component{

    componentDidMount(){
        let paths=['/login','/signup'];
        let pathname=this.props.location.pathname;
        let {push}=this.props.history;
        if(paths.includes(pathname)){
            return null
        }else{
            this.props.getUserInfo()
            .then(v=>{
                if(!v) push('/login')
            })
        }

        console.log('didmount')
        
    }
    render(){
        return null
    }
    
}

export default AuthType





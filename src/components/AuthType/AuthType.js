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
        let push=this.props.history.push;
        if(paths.includes(pathname)){
            return null
        }else{
            console.log(12)
            this.props.getUserInfo();
        }
        
    }
    render(){
        return null
    }
    
}

export default AuthType





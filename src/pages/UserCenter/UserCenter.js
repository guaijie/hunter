import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Select} from 'antd'
import { connect } from 'react-redux'
import ExpertUser from '@/components/UserInfo/ExpertUser.js'
import BossUser from '@/components/UserInfo/BossUser.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
// import { getUserInfo } from '@/reducers/userReducer.js'
import './UserCenter.less';

@connect(
    state=>state.user,
    // {getUserInfo}
)
class UserCenter extends React.Component{
  
  render(){
    let {userType}=this.props;
    console.log(this.props)
    return (
      <div className="user-center">
        <EasyMenu
          className="menu"
          style={{"marginBottom":"20px"}}
          prefix={<Button type="primary" shape="circle" icon="arrow-left" />}
        >
          <h2 className="menu-title">用户中心</h2>
        </EasyMenu>
        {userType===1?<BossUser/>:<ExpertUser/>}
      </div>
    )
  }
    
}

export default UserCenter
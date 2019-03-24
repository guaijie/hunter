import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Select} from 'antd'
import { connect } from 'react-redux'
import ExpertInfo from '@/components/UserInfo/ExpertInfo.js'
import BossInfo from '@/components/UserInfo/BossInfo.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
// import { getUserInfo } from '@/reducers/userReducer.js'
import './UserCenter.less';

@connect(
    state=>state.user,
    // {getUserInfo}
)
class UserCenter extends React.Component{
  
  componentDidMount=()=>{
  }
  render(){
    let {userType,history:{goBack}}=this.props;
    console.log(this.props)
    return (
      <div className="user-center">
        <EasyMenu
          className="menu"
          style={{"marginBottom":"20px"}}
          prefix={<Button onClick={()=>{goBack()}} type="primary" shape="circle" icon="arrow-left" />}
        >
          <h2 className="menu-title">用户中心</h2>
        </EasyMenu>
        {userType===1?<BossInfo/>:<ExpertInfo/>}
      </div>
    )
  }
    
}

export default UserCenter
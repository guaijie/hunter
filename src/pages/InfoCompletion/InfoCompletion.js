import React from 'react'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Select} from 'antd'
import { connect } from 'react-redux'
import ExpertCompletion from '@/components/UserCompletion/ExpertCompletion.js'
import BossCompletion from '@/components/UserCompletion/BossCompletion.js'
import './InfoCompletion.less';

@connect(
  state=>state.user,
)
class UserCenter extends React.Component{
  render(){
    let {userType}=this.props;
    return (
      <div className="info-completion">
        {userType===1?<BossCompletion/>:<ExpertCompletion/>}
      </div>
    )
  }
    
}

export default UserCenter
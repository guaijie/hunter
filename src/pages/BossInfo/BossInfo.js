import React from 'react'
import { Form, Icon, Input, Button, Checkbox,} from 'antd'
import { NavLink} from 'react-router-dom'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import './BossInfo.less';

class BossInfo extends React.Component{

    state={
        a:0
    }
    getAvatar=(v)=>{
        console.log(v)
        this.setState({
            a:v
        })
    }

    render(){

        return (
            <div>
                <AvatarPick avatar={this.getAvatar}></AvatarPick>
            </div>
            
        )
    }
    
}

export default BossInfo

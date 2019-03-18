import React from 'react'
import { Switch, Route  } from 'react-router-dom'
import { Drawer, Icon, Avatar, Button, Badge, Menu} from 'antd'
import { connect } from 'react-redux'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import EasyDrawer from '@/components/EasyDrawer/EasyDrawer.js'
import './Home.less'

import HomeAsset from '@/components/HomeAsset/HomeAsset.js';

let routes=[
  {path:'/home',exact:true,component:HomeAsset},
  
]
@connect(
  state=>state.user,
)
class Home extends React.Component{
    componentDidMount=()=>{
      console.log(this.props)
    }
    state={
      visible:true,
      msgCount:1,
      selectedKey:'home',
      title:'首页'
    }
    openDrawer=()=>{
      this.setState({
        visible:true
      })
    }
    closeDrawer=()=>{
      this.setState({
        visible: false,
      });
    }
    pushPath=({key,item,domEvent:e})=>{
      let {history:{push},match:{path}}=this.props
      let {title,pathname}=e.target.dataset;
      // console.log(path)
      this.setState({
        title:title,
        selectedKey:key
      });
      push(path+'/'+pathname)
    }

    render(){
      let {visible,msgCount,selectedKey,title}=this.state;
      let {username,match:{url}}=this.props;
      return (
        <div className="home">
          {/* <Route key="header" path="home"> */}
            <EasyMenu
              className="menu"
              prefix={
                <div style={{display:'inline-block'}} onClick={this.openDrawer}>
                  <Avatar 
                    size="small" 
                    alt="avatar" 
                    src="http://placehold.it/60x60" 
                  />
                </div>
              }
            >
              <h2 className="menu-title">{title}</h2>
            </EasyMenu>
          {/* </Route> */}
          {/* <Route key="drawer" path="home"> */}
            <EasyDrawer
              visible={visible}
              selectedKey={selectedKey}
              msgCount={msgCount}
              username={username}
              pushPath={this.pushPath}
              onClose={this.closeDrawer}
            ></EasyDrawer>
          {/* </Route> */}
          <Switch>
            {routes.map((route,i)=>(
              <Route {...route} key={i}></Route>
            ))}
          </Switch>
        </div>
      )
    }
}

export default Home
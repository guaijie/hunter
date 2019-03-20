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
let menuItems=[
  {
    title:'首页',
    icon:'home',
    pathname:'',
    type:[0,1]
  },
  {
    title:'我的投递',
    icon:'user',
    pathname:'jobs',
    type:[0]
  },
  {
    title:'职位管理',
    icon:'user',
    pathname:'jobs',
    type:[1]
  },
  {
    title:'我的面试',//面试
    icon:'message',
    pathname:'interviews',
    type:[0]
  },
  {
    title:'面试管理',//面试人才
    icon:'message',
    pathname:'interviews',
    type:[1]
  },
  {
    title:'投递反馈',//面试/拒绝
    icon:'user',
    pathname:'feedbacks',
    type:[0]
  },
  {
    title:'面试反馈',//人才面试反馈
    icon:'user',
    pathname:'feedbacks',
    type:[1]
  },
  {
    title:'Boss列表',//all
    icon:'user',
    pathname:'all',
    type:[0]
  },
  {
    title:'牛人列表',//all
    icon:'user',
    pathname:'all',
    type:[1]
  },
  {
    title:'我的消息',//牛人/Boss
    icon:'message',
    pathname:'messages',
    type:[0,1]
  },
  {
    title:'求职攻略',
    icon:'message',
    pathname:'strategies',
    type:[0]
  },
  {
    title:'招聘攻略',
    icon:'message',
    pathname:'strategies',
    type:[1]
  },
  {
    title:'名企招聘',
    icon:'message',
    pathname:'recruit',
    type:[0]
  },
  {
    title:'牛人招聘',
    icon:'message',
    pathname:'recruit',
    type:[1]
  },
  {
    title:'职位搜索',
    icon:'search',
    pathname:'search',
    type:[0]
  },
  {
    title:'牛人搜索',
    icon:'search',
    pathname:'search',
    type:[1]
  },
  {
    title:'我的收藏',//牛人
    icon:'message',
    pathname:'collections',
    type:[0]
  },
  {
    title:'我的关注',//Boss
    icon:'message',
    pathname:'collections',
    type:[1]
  }
];
@connect(
  state=>state.user,
)
class Home extends React.Component{
    state={
      visible:false,
      msgCount:1,
      selectedKey:'',
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
      let {pathname}=e.target.dataset;
      this.setState({
        selectedKey:key
      });
      push(path+'/'+pathname)
    }
    render(){
      let {visible,msgCount,selectedKey}=this.state;
      let {username,location:{pathname},userType}=this.props;
      let item=menuItems.find(v=>{
        let child=pathname.split('/')[2]
        if(v.pathname===child&&v.type.includes(userType)){
          return true
        }
      });
      console.log(item)
      return (
        <div className="home">
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
            <h2 className="menu-title">{selectedKey?selectedKey:(item?item.title:'首页')}</h2>
          </EasyMenu>
          <EasyDrawer
            visible={visible}
            selectedKey={selectedKey?selectedKey:(item?item.title:'首页')}
            msgCount={msgCount}
            username={username}
            pushPath={this.pushPath}
            onClose={this.closeDrawer}
            changeTitle={this.changeTitle}
            menuItems={menuItems}
          ></EasyDrawer>
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
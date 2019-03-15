import React from 'react'
import { Switch, Route  } from 'react-router-dom'
import { Drawer, Icon, Avatar, Button, Badge, Menu} from 'antd'
import { connect } from 'react-redux'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'

import './Home.less'

let menuItems=[
  {
    title:'首页',
    key:'home',
    icon:'home',
    path:'home',
    display:'block'
  },
  {
    title:'我的投递',
    key:'jobs-1',
    icon:'user',
    path:'jobs',
    display:'block'
  },
  {
    title:'职位管理',
    key:'jobs-2',
    icon:'user',
    path:'jobs',
    display:'none'
  },
  {
    title:'我的面试',//面试
    key:'interviews-1',
    icon:'message',
    path:'interviews',
    display:'block'
  },
  {
    title:'面试管理',//面试人才
    key:'interviews-2',
    icon:'message',
    path:'interviews',
    display:'none'
  },
  {
    title:'投递反馈',//面试/拒绝
    key:'feedbacks-1',
    icon:'user',
    path:'feedbacks',
    display:'block'
  },
  {
    title:'面试反馈',//人才面试反馈
    key:'feedback-2',
    icon:'user',
    path:'feedbacks',
    display:'none'
  },
  {
    title:'Boss列表',//all
    key:'all-1',
    icon:'user',
    path:'all',
    display:'block'
  },
  {
    title:'牛人列表',//all
    key:'all-2',
    icon:'user',
    path:'all',
    display:'none'
  },
  {
    title:'我的消息',//牛人/Boss
    key:'messages',
    icon:'message',
    path:'messages',
    display:'block'
  },
  {
    title:'求职攻略',
    key:'strategies-1',
    icon:'message',
    path:'strategies',
    display:'block'
  },
  {
    title:'招聘攻略',
    key:'strategies-2',
    icon:'message',
    path:'strategies',
    display:'none'
  },
  {
    title:'名企招聘',
    key:'recruit-1',
    icon:'message',
    path:'recruit',
    display:'block'
  },
  {
    title:'牛人招聘',
    key:'recruit-2',
    icon:'message',
    path:'recruit',
    display:'none'
  },
  {
    title:'职位搜索',
    key:'search-1',
    icon:'search',
    path:'search',
    display:'block'
  },
  {
    title:'牛人搜索',
    key:'search-2',
    icon:'search',
    path:'search',
    display:'none'
  },
  {
    title:'我的收藏',//牛人
    key:'collections-1',
    icon:'message',
    path:'collections',
    display:'block'
  },
  {
    title:'我的关注',//Boss
    key:'collections-2',
    icon:'message',
    path:'collections',
    display:'none'
  }
];

@connect(
  state=>state.user,
)
class Home extends React.Component{
    state={
      visible:true,
      msgCount:1,
      menuItem:'home',
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
      let {title,path}=e.target.dataset;
      this.setState({
        title:title,
        path:path,
        menuItem:key
      })
    }

    render(){
      let {visible,msgCount,menuItem,title}=this.state;
      let {username}=this.props
      return (
        <div className="home">
          <Route key="header" path="home">
            <EasyMenu
              className="menu"
              prefix={
                <Avatar 
                  size="small" 
                  alt="avatar" 
                  src="http://placehold.it/60x60" 
                />
              }
            >
              <h2 className="menu-title">{title}</h2>
            </EasyMenu>
          </Route>
          <Route key="drawer" path="home">
            <Drawer
              className="home-drawer"
              title={
                <div className="drawer-title">
                  <Badge
                    dot={true}
                    offset={[-5,5]}
                    className="badge"
                  >
                    <Avatar 
                      size="large" 
                      alt="avatar" 
                      src="http://placehold.it/60x60" 
                    />
                  </Badge>
                  <div>
                    <span>{username}</span>
                  </div>
                </div>
              }
              width="70vw"
              closable={false}
              placement="left"
              onClose={this.closeDrawer}
              visible={visible}
              style={{
                height:'100vh',
              }}
            >
              <Menu
                mode="inline"
                onClick={this.pushPath}
                selectedKeys={[menuItem]}
              >
                {
                  menuItems.map(v=>{
                    return (
                      <Menu.Item data-title={v.title} data-path={v.path} style={{'display':v.display}} key={v.key}>
                        <Icon style={{'marginRight':'20px'}} type={v.icon} />
                        {v.title}
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            </Drawer>
          </Route>
        </div>
      )
    }
}

export default Home
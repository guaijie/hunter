import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Drawer, Icon, Avatar, Button, Badge, Menu} from 'antd'
import './EasyDrawer.less';

let menuItems=[
  {
    title:'首页',
    key:'home',
    icon:'home',
    pathname:'',
    display:'block'
  },
  {
    title:'我的投递',
    key:'jobs-1',
    icon:'user',
    pathname:'jobs',
    display:'block'
  },
  {
    title:'职位管理',
    key:'jobs-2',
    icon:'user',
    pathname:'jobs',
    display:'none'
  },
  {
    title:'我的面试',//面试
    key:'interviews-1',
    icon:'message',
    pathname:'interviews',
    display:'block'
  },
  {
    title:'面试管理',//面试人才
    key:'interviews-2',
    icon:'message',
    pathname:'interviews',
    display:'none'
  },
  {
    title:'投递反馈',//面试/拒绝
    key:'feedbacks-1',
    icon:'user',
    pathname:'feedbacks',
    display:'block'
  },
  {
    title:'面试反馈',//人才面试反馈
    key:'feedback-2',
    icon:'user',
    pathname:'feedbacks',
    display:'none'
  },
  {
    title:'Boss列表',//all
    key:'all-1',
    icon:'user',
    pathname:'all',
    display:'block'
  },
  {
    title:'牛人列表',//all
    key:'all-2',
    icon:'user',
    pathname:'all',
    display:'none'
  },
  {
    title:'我的消息',//牛人/Boss
    key:'messages',
    icon:'message',
    pathname:'messages',
    display:'block'
  },
  {
    title:'求职攻略',
    key:'strategies-1',
    icon:'message',
    pathname:'strategies',
    display:'block'
  },
  {
    title:'招聘攻略',
    key:'strategies-2',
    icon:'message',
    pathname:'strategies',
    display:'none'
  },
  {
    title:'名企招聘',
    key:'recruit-1',
    icon:'message',
    pathname:'recruit',
    display:'block'
  },
  {
    title:'牛人招聘',
    key:'recruit-2',
    icon:'message',
    pathname:'recruit',
    display:'none'
  },
  {
    title:'职位搜索',
    key:'search-1',
    icon:'search',
    pathname:'search',
    display:'block'
  },
  {
    title:'牛人搜索',
    key:'search-2',
    icon:'search',
    pathname:'search',
    display:'none'
  },
  {
    title:'我的收藏',//牛人
    key:'collections-1',
    icon:'message',
    pathname:'collections',
    display:'block'
  },
  {
    title:'我的关注',//Boss
    key:'collections-2',
    icon:'message',
    pathname:'collections',
    display:'none'
  }
];

@connect(
  state=>state.user,
)
@withRouter
class EasyDrawer extends React.Component {
  render() {
  let {
      visible,
      onClose,
      pushPath,
      username,
      selectedKey,
      history:{push}
    }=this.props;
    return (
      <Drawer
        className="home-drawer"
        title={
          <div className="drawer-title">
            <Badge
              dot={true}
              offset={[-5, 5]}
              className="badge"
              onClick={() => { push('/usercenter') }}
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
        onClose={onClose}
        visible={visible}
        style={{
          height: '100vh',
        }}
      >
        <Menu
          mode="inline"
          onClick={pushPath}
          selectedKeys={[selectedKey]}
          defaultSelectedKeys={[selectedKey]}
        >
          {
            menuItems.map(v => {
              return (
                <Menu.Item data-title={v.title} data-pathname={v.pathname} style={{ 'display': v.display }} key={v.key}>
                  <Icon style={{ 'marginRight': '20px' }} type={v.icon} />
                  {v.title}
                </Menu.Item>
              )
            })
          }
        </Menu>
      </Drawer>
    )
  }

}

export default EasyDrawer
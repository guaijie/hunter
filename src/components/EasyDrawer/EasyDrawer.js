import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Drawer, Icon, Avatar, Button, Badge, Menu} from 'antd'
import './EasyDrawer.less';



@connect(
  state=>state.user,
)
@withRouter
class EasyDrawer extends React.Component {
  componentDidMount=()=>{
    
  }
  render() {
    let {
      userType,
      visible,
      onClose,
      pushPath,
      username,
      selectedKey,
      menuItems,
      history:{push}
    }=this.props;
    console.log(userType)
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
        >
          {
            menuItems.map(v => {
              return (
                <Menu.Item data-pathname={v.pathname} style={{ 'display': v.type.includes(userType)?'block':'none' }} key={v.title}>
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
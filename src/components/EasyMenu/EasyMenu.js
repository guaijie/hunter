import React from 'react'
import { Row, Col, Carousel, Avatar, Modal, Icon, Input, Button, Checkbox, } from 'antd'
import { NavLink } from 'react-router-dom'
import './EasyMenu.less';

class EasyMenu extends React.Component {

  state = {
    visible:false,
  }

  render() {
    let prefix=this.props.prefix;
    let suffix=this.props.suffix;
    let title=this.props.title;
    return (
      <div className="Easy-menu">
        <Row type="flex" align="middle">
          <Col span={6}>
            {prefix}
          </Col>
          <Col span={12}>
            {this.props.children}
            {title}
          </Col>
          <Col span={6}>
            {suffix}
          </Col>
        </Row>
      </div>
    )
  }

}

export default EasyMenu
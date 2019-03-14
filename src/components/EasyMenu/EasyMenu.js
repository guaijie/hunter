import React from 'react'
import { Row, Col, Carousel, Avatar, Modal, Icon, Input, Button, Checkbox, } from 'antd'
import { NavLink } from 'react-router-dom'
import './EasyMenu.less';

class EasyMenu extends React.Component {

  state = {
    visible:false,
  }

  render() {
    let {prefix,suffix,title,className}=this.props;
    return (
      <div className={`Easy-menu ${className}`}>
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
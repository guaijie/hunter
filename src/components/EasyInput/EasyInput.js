import React from 'react'
import { Row, Col,} from 'antd'
import './EasyInput.less';


class EasyInput extends React.Component {

  render() {
    let {title,suffix,children,className}=this.props;
    return (
      <Row justify="space-around" type="flex" align="middle" className={`easy-input ${className}`} >
        <Col span={6}>
          {title}
        </Col>
        <Col span={14}>
          {children}
        </Col>
        <Col span={2}>
          {suffix}
        </Col>  
      </Row>
    )
  }

}

export default EasyInput
import React from 'react'
import { Form, Icon, Input, Button, Select, Row, Col} from 'antd'
import { NavLink } from 'react-router-dom'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import EasyTextarea from '@/components/EasyTextarea/EasyTextarea.js'
import './BossInfo.less';
import {normalizeInput} from '@/util.js';


class BossInfo extends React.Component {
  textareaSize=3000
  state={
    avatar:'male',
    isOpen:true,
    description:'',
    textareaSize:this.textareaSize
  }
  getAvatar=(v)=>{
    this.setState({
      avatar: v
    })
  }
  handleSubmit=(e)=>{
    var { validateFields } = this.props.form;
    validateFields((errors, values) => {
      if (!errors) {
        console.log(values)
      }
    });
  }
  openEasyTextarea=()=>{
    this.setState({
      isOpen:false,
    })
  }
  save=(value)=>{
    this.props.form.setFieldsValue({description:value})
    this.setState({
      isOpen:true,
      description:value
    })
  }
  back=()=>{
    this.setState({
      isOpen:true,
    })
  }
  change=(e)=>{
    let len=e.target.value.length;
    this.setState({
      textareaSize:this.textareaSize-len
    })
  }
  render() {
    let {isOpen,description,avatar,textareaSize}=this.state;
    let normalize=normalizeInput(20);
    let rules=[
      { required: true, message: '必填项不能为空!' },
    ]

    let prefix = <Button type="primary" shape="circle" icon="arrow-left" />;
    let {getFieldDecorator}=this.props.form;
    let Option=Select.Option;
    let TextArea=Input.TextArea;
    let companyTypes=[
      {value:1,label:'民营企业'},
      {value:2,label:'国有企业'},
      {value:3,label:'上市企业'}
    ];
    let industryTypes=[
      {value:1,label:'计算机与互联网'},
      {value:2,label:'化学化工'}
    ];
    return (
      <div className="Boss-info">
        <div style={{display:isOpen?'block':'none'}}>
          <EasyMenu
            prefix={prefix}
          >
            <h2 className="menu-title">完善信息</h2>
          </EasyMenu>
          <div className="avatar-container">
            <AvatarPick avatar={this.getAvatar}></AvatarPick>
          </div>
          <Form className="form">
            <Form.Item>
              {getFieldDecorator(
                'avatar',{initialValue:avatar}
              )(<Input hidden />)
              }
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('company',{rules,normalize})(
                <Input
                  prefix={
                    <Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入企业名称"
                />
              )}
            </Form.Item>
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('realname', {rules,normalize})(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                      }
                      placeholder="请输入法定代表"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('phone', {rules,normalize:normalizeInput(11)})(
                    <Input
                      prefix={
                        <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
                      }
                      placeholder="请输入联系电话"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              {getFieldDecorator('companyTypes', {rules})(
                <Select
                  tokenSeparators={[',',' ']}
                  mode="multiple"
                  showSearch={true}
                  maxTagCount={2}
                  placeholder="请输入企业类型"
                >
                  {companyTypes.map(d => <Option key={d.value}>{d.label}</Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('industryTypes',{rules})(
                <Select
                  tokenSeparators={[',',' ']}
                  mode="multiple"
                  showSearch={true}
                  options={industryTypes}
                  maxTagCount={2}
                  placeholder="请输入行业类型"
                >
                  {industryTypes.map(d => <Option key={d.value}>{d.label}</Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('description',{
                rules,
                initialValue:description,
                normalize:normalizeInput(3000)
              })(
                <Input
                  style={{
                    'overflow':'hidden',
                    'whiteSpace':'nowrap',
                    'textOverflow':'ellipsis'
                  }}
                  onFocus={
                    this.openEasyTextarea
                  }
                  className="text-area"
                  placeholder="请输入企业简介"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button block type="primary" onClick={this.handleSubmit} >
                submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{display:isOpen?'none':'block'}}>
          <EasyTextarea 
            title="企业简介"
            placeholder="请输入企业简介"
            change={this.change}
            save={this.save}
            back={this.back}
            decorator={{
              initialValue:description,
              normalize:normalizeInput(3000),
              rules
            }}
            extra={<div className="extra">{textareaSize}</div>}
          >
            
          </EasyTextarea>
        </div>
      </div>
    )
  }

}

BossInfo=Form.create({ name: 'bossinfo' })(BossInfo);
export default BossInfo

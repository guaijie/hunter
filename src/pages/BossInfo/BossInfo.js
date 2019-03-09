import React from 'react'
import { Form, Icon, Input, Button, Select} from 'antd'
import { NavLink } from 'react-router-dom'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import EasyTextarea from '@/components/EasyTextarea/EasyTextarea.js'
import './BossInfo.less';
import {normalizeInput} from '@/util.js';


class BossInfo extends React.Component {

  state={
    avatar:'male',
    isOpen:true,
    description:'',
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
  handleField=(value)=>{
    this.setState({
      isOpen:true,
      description:value
    })
  }
  render() {
    let {isOpen,description,avatar}=this.state;
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
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入企业名称"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('realname', {rules,normalize})(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="请输入法定代表"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('companyTypes', {rules})(
                <Select
                  tokenSeparators={[',',' ']}
                  mode="multiple"
                  showSearch={true}
                  maxTagCount={2}
                  defaultActiveFirstOption={false}
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
                  defaultActiveFirstOption={false}
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
                    'white-space':'nowrap',
                    'text-overflow':'ellipsis'
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
            normalize={normalizeInput(3000)} 
            onHandelField={this.handleField}
            rules={rules}
          >
            
          </EasyTextarea>
        </div>
      </div>
    )
  }

}

BossInfo=Form.create({ name: 'bossinfo' })(BossInfo);
export default BossInfo

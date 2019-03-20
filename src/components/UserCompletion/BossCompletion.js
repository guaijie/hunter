import React from 'react'
import { Form, Icon, Input, Button, Select, Row, Col} from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import EasyTextarea from '@/components/EasyTextarea/EasyTextarea.js'
import './UserCompletion.less';
import {normalizeInput} from '@/util.js';
import { userUpdate } from '@/reducers/userReducer.js'
import {getCompanyTypes} from '@/reducers/companyReducer.js'
import {getIndustries} from '@/reducers/industryReducer.js'

let textareaSize=3000
@connect(
  state=>({...state.company,...state.industry}),
  {userUpdate,getCompanyTypes,getIndustries}
)
@withRouter
class BossCompletion extends React.Component {
  componentDidMount=()=>{
    let {companyTypes,industries}=this.props;
    if(companyTypes.length!==0&&industries!==0) return 
    this.props.getCompanyTypes();
    this.props.getIndustries();
  }
  state={
    avatar:'male',
    isOpen:true,
    description:'',
    textareaSize:textareaSize
  }
  getAvatar=(v)=>{
    this.setState({
      avatar: v
    })
  }
  handleSubmit=(e)=>{
    var { form:{validateFields},history:{push} } = this.props;
    validateFields((errors, values) => {
      if (!errors) {
        this.props.userUpdate(values)
        .then((v)=>{
          if(v) push('/home')
        })
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
      textareaSize:textareaSize-len
    })
  }
  render() {
    let {isOpen,description,avatar,textareaSize}=this.state;
    let normalize=normalizeInput(20);
    let rules=[
      { required: true, message: '必填项不能为空!' },
    ]

    let prefix = <Button type="primary" shape="circle" icon="arrow-left" />;
    let {form:{getFieldDecorator},companyTypes,industries}=this.props;
    let Option=Select.Option;
    let TextArea=Input.TextArea;
    companyTypes=companyTypes.map(v=>{
      return {
        value:v._id,
        label:v.name
      }
    })
    industries=industries.map(v=>{
      return {
        value:v._id,
        label:v.name
      }
    })
    return (
      <div className="user-completion">
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
              {getFieldDecorator('industries',{rules})(
                <Select
                  tokenSeparators={[',',' ']}
                  mode="multiple"
                  showSearch={true}
                  maxTagCount={2}
                  placeholder="请输入行业类型"
                >
                  {industries.map(d => <Option key={d.value}>{d.label}</Option>)}
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

BossCompletion=Form.create({ name: 'usercompletion' })(BossCompletion);
export default BossCompletion

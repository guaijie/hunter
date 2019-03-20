import React from 'react'
import { Form, Icon, Input, Button, Select, Row, Col, DatePicker} from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import EasyTextarea from '@/components/EasyTextarea/EasyTextarea.js'
import './UserCompletion.less';
import {normalizeInput} from '@/util.js';
import { userUpdate } from '@/reducers/userReducer.js'
import {getEducations} from '@/reducers/educationReducer.js'
import {getSpecialties} from '@/reducers/specialtyReducer.js'

let textareaSize=3000;

@connect(
  state=>({...state.education,...state.specialty}),
  {userUpdate,getEducations,getSpecialties}
)
@withRouter
class ExpertCompletion extends React.Component {
  componentDidMount=()=>{
    let {educations,specialties}=this.props;
    if(educations.length!==0&&specialties!==0) return 
    this.props.getEducations();
    this.props.getSpecialties();
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
    let {form:{getFieldDecorator},educations,specialties}=this.props;
    let Option=Select.Option;
    let TextArea=Input.TextArea;
    educations=educations.map(v=>{
      return {
        value:v._id,
        label:v.name
      }
    })
    specialties=specialties.map(v=>{
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
            <Form.Item className="form-item">
              {getFieldDecorator(
                'avatar',{initialValue:avatar}
              )(<Input hidden />)
              }
            </Form.Item>
            <Form.Item className="form-item">
              {getFieldDecorator('realname',{rules,normalize})(
                <Input
                  prefix={
                    <Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="真实姓名"
                />
              )}
            </Form.Item>
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item className="form-item">
                  {getFieldDecorator('birthday',{rules})(
                    <DatePicker
                      style="width:100%"
                      placeholder="出生年月"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="form-item">
                  {getFieldDecorator('phone',{rules,normalize:normalizeInput(11)})(
                    <Input
                      prefix={
                        <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
                      }
                      placeholder="联系电话"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item className="form-item">
                  {getFieldDecorator('school',{rules,normalize})(
                    <Input
                      prefix={
                        <Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />
                      }
                      placeholder="毕业学校"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item className="form-item">
                  {getFieldDecorator('education',{rules})(
                    <Select
                      showSearch={true}
                      placeholder="最高学历"
                    >
                      {educations.map(d => <Option key={d.value}>{d.label}</Option>)}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item className="form-item">
              {getFieldDecorator('specialties',{rules})(
                <Select
                  tokenSeparators={[',',' ']}
                  mode="multiple"
                  showSearch={true}
                  options={specialties}
                  maxTagCount={2}
                  placeholder="所学专业"
                >
                  {specialties.map(d => <Option key={d.value}>{d.label}</Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item className="form-item">
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
                  placeholder="个人简介"
                />
              )}
            </Form.Item>
            <Form.Item className="form-item">
              <Button block type="primary" onClick={this.handleSubmit} >
                submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{display:isOpen?'none':'block'}}>
          <EasyTextarea 
            title="个人简介"
            placeholder="请输入个人简介"
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

ExpertCompletion=Form.create({ name: 'usercompletion' })(ExpertCompletion);
export default ExpertCompletion

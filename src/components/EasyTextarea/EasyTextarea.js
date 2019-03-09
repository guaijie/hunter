import React from 'react'
import { Row, Col, Form, Message, Modal, Icon, Input, Button, Checkbox, } from 'antd'
import { NavLink } from 'react-router-dom'
import EasyMenu from '@/components/EasyMenu/EasyMenu.js'
import './EasyTextarea.less';

Message.config({
  top: 10,
  duration:0.5,
  maxCount: 1,
});

class EasyTextarea extends React.Component {

  handleField=this.props.onHandelField
  handleSubmit=(e)=>{
    let { validateFields } = this.props.form;
    validateFields({first:true},(errors, values) => {
      console.log(values)
      if (errors) {
        Message.open({
          content:errors.field.errors[0].message,
          icon:<Icon type="save"/>
        });
      }else{
        this.handleField(values.field)
      }
    });
  }
  cancelSubmit=()=>{
    this.handleField('')
  }
  render() {
    let extra=this.props.extra;
    let {getFieldDecorator,getFieldError,validateFields}=this.props.form;
    let {normalize,rules}=this.props;
    let TextArea=Input.TextArea;
    let title=this.props.title;
    return (
      <div className="Easy-textarea">
        <EasyMenu
          prefix={<Button onClick={this.cancelSubmit} type="primary" shape="circle" icon="arrow-left" />}
          suffix={
            <div className="save">
              <Button onClick={this.handleSubmit} type="primary" shape="circle" icon="save" />
            </div>
          }
        >
          <h2 className="menu-title">{title}</h2>
        </EasyMenu>
        <Form className="form">
          <Form.Item
            help={false}
            extra={extra}
          >
            {getFieldDecorator(
              'field',{
                rules,
                validateTrigger:'onSubmit',
                normalize
              }
            )(
              <TextArea autosize={true} className="textarea"></TextArea>
            )
            } 
            {/* <TextArea name="textarea" className="textarea"></TextArea> */}
          </Form.Item>
        </Form>
      </div>
    )
  }

}

EasyTextarea=Form.create({ name: 'easy-textarea' })(EasyTextarea);
export default EasyTextarea
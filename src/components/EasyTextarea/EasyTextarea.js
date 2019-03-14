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

  cancelSubmit=()=>{
    this.handleField('')
  }
  render() {
    let {extra,decorator,placehold,title,save,change,back}=this.props
    let {getFieldDecorator,getFieldError,validateFields}=this.props.form;
    let TextArea=Input.TextArea;
    let handleSave=(e)=>{
      let { validateFields } = this.props.form;
      validateFields({first:true},(errors, values) => {
        console.log(values)
        if (errors) {
          Message.open({
            content:errors.field.errors[0].message,
            icon:<Icon type="save"/>
          });
        }else{
          save(values.field)
        }
      });
    }
    return (
      <div className="Easy-textarea">
        <EasyMenu
          prefix={<Button onClick={back} type="primary" shape="circle" icon="arrow-left" />}
          suffix={
            <div className="save">
              <Button onClick={handleSave} type="primary" shape="circle" icon="save" />
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
            {
              getFieldDecorator(
              'field',decorator
              )(
                <TextArea onChange={change} autosize={true} className="textarea"></TextArea>
              )
            } 
          </Form.Item>
        </Form>
      </div>
    )
  }

}

EasyTextarea=Form.create({ name: 'easy-textarea' })(EasyTextarea);
export default EasyTextarea
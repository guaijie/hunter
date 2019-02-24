import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import './SignUp.less';
import logo from '@/logo.svg'

class SignUp extends React.Component {

    handleSubmit(e) {
        console.log(e)
    }

    handleChange(e){
        console.log(e)
    }

    render() {
        const Option = Select.Option;

        let { getFieldDecorator }=this.props.form;
        let usernameField={
            rules: [
                { required: true, message: 'Please input your username!' },
            ]
        };
        let passwordField={
            rules: [
                { required: true, message: 'Please input your password!' },
            ]
        };
        let userTypeField={
            rules: [
                
            ],
            initialValue:'lucy'
        }
        return (
            <div className="Sign">
                <div className="Sign-logo">
                    <img width="100%" height="100%" src={logo} alt="picture" />
                </div>
                <Form onSubmit={this.handleSubmit} className="Sign-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            ...usernameField
                        })(
                            <Input
                                prefix={
                                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            ...passwordField
                        })(
                            <Input
                                prefix={
                                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('userType', {
                            ...userTypeField
                        })(
                            <Select onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled" disabled>Disabled</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                    )}
                    </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="button">
                        Sign Up
                        </Button>
                </Form.Item> 
                </Form>

            <div className="Sign-login">
                Have an account?
                    <NavLink to="/login">login now!</NavLink>
            </div>
                
            </div >
            
        )
    }

}

SignUp = Form.create({ name: 'sign' })(SignUp);
export default SignUp

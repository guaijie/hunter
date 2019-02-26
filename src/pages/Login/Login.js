import React from 'react'
import { Form, Icon, Input, Button, Checkbox,} from 'antd'
import { NavLink} from 'react-router-dom'
import Logo from '@/components/Logo/Logo.js'

import './Login.less';
import logo from '@/logo.svg'

class Login extends React.Component{

    handleSubmit(e){
        console.log(e)
    }
    
    render(){
        let {getFieldDecorator}=this.props.form;
        let usernameField={
            rules:[
                { required: true, message: 'Please input your username!' },
            ]
        };
        let passwordField={
            rules:[
                { required: true, message: 'Please input your password!' },
            ]
        };
        let phoneField={
            rules:[
                { required: true, message: 'Please input your phone!' },
            ]
        };
        return (
            <div className="Login">
                <Logo/>
                <Form onSubmit={this.handleSubmit} className="Login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            ...usernameField
                        })(
                            <Input 
                                prefix={
                                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                                } 
                                placeholder="Username or phone" 
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
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                    </Form.Item> 
                    <Form.Item>
                        <Button block type="primary" htmlType="button">
                            Log in
                        </Button>
                    </Form.Item> 
                    <a>Forgot password</a>
                </Form>
                            
                <div className="Login-sign">
                    Don't have an account?
                    <NavLink to="/signup">Sign now!</NavLink>
                </div>
                
            </div>
            
        )
    }
    
}

Login=Form.create({ name: 'sign' })(Login);
export default Login

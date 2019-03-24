import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select} from 'antd'
import { NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '@/components/Logo/Logo.js'
import {normalizeInput} from '@/util.js'
import './Login.less';
import { userLogin } from '@/reducers/userReducer.js'
import { debounce } from 'lodash'

let paths=['expertinfo','bossinfo'];
@connect(
    state=>state.user,
    {userLogin}
)
class Login extends React.Component{
    componentDidUpdate(){
        let {isAuth,history:{push}}=this.props;
        if(isAuth){
            push('/home')
        }
        return 
    }

    handleSubmit = e => {
        e.preventDefault();
        var { validateFields } = this.props.form;
        validateFields((errors, values) => {
            if (!errors) {
                console.log(values);
                this.props.userLogin(values);
            }
        });
    }
    
    render(){
        let {getFieldDecorator}=this.props.form;
        let normalize=normalizeInput(20)
        let usernameField={
            normalize:normalize,
            validateFirst:true,
            rules:[
                { required: true, message: 'Please input your username!' },
            ]
        };
        let passwordField={
            normalize:normalize,
            validateFirst:true,
            rules:[
                { required: true, message: 'Please input your password!' },
            ]
        };
        let Option=Select.Option;
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
                        {getFieldDecorator('userType', {
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value="0">牛人</Option>
                                <Option value="1">Boss</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Form.Item> 
                </Form>
                            
                <div className="Login-sign">
                    Don't have an account?
                    <NavLink to="/signup">Sign up now!</NavLink>
                </div>
                
            </div>
            
        )
    }
    
}

Login=Form.create({ name:'login' })(Login);
export default Login

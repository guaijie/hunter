import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import Logo from '@/components/Logo/Logo.js'
import { connect } from 'react-redux'
import './SignUp.less';
import { userRegiset } from '@/reducers/userReducer.js'
import { debounce } from 'lodash'
import {normalizeInput} from '@/util.js';

@connect(
    state=>state.user,
    {userRegiset}
)
class SignUp extends React.Component {

    componentDidUpdate(){
        let {isAuth,userType,history:{push}}=this.props;
        if(isAuth){
            push('/infocompletion')
        }
        return 
    }

    handleSubmit = e => {

        var { validateFields } = this.props.form; 
        validateFields((errors, values) => {
            if (!errors) {
                console.log(values)
                this.props.userRegiset(values);
            }
        })
    }
    render() {
        const Option = Select.Option;
        let normalize=normalizeInput(20)
        let { getFieldDecorator } = this.props.form;
        let usernameField={
            normalize:normalize,
            validateFirst:true,
            rules:[
                {required:true,message:'Please input your username!' },
                {min:6,message:'用户名不能低于6位!'}
            ]
        };
        let passwordField={
            normalize:normalize,
            validateFirst:true,
            rules:[
                {required:true,message:'Please input your password!'},
                {min:6,message:'密码不能低于6位!'},
                {pattern:/^(?!\d+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$/,message:'必须由字母和数字组成!'},
            ]
        };
        return (
            <div className="Sign">
                <Logo/>
                <Form className="Sign-form">
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
                            initialValue:'0'
                        })(
                            <Select>
                                <Option value="0">牛人</Option>
                                <Option value="1">Boss</Option>
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
                        <Button onClick={debounce(this.handleSubmit,500,{
                            leading:false,
                            trailing:true
                        })} block type="primary" htmlType="button">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>

                <div className="Sign-login">
                    Have an account?
                    <NavLink to="/login">login now!</NavLink>
                </div>

            </div>

        )
    }

}

SignUp = Form.create({ name: 'sign' })(SignUp);
export default SignUp

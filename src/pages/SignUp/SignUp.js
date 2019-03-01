import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import Logo from '@/components/Logo/Logo.js'
import { connect } from 'react-redux'
import './SignUp.less';
import { userRegiset } from '@/reducers/userReducer.js'
import { debounce } from 'lodash'

@connect(
    state=>state.user,
    {userRegiset}
)
class SignUp extends React.Component {

    componentDidMount(){
       
    }

    handleSubmit = e => {

        var { validateFields } = this.props.form; 
        validateFields((errors, values) => {
            if (!errors) {
                console.log(values)
                this.props.userRegiset(values);
                console.log(this.props)
            }
        })
    }
    handleChange(e) {
        console.log(e)
    }
    normalize=value=>{
        if(value){
            return value.trim()
        }
    };
    render() {
        const Option = Select.Option;

        let { getFieldDecorator } = this.props.form;
        let usernameField={
            normalize:this.normalize,
            validateFirst:true,
            rules:[
                {required:true,message:'Please input your username!' },
                {max:16,message:'用户名不能超过16位!'},
                {min:6,message:'用户名不能低于6位!'}
            ]
        };
        let passwordField={
            normalize:this.normalize,
            validateFirst:true,
            rules:[
                {required:true,message:'Please input your password!'},
                {max:16,message:'用户名不能超过16位!'},
                {min:6,message:'用户名不能低于6位!'},
                {pattern:/^(?!\d+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$/,message:'必须由字母和数字组成!'},
            ]
        };
        return (
            <div className="Sign">
                <Logo/>
                <Form /* onSubmit={this.handleSubmit} */ className="Sign-form">
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
                            initialValue:'lucy'
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

            </div >

        )
    }

}

SignUp = Form.create({ name: 'sign' })(SignUp);
export default SignUp

import React from 'react'
import {Carousel, Avatar, Modal, Icon, Input, Button, Checkbox,} from 'antd'
import { NavLink} from 'react-router-dom'
import './AvatarPick.less';

let avatars=[
'male','female','cat','dog','duck',
'cow','elephant','fish','fox','giraffe',
'horse','lion','long','monkey','mouse',
'panda','pig','rabbit','sheep','tiger'
]

class AvatarPick extends React.Component{

    componentDidMount(){
        // console.log(this.props.avatar())
    }
    state={
        visible:false,
    }
    handleCancel=()=>{
        this.setState({
            visible:false
        })
    }

    toggleAvatar=()=>{
        this.refs.carousel.next()
        this.setState({
            visible:false
        })
    }

    afterToggleAvatar=(c)=>{
        this.props.avatar(avatars[c])
    }

    openModal = () => {
        this.setState({
            visible:true,
        });
    }
    
    render(){
        let { visible } = this.state;
        return (
            <div className="Avatar">
                <div className="Avatar-carousel">
                    <Carousel afterChange={this.afterToggleAvatar} ref="carousel" dots="{false}" effect="fade">
                        { 
                            avatars.map((v,i)=>{
                                let src=require(`@\/assets/avatars\/${v}.png`);
                                return (
                                    <div key={i} className="Avatar-avatar">
                                        <img onClick={this.openModal} width="100" height="100" src={src}/>
                                    </div>
                                )
                            })
                        }
                    </Carousel>    
                </div>
                <Modal
                    visible={visible}
                    title={<h2 className="Avatar-modal-title">选择头像</h2>}
                    footer={
                        <div className="Avatar-modal-footer" onClick={this.handleCancel}>cancel</div>
                    }
                    width="80vw"
                    closable={false}
                >
                    <div className="Avatar-models">
                        <div>
                            <Icon style={{fontSize:'30px'}} theme="twoTone" twoToneColor="#eb2f96" type="picture"></Icon>
                        </div>
                        <div>
                            <Icon onClick={this.toggleAvatar} style={{fontSize:'30px'}} theme="twoTone" twoToneColor="#eb2f96" type="interation"></Icon>
                        </div>
                    </div>    
                </Modal>
            </div>
            
        )
    }
    
}

export default AvatarPick
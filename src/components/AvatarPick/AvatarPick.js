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

    state={
        visible:false,
    }
    closeModel=()=>{
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
        let style=this.props.style;
        return (
            <div className="Avatar-picker">
                <Modal
                    className="Avatar-picker-modal"
                    visible={visible}
                    title={<h2 className="modal-title">选择头像</h2>}
                    footer={
                        <div className="modal-footer" onClick={this.closeModel}>cancel</div>
                    }
                    onCancel={this.closeModel}
                    width="80vw"
                    closable={false}
                >
                    <div className="models">
                        <div>
                            <Icon style={{fontSize:'30px'}} theme="twoTone" twoToneColor="#eb2f96" type="picture"></Icon>
                        </div>
                        <div>
                            <Icon onClick={this.toggleAvatar} style={{fontSize:'30px'}} theme="twoTone" twoToneColor="#eb2f96" type="interation"></Icon>
                        </div>
                    </div>    
                </Modal>
                <div onClick={this.openModal} style={style?style:null} className="carousel">
                    <Carousel afterChange={this.afterToggleAvatar} ref="carousel" dots="{false}" effect="fade">
                        { 
                            avatars.map((v,i)=>{
                                let src=require(`@\/assets/avatars\/${v}.png`);
                                return (
                                    <div key={i} className="avatar">
                                        <img width="100%" height="100%" src={src}/>
                                    </div>
                                )
                            })
                        }
                    </Carousel>    
                </div>
                
            </div>
            
        )
    }
    
}

export default AvatarPick
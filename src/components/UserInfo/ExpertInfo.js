import React from 'react'
import { Row, Col, Icon} from 'antd'
import EasyInput from '@/components/EasyInput/EasyInput.js'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import './UserInfo.less';


class ExpertInfo extends React.Component {

  render() {
    
    return (
      <div>
        <div className="user-info">
          <div className="infos">
            <EasyInput 
              className="info"
              title={<div className="info-title">头像</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body"><AvatarPick style={{width:'70px',height:'70px'}} /></div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">昵称</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">昵称</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">姓名</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">阿布</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">性别</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">保密</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">电话</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">1888888888</div>
            </EasyInput>
            
            <EasyInput 
              className="info"
              title={<div className="info-title">出生年月</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">1998-01-01</div>
            </EasyInput>
          
            <EasyInput 
              className="info"
              title={<div className="info-title">最高学历</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">本科</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">专业</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">计算机</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">个人简介</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">平台提供基本的合同风险自助查询服务。。。</div>
            </EasyInput>
          </div>
        </div>
        {/*<text-input 
          v-if="!isOpen"
          :change="change"
          @save="save"
          @back="back"
          title="企业简介"
          placeholder="请输入个人简介"
          :decorator="{
            initialValue:description,
            normalize:textAreaNormalize,
            rules:[
              {required:true,message:'必填项不能为空！'},
            ]
          }"
        >
          <template #extra>
            <div className="extra">{{textareaSize}}</div>
          </template>
        </text-input>*/}
      </div>
    )
  }

}

export default ExpertInfo
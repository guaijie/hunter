import React from 'react'
import { Row, Col, Icon} from 'antd'
import EasyInput from '@/components/EasyInput/EasyInput.js'
import AvatarPick from '@/components/AvatarPick/AvatarPick.js'
import './UserInfo.less';


class BossUser extends React.Component {

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
              title={<div className="info-title">企业名称</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">阿布公司</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">法定代表</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">阿布</div>
            </EasyInput>

            <EasyInput 
              className="info"
              title={<div className="info-title">联系电话</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">1888888888</div>
            </EasyInput>
            
            <EasyInput 
              className="info"
              title={<div className="info-title">企业类型</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">民营企业</div>
            </EasyInput>
          
            <EasyInput 
              className="info"
              title={<div className="info-title">行业类型</div>}
              suffix={<div className="info-suffix"><Icon type="right" /></div>}
            >
              <div className="info-body">互联网</div>
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
            <div class="extra">{{textareaSize}}</div>
          </template>
        </text-input>*/}
      </div>
    )
  }

}

export default BossUser
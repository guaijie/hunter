import axios from 'axios'
import { message } from 'antd';

message.config({
  top:10,
  duration:0.5,
  maxCount:1,
});

// 拦截请求
axios.interceptors.request.use((config)=>{
  console.log('loading')
  message.loading('加载中。。。')
  return config
})

//拦截响应
axios.interceptors.response.use(config=>{
  message.destroy();
  return config
})
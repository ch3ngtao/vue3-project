// import Configs from '@/config/config';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import axios from "axios";
import qs from 'qs';
import { Md5 } from "ts-md5";
import { createVNode } from 'vue';
import store from "../store";
import { removeStorage } from './storage';

const _secret = "x5k9cxOGY6y92UR9HhkocqyuDzWQsRg&HBJX9gpDhbRGwEaUJjEQ2yoiysdpQP"

const config = {
  baseURL: '',
  headers: {},
  data: {
    _signature: '',
    _random: ''
  }
}


const _axios = axios.create(config)
//add headers
_axios.interceptors.request.use(
  function(config):any {
    const token = store.state.token
    const type = store.state.visitOrigin
    config.url = '/api' + config.url
    // config.url = Configs.apiUrl + config.url
    config.headers = {
      'Client-Type': type,
      'Client-Token': token,
      'Access-control-Allow-Origin': '*' ,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if(config.method === 'post') {
      
      const _random = Math.random().toString(36).slice(-8)
      const _signature = Md5.hashStr(_secret + _random + JSON.stringify(config.data)).toString().toUpperCase()
      
      config.data._signature = _signature,
      config.data._random = _random
      config.data = qs.stringify(config.data)
      
    }
    return config
  }
)

_axios.interceptors.response.use(
  function(response): any {
    const status = response.data.data.code
    if(status == 4001 || status == 4021 || status == 4031 || status == 4011) {
      // store.commit("setToken", "null")
      window.confirm("登录过期，请重新登录")
      removeStorage("token")
    } else if(status == 9){
      console.log(store.state.isDisable,'isDisable' );
      
      if(store.state.isDisable === 0) {
        store.commit("setDisable", 1)
        Modal.info({
          title: '维护中',
          icon: createVNode(ExclamationCircleOutlined),
          content: '哦豁，站点正在维护中...',
          okText: '我知道了',
          okButtonProps: {
            disabled: true,
            type: "danger"
          }
        });
      } else if(store.state.isDisable ===1) {
        return false
      }
    } else {
      store.commit("setDisable", 0)
    }
    return response.data
  }
)

export default _axios;


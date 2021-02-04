// import Configs from '@/config/config';
import axios from "axios";
import qs from 'qs';
import { Md5 } from "ts-md5";
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
    }
    return response.data
  }
)

export default _axios;


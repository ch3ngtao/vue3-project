import axios from "axios";
import qs from 'qs';
import { Md5 } from "ts-md5";
import store from "../store";

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
    console.log(token, "axiosToken");
    config.url = '/api' + config.url
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
    return response.data
  }
)

export default _axios;


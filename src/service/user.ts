import config from "@/config/config";
import axios from 'axios';
import { Md5 } from "ts-md5";

interface UserInfoType {
  key: number | string;
  password: number | string;
  checkpassword?: number | string;
  code?: number | string;
}
//用户注册
export function userRegister (userInfo:UserInfoType) {
  const { password, key, checkpassword, code } = userInfo
  return axios({
    method: 'post',
    url: config.baseUrl + '4145919',
    data: {
      password,
      mobile: key,
      re_password: checkpassword,
      captcha: code,
      uuid: Math.random()
        .toString(36)
        .slice(-8)
    }
  })
}

//用户登录
export function userLogin (userInfo:UserInfoType) {
  const { key, password } = userInfo;
  const secret:string = Md5.hashStr(password.toString()).toString().toUpperCase();
  return axios({
    method: "post",
    url: config.baseUrl + '4174754',
    data: {
      password: secret,
      mobile: key
    }
  })
}

//发送验证码
export function getCode () {
  return axios({
    method: "get",
    url: config.baseUrl + "4192095",
    params: {
      uuid: Math.random()
        .toString(36)
        .slice(-8)
    }
  })
}
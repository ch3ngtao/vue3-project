import config from "@/config/config";
import { Md5 } from "ts-md5";
import _axios from '../utils/axios';

interface UserInfoType {
  key: number | string;
  password: number | string;
  checkpassword?: number | string;
  code?: number | string;
}

interface ChangePassWordType {
  password: number|string,
  re_password: number|string,
  image_code: number|string,
}
//用户注册
export function userRegister (userInfo:UserInfoType) {
  const { password, key, checkpassword, code } = userInfo
  return _axios({
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
  return _axios({
    method: "post",
    url: config.baseUrl + '4174754',
    data: {
      password: secret,
      mobile: key
    }
  })
}

//发送验证码
export function getCode (id?:number|string) {
  return _axios({
    method: "get",
    url: config.baseUrl + "4201565",
    params: {
      uuid: Math.random()
        .toString(36)
        .slice(-8),
      captcha: id
    }
  })
}
//图形验证码
export function getImage () {
  return _axios({
    method: "get",
    url: config.baseUrl + "4192095",
    params: {
      uuid: Math.random()
        .toString(36)
        .slice(-8)
    }
  })
}

//修改密码
export function changePassWord (data: ChangePassWordType) {
  return _axios({
    method: "post",
    url: config.baseUrl + "4192095",
    data: {
      password: data.password,
      re_password: data.re_password,
      image_code: data.image_code,
      uuid: Math.random()
      .toString(36)
      .slice(-8)
    }
  })
}
import { Md5 } from "ts-md5";
import _axios from '../utils/axios';

interface UserInfoType {
  key: string;
  password: number | string;
  image_code: string;
  checkpassword: number | string;
  code?: number | string;
}

interface ChangePassWordType {
  password: number|string,
  re_password: number|string,
  image_code: number|string,
}
//用户注册
export function userRegister (userInfo:UserInfoType, uuid:string) {
  const { password, key, checkpassword, code, image_code } = userInfo
  const secret:string = Md5.hashStr(password.toString()).toString().toUpperCase();
  const secret_re= Md5.hashStr(checkpassword.toString()).toString().toUpperCase();
  return _axios({
    method: 'post',
    url: "/v1/registerBySMS",
    data: {
      password: secret,
      mobile: key,
      re_password: secret_re,
      sms_code: code,
      image_code,
      uuid
    }
  })
}

//用户登录
export function userLogin (userInfo:UserInfoType, uuid:string) {
  const { key, password, image_code } = userInfo;
  const secret:string = Md5.hashStr(password.toString()).toString().toUpperCase();
  return _axios({
    method: "post",
    url: "/v1/login",
    data: {
      password: secret,
      mobile: key,
      image_code,
      uuid
    }
  })
}

//发送验证码
export function getCode (uuid:string,phone:string,id?:number|string) {
  return _axios({
    method: "post",
    url: "/v1/captcha/sms",
    data: {
      uuid,
      image_code: id,
      mobile: phone
    }
  })
}
//图形验证码
export function getImage ( uuid:string) {
  return _axios({
    method: "get",
    url: "/v1/captcha/image",
    params: {
      uuid
    }
  })
}

//修改密码
export function changePassWord (data: ChangePassWordType, uuid:string) {
  return _axios({
    method: "post",
    url: "/v1/member/add",
    data: {
      password: data.password,
      re_password: data.re_password,
      image_code: data.image_code,
      uuid
    }
  })
}

//用户信息
export function GetUserInfo () {
  return _axios({
    method: "get",
    url: "/v1/auth/member/info",
  })
}
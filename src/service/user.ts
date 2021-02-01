import { Md5 } from "ts-md5";
import _axios from '../utils/axios';

interface UserInfoType {
  key: number | null;
  password: number | string;
  image_code: string;
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
  const { password, key, checkpassword, code, image_code } = userInfo
  return _axios({
    method: 'post',
    url: "/v1/registerBySMS",
    data: {
      password,
      mobile: key,
      re_password: checkpassword,
      captcha: code,
      image_code,
      uuid: Math.random()
        .toString(36)
        .slice(-8)
    }
  })
}

//用户登录
export function userLogin (userInfo:UserInfoType) {
  const { key, password, image_code } = userInfo;
  const secret:string = Md5.hashStr(password.toString()).toString().toUpperCase();
  return _axios({
    method: "post",
    url: "/v1/login",
    data: {
      password: secret,
      mobile: key,
      image_code
    }
  })
}

//发送验证码
export function getCode (phone:number|null,id?:number|string) {
  return _axios({
    method: "post",
    url: "/v1/captcha/sms",
    data: {
      uuid: Math.random()
        .toString(36)
        .slice(-8),
      captcha: id,
      mobile: phone
    }
  })
}
//图形验证码
export function getImage () {
  return _axios({
    method: "get",
    url: "/v1/captcha/image",
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
    url: "/v1/member/add",
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

//用户信息
export function GetUserInfo () {
  return _axios({
    method: "get",
    url: "/v1/auth/member/info",
  })
}
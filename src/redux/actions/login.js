import { reqLogin, reqLogout } from "@api/acl/login";
import {reqMobileLogin} from "@api/acl/oauth"
import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";


// 登录

export const login = (username,password)=>{
  return (dispatch) =>{
    return reqLogin(username,password).then(({token})=>{
      dispatch(loginSuccessSync(token));
      return token;
    });
  };
};
// 手机号登录
export const mobileLogin = (mobile,code)=>{
  return (dispatch) =>{
    return reqMobileLogin(mobile,code).then(({token})=>{
      dispatch(loginSuccessSync(token));
      return token;
    });
  };
};
export const loginSuccessSync = (token) =>({
  type:LOGIN_SUCCESS,
  data:token
});


/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN
});

/**
 * 登出
 */
export const logout = () => {
  return dispatch => {
    return reqLogout().then(() => {
      dispatch(removeToken());
    });
  };
};

import Cookies from 'js-cookie'

// 创建cookie
export function  createToken(token) {
    return Cookies.set 
}

// 获取cookie

// 销毁cookie
import Cookies from 'js-cookie'

// cookieToken
const Cookie_Token = "user_token"
// 过期时间
const pastTime = 7;

export function setCookie(cookieValue){
    return Cookies.set(Cookie_Token,cookieValue,pastTime);
}

// 获取cookie
export function getCookie(){
    return Cookies.get(Cookie_Token);
}
// 清理cookie信息
export function  clearCookie(){
    Cookies.clearCookie(Cookie_Token);
}
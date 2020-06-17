// 路由表配置文件
import {lazy} from "react"

const Login = lazy(()=>import(/*webpackChunkName:"login"*/ "@pages/Login"))
const Oauth = lazy(()=>import(/*webpackChunkName:"oauth"*/ "@pages/Login/components/Oauth"))
const NotFound = lazy(()=>import(/*webpackChunkName:"404"*/ "@pages/404"));
 
// 公开路由表
const constantsRoutes = [
    {
        title:"登录",
        path:"/login",
        component:Login,
    },
    {
        title:"授权登录",
        path:"/oauth",
        component:Oauth,
    },
    {
        title:"404",
        path:"*",
        component:NotFound,
    }
];

// 私有路由表
const defaultRoutes = [
    {
        title:"首页",
        path:"/",
        component:"Admin",
    }
];

export {constantsRoutes,defaultRoutes};
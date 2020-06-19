import React, { Component } from 'react'
import {menu, Menu} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import icons from "@conf/icons";

import {defaultRoutes} from "@conf/routes";

const {SubMenu} = Menu;

@connect((state)=>({
    permissionList:state.user.permissionList,
}))
class SideMenu extends Component {
    renderMenu = (menulist,parentPath="")=>{
        return menulist.map((menu)=>{
            const {children,icon,path,name,hidden} = menu;
            if(hidden) return null;
            const Icon = icons[icon];
            if(children && children.length){
                return(
                <SubMenu key={path} icon={<Icon/>} title={name} >
                    {this.renderMenu(children,path)}
                </SubMenu>
                )
            }else{
                const currentPath = parentPath + path;
                return(
                    <Menu.Item key={currentPath} icon={Icon ? <Icon/> : null}>
                        <Link to={currentPath}>{name}</Link>
                    </Menu.Item>
                )
            }
        })
    };
    getOpenKeys = (pathname)=>{
        if(pathname === "/") return [];
        return ["/" + pathname.split("/")[1]];
    }
    render() {
        const {permissionList,currentRoute} = this.props;
        return (
            <Menu
                theme="dark"
                defaultSelectedKeys={[
                    currentRoute.children
                        ? currentRoute.path + currentRoute.children.path
                        : currentRoute.path,
                ]}
                defaultOpenKeys={[currentRoute.path]}
                mode="inline"
            >
                {this.renderMenu(defaultRoutes)}
                {this.renderMenu(permissionList)}
            </Menu>
        )
    }
}

export default SideMenu;

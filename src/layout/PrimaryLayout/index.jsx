import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {GlobalOutlined} from "@ant-design/icons";

import {defaultRoutes} from "@conf/routes";
import  SideMenu from "../SideMenu"
import logo from "@assets/images/logo.png";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;


@withRouter
@connect((state)=>({user:state.user}))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  // 获取当前路由配置
  getCurrentRoute = (permissionList,pathname)=>{
    for(let i =0;i<permissionList.length;i++){
      const route = permissionList[i];
      if(route.path === pathname){
        return{
          ...route,
          children:undefined,
        };
      }
      const {children} = route;
      if(children && children.length){
        for(let j=0;j<children.length;j++){
          const item = children[j];
          const currentPath = route.path + item.path;
          if(currentPath === pathname){
            return {
              ...route,
              children:item,
            };
          }
        }
      }
    }
  }
  render() {
    const { collapsed } = this.state;
    const {user,location:{pathname}} = this.props;
    let currentRoute = this.getCurrentRoute(defaultRoutes,pathname);
    if(!currentRoute){
      currentRoute = this.getCurrentRoute(user.permissionList,pathname);
    }
    return (
      <Layout className="layout">
        {/* 左侧导航 */}
        <Sider
          collapsible
          collapsed={collapsed}
          // 收缩/展开侧边栏的方法
          onCollapse={this.onCollapse}
        >
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SideMenu currentRoute={currentRoute}/>
        </Sider>
        {/* 右边布局 */}
        <Layout>
          {/* 右边头部 */}
          <Header className="layout-header">
            <img src={logo} alt="avatar" />
            <span>admin</span>
            <GlobalOutlined />
          </Header>
          {/* 右边内容区 */}
          <Content>
            <div className="layout-nav">
              <Breadcrumb>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <h3>User</h3>
            </div>

            <div className="layout-content">Bill is a cat.</div>
          </Content>
          {/* 右边底部 */}
          <Footer className="layout-footer">
            ©2020课程版权均归硅谷教育管理系统所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PrimaryLayout;

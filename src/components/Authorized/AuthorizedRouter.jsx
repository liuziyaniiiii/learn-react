import React, { Component,Suspense } from 'react';
import PropTypes from "prop-types";
import {Switch,Route,Redirect} from "react-router-dom";
import {Spin} from "antd";

import {defaultRoutes} from "@conf/routes";
import asyncComps from "@conf/asyncComps";

class AuthorizedRouter extends Component {
    static propTypes = {
        permissionList:PropTypes.array.isRequired,
    };

    renderRoute = (menuList,parentPath="")=>{
        return menuList.reduce((routes,menu)=>{
            const {component,redirect,children,path} = menu;
            if(component){
                const Component = asyncComps[component]();
                routes.push(
                    <Route
                        key={path}
                        path={parentPath + path}
                        component={Component}
                        exact
                    />
                );
            }

            if(children && children.length){
                routes = routes.concat(this.renderRoute(children,path))
            }

            if(redirect && redirect !== "noredirect"){
                routes.push(
                    <Redirect key={path} from={path} to={redirect}/>
                )
            }
            return routes;
        },[]);
    };

    render() {
        const {permissionList} = this.props;
        return (
            <Suspense fallback={<Spin size="large"/>}>
                <Switch>
                    {this.renderRoute(defaultRoutes)}
                    {this.renderRoute(permissionList)}
                </Switch>
            </Suspense>
        )
    }
}
export default AuthorizedRouter;

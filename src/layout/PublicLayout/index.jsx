import React, { Component ,Suspense} from 'react'
import {Switch,Route} from 'react-router-dom'
import {constantsRoutes} from '@conf/routes'

const Loading = <div>loading</div>

export default class PublicLayout extends Component {
    
    renderRoutes = (routes)=>{
        return routes.map((route)=>{
            return (
            <Route 
                key={route.path}
                path={route.path} 
                component ={route.component}
                exact
            />
            );
        })
    }
    
    render() {
        
        return (
            <Suspense fallback={<div>{Loading}</div>}>
                <Switch>
                    {this.renderRoutes(constantsRoutes)}
                </Switch>
            </Suspense>
        )
    }
}

import React, { Component } from 'react';
import {connect} from "react-redux";

import {getMenu,getUserinfo} from "./redux"

import PrimaryLayout from "../../layout/PrimaryLayout";
import Loading from "../Loading"

@connect(null,{getMenu,getUserinfo})

class Authorized extends Component {
    state={
        isLoading:true,
    }

    componentDidMount(){
        const {getMenu,getUserinfo} = this.props;
        const promises = [getMenu(),getUserinfo()];
        Promise.all(promises).then(()=>{
            this.setState({
                isLoading:false,
            });
        });
    }

    render() {
        const {isLoading} = this.state;

        return isLoading ? <Loading/> : <PrimaryLayout/>
    }
}

export default Authorized

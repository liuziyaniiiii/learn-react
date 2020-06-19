import React, { Component } from "react";
import { connect } from "react-redux";

// import PrimaryLayout from "./PrimaryLayout";
import Authorized from '@comps/Authorized'
import PublicLayout from "./PublicLayout";

@connect((state) => ({ token: state.token }))
class Layout extends Component {
  render() {
    // 看是否登录 --> 看是否有token --> redux中看看
    const { token } = this.props;

    return token ? <Authorized /> : <PublicLayout />;
  }
}

export default Layout;

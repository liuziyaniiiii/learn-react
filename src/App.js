import React from "react";
import { Router } from "react-router-dom";
import {IntlProvider} from "react-intl"
import {zh,en} from "./locales";
import {connect} from "react-redux";

import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App({language}) {
  // const locale = "zh";
  const messages = language === "en" ? en : zh;

  return (
    <Router history={history}>
      <IntlProvider
        locale={language}
        messages={messages}
      >
        <Layout />
      </IntlProvider>
    </Router>
  );
}

export default connect((state)=>({language:state.language})) (App);

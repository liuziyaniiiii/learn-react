import React from "react";
import { Row, Col ,Progress} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { AreaChart,ColumnChart } from "bizcharts";
import Card from "@comps/Card";


import "./index.less";

//数据源
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 10 },
  { year: "1993", value: 15 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 10 },
  { year: "1997", value: 4 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];
// 柱状图数据源
const bardata = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
const layout = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
};

export default function Visits() {
  return (
    <Row gutter={16}>
      <Col {...layout}>
        <Card
          title="总销售额"
          number="￥123456"
          content={
            <>
              <span>
                同周比 12% &nbsp;
                <CaretUpOutlined style={{color:"red"}}/>
              </span>
              &nbsp; &nbsp;
              <span>
                同周比 12% &nbsp;
                <CaretDownOutlined style={{color:"green"}}/>
              </span>
            </>
          }
          footer="日销售额 ￥123456"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="访问量"
          number="123456"
          content={
            <div className="charts-container">
              <AreaChart
                data={data} // 数据
                forceFit // 自适应宽高
                xField="year" // x轴加载数据的字段
                yField="value" // y轴加载数据的字段
                smooth // 曲线
                color="pink" // 颜色
                xAxis={{ visible: false }} // 隐藏x轴
                yAxis={{ visible: false }} // 隐藏y轴
                meta={{
                  value:{
                    alias: '值'
                  }
                }}
              />
            </div>
          }
          footer="日销售额 ￥12,3456"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="支付笔数"
          number="123456"
          content={
            <ColumnChart
              data={bardata}
              forceFit
              padding='0'
              xField='type'
              yField='sales'
              xAxis={{ visible: false }} // 隐藏x轴
              yAxis={{ visible: false }} // 隐藏y轴
              meta={{
                type: {
                  alias: '类别',
                },
                sales: {
                  alias: '销售额(万)',
                },
              }}
            />
          }
          footer="转化率 60%"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="运营结果"
          number="123456"
          content={
            <Progress
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={80}
              status="active"
            />
          }
          footer={
            <>
              <span>
                同周比 12% &nbsp;
                <CaretUpOutlined style={{color:"red"}}/>
              </span>
              &nbsp; &nbsp;
              <span>
                同周比 12% &nbsp;
                <CaretDownOutlined style={{color:"green"}}/>
              </span>
            </>
          }
        />
      </Col>
    </Row>
  );
}

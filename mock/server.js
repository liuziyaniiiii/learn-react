const express = require("express");
const Mock = require("mockjs");

// 创建App应用对象
const app = express();
// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// 使用cors 解决跨域
app.use((req, res, next) => {
  // 设置响应头: 将来作为响应数据返回给客户端的~
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});

// http://47.103.203.152/admin/edu/subject/:page/:limit
app.get('/admin/edu/subject/:page/:limit',(req,res,next)=>{
  // 获取params参数
  const {
    page,
    limit
  } = req.params;
  // 获取请求参数query
  // const {} = req.query;
  // 模拟数据
  const data = Mock.mock({
    total:Random.integer(+limit+1,limit*2),
    [`items|${limit}`]:[
      {
        "_id|+1":1,
        title:"@ctitle(2,5)",
        parentId:0,
      },
    ],
  });
  // 返回响应
  res.json({
    code: 20000,
    success: true,
    data,
    message:"",
  })
})

app.listen(9527,"localhost",(err)=>{
  if(err){
    console.log("服务器启动失败",err);
    return;
  }
  console.log("服务器启动成功")
})
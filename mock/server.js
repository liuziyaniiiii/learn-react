const express = require("express");
const Mock = require("mockjs");

// 创建App应用对象
const app = express();
// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();
//使用解析POST/PUT请求的请求体参数的中间件
//app.use()中间件,代表接收所有的请求
app.use(express.json());

// 使用cors 解决跨域
app.use((req, res, next) => {
  // 设置响应头: 将来作为响应数据返回给客户端的~
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});
//请求增加数据
app.post("/admin/edu/subject/save",(req,res,next)=>{
  const  {title,parentId} = req.body;
  res.json({
    code:20000,
    success:true,
    data:{
      _id:Date.now(),
      title,
      parentId,
    },
    message:"",
  });
});


// 二级分类数据
app.get("/admin/edu/subject/get/:parentId",(req,res,next)=>{
  const{
    parentId,
  }=req.params;
  const total = Random.integer(0,5);
  const data = Mock.mock({
    total,
    [`items|${total}`]: [
      {
        "_id|+1": 100,
        title: "@ctitle(2,5)",
        parentId,
      },
    ],
  });
  if(total===1){
    data.items = [data.items]
  }
  res.json({
    code:20000,
    success:true,
    data,
    message:"",
  });
});

// http://47.103.203.152/admin/edu/subject/:page/:limit 一级分类数据
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
  });
});

app.listen(9527,"localhost",(err)=>{
  if(err){
    console.log("服务器启动失败",err);
    return;
  }
  console.log("服务器启动成功")
})
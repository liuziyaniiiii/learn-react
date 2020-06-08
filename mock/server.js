const express = require("express");
const Mock = require("mockjs");
// 创建App应用对象：将来设置后台路由的方法都在上面
const app = express();

// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// app.use() 中间件，代表接受所有请求
// 使用cors 解决跨域
app.use((req, res, next) => {
  // 设置响应头: 将来作为响应数据返回给客户端的~
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});


app.get("/admin/edu/subject/:page/:limit", (req, res, next) => {
 
  const {
    page, // 当前页码
    limit, // 每页数量
  } = req.params;
  // 获取请求参数 query查询字符串
  // const {} = req.query;

  // 模拟数据 http://mockjs.com/examples.html
  const data = Mock.mock({
    total: Random.integer(+limit+1, limit * 2), // 以某个的范围取一个随机整数
    // `items|${limit}` 生成数组，数组长度为limit
    [`items|${limit}`]: [
      {
        // 有个属性 _id 初始化值是 1
        // 遍历会递增 +1
        "_id|+1": 1,
        // @ctitle 会使用上面 Random.ctitle() 来生成随机标题
        // @ctitle(2,5) 控制长度为2-5
        title: "@ctitle(2,5)",
        parentId: 0,
      },
    ],
  });

  

  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data, // 成功的具体数据
    message: "", // 失败原因
  }); // 将数据装换json字符串返回响应
});



// 监听端口号 启动服务
app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  console.log("服务器启动成功~");
});

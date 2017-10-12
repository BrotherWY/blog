## MVC
因为仅仅只是用node做服务，不要view层。
## 后台框架

选用koa2的原因是因为koa使用了es7的一些特性，express团队打造，最喜欢的就是他的中间件思想，用着很舒服。当然猎奇的想法占了大多数。

## mysql数据库

以前写java的时候用的Mysql，环境、工具什么的都有，还是挺熟的！

## sequelize

一个连接mysql数据库的工具，很强大，orm数据库都可以双向映射(代码生成表，表生成代码(sequelize-auto))

## koa 获取参数

- get/delete 获取参数使用 ctx.query
- post/put 获取使用 ctx.request.body

## async/await 太他妈的好用了(无敌，爆炸)

因为这是es7的东西，所以需要babel转义,koa2已经包含了.
针对返回值类型是promise的使用，简直就是终极大招。咔咔的

## 规范后台返回数据

正确返回格式: {
  code: 200,
  data: data
}

错误返回格式: {
  code: -1,
  msg: '错误类型'
}
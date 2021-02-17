const fs = require('fs')
const Router = require('koa-router')
const router = new Router() // 实例化路由
const path = require('path')

module.exports = router

router.post('/rename', async (ctx) => {
  console.log(ctx.request.body)
  let data = ctx.request.body
  let pathName = path.join(__dirname, '../public', data.path, data.file.name.name)
  let isSuccess = await fs.promises.rename(pathName, path.join(__dirname, '../public', data.path, data.file.newName))
  if(!isSuccess){
    ctx.body = true
  } else {
    ctx.body = false
  }
})
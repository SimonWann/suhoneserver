const fs = require('fs')
const Router = require('koa-router')
const router = new Router() // 实例化路由
const path = require('path')

module.exports = router

router.post('/delete', async (ctx) => {
  console.log(ctx.request.body)
  let data = ctx.request.body
  let pathName = path.join(__dirname, '../public', data.path, data.file.name.name)
  let isSuccess = await fs.promises.rm(pathName)
  if(!isSuccess){
    ctx.body = true
  } else {
    ctx.body = false
  }
})
const fs = require('fs')
const Router = require('koa-router')
const router = new Router() // 实例化路由
const path = require('path')

module.exports = router

router.post('/mkdir', async (ctx) => {
  // console.log(ctx.request.body)
  let data = ctx.request.body
  console.log(data)
  let isSuccess = await fs.promises.mkdir(path.join(__dirname, '../public', data.currentPath, data.newDir))
  if(!isSuccess){
    ctx.body = true
  } else {
    ctx.body = false
  }
})
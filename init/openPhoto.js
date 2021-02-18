const fs = require('fs')
const Router = require('koa-router')
const router = new Router() // 实例化路由
const path = require('path')

module.exports = router

router.post('/openPhoto', async (ctx) => {
  // console.log(ctx.request.body)
  let data = ctx.request.body
  console.log(data)
  let pathName = path.join(__dirname, '../public', data.path, data.file.name.name)
  console.log(pathName)
  let result = new Uint8Array(await fs.promises.readFile(pathName))
  ctx.body = result
})
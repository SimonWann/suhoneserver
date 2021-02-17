const fs = require('fs')
const Router = require('koa-router')
const router = new Router() // 实例化路由
const path = require('path')

module.exports = router

router.post('/paste', async (ctx) => {
  // console.log(ctx.request.body)
  let data = ctx.request.body
  let dest = data.path
  let isSuccess = new Array(data.files.length)
  // console.log(data)
  await data.files.forEach(async (val, index) => {
    let pathName = path.join(__dirname, '../public', val.path, val.file.name.name)
    isSuccess[index] = await fs.promises.copyFile(pathName, path.join(__dirname, '../public', dest, val.file.name.name))
  })
  ctx.body = isSuccess
  //值为空则粘贴成功
})
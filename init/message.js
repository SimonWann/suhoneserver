const Router = require('koa-router')
const router = new Router(); // 实例化路由
const path = require('path')
const fs = require('fs')
const readable = require('stream').Readable;
const { resolve } = require('path');
const s = new readable

module.exports = router

router.all('/download', async (ctx) => {
  let down = new Promise ((resolve) => {
    ctx.websocket.on('message', function(msg) {
    resolve(msg)
    })
  })
  down.then(data => {
    console.log(data)
    data = JSON.parse(decodeURIComponent(data))
    // let extName = data.file.name.name.match(/\.[a-z]*$/i)[0]
    let pathName = path.join(__dirname, '../public', data.path, data.file.name.name)
    console.log(pathName)
    let a = fs.createReadStream(pathName)
    a.on('readable', () => {
      ctx.websocket.send(a.read())
    })
  }).catch(err => {
    console.log('')
  })
})


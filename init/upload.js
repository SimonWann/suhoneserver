const Router = require('koa-router')
const router = new Router(); // 实例化路由
const path = require('path')
const fs = require('fs')
const readable = require('stream').Readable;
const { resolve } = require('path');
const { Readable } = require('stream');
const s = new readable

module.exports = router

let files = []

router.all('/upload', async (ctx) => {
  let blob
  let readable
  let writable
  ctx.websocket.on('message', function(msg) {
    blob = msg
    // console.log(blob instanceof Uint8Array)
    if(msg == 1) {
      // 1代表数据刚开始传输
      if(files.length === 0) {throw new Error('files队列为空')}
      readable = new Readable()
      let file = files.shift()
      writable = fs.createWriteStream(path.join(__dirname, '../public', file.currentPath, file.name))
      readable.pipe(writable)
      readable._read = () => {}
    } else if(msg == 3) {
      readable.push(null)

      readable.on('end', () => {
        console.log('done!')
        ctx.websocket.send('1')
        readable.destroy()
        writable.destroy()
        //1代表服务端全部接受完成
      })
      // 3代表数据传输完毕
    } else {
      readable.push(blob)
      // msg不是1或3就将数据推入到readable
    }
    
  })
  
})
router.all('/uploadInfo', async (ctx) => {
  let up = new Promise ((resolve) => {
    ctx.websocket.on('message', function(msg) {
    msg = decodeURIComponent(msg)
    resolve(msg)
    })
  })
  up.then(data => {
    files.push(JSON.parse(data))
    ctx.websocket.send('1')
  }) 
})


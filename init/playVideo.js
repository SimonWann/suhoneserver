const Router = require('koa-router')
const router = new Router(); // 实例化路由
const path = require('path')
const fs = require('fs');
const readable = require('stream').Readable;
const FfmpegCommand = require('fluent-ffmpeg')



module.exports = router

router.post('/playVideo', async (ctx) => {
  let data = ctx.request.body
  public = path.join(__dirname, '../video')
  //存hls文件的目录
  let m3u8 = await readdir(public)
  //存hls文件的目录详情
  let pathName = path.join(__dirname, '../public', data.path, data.file.name.name)
  if(m3u8.indexOf(path.join(data.path, data.file.name.name)) === -1){
    let playPath = path.join(public, data.path, data.file.name.name)
    await fs.promises.mkdir(playPath)
    const command = (new FfmpegCommand(pathName)).size('100%').format('hls').outputOptions([
    
      '-start_number 0',
      '-hls_time 10',
      '-hls_list_size 0'
    ]).save(path.join(playPath, 'index.m3u8')).on('start', (msg) => {
      console.log('start',msg)
    }).on('end', () => {
      console.log('end')
    }).on('err', () => {
      console.log(err)
    })
    ctx.status = 403
    ctx.body = 403
  } else {
    ctx.body = data
  }
  console.log(pathName)
})


async function readdir(path){
  return new Promise((res, rej) => {
    fs.readdir(path, {withFileType: true}, (err, data) => {
      if(err) rej(err)
      res(data)
    })
  })
}
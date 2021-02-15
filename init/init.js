const Router = require('koa-router')
const router = new Router(); // 实例化路由
const path = require('path')
const fs = require('fs')



router.get('/', async (ctx, next) => {
    let file = []
    console.log(1)
    try{
        file = await readdir()
        file = file.map((value,index, arr) => {
            return {name: value, isDir: value.isDirectory()}
        })
        ctx.body = file
    }catch(err) {
        console.log(err)
    }
    
})


router.get('/readDirAll', async (ctx, next) => {
    // console.log(await readDirAll('/'))
    try{ctx.body = await readDirAll('/')}
    catch(err){console.log(err)}
})

async function readDirAll(pathname, depth = 0){
    let files = await fs.promises.readdir(path.join(__dirname, "../public" , pathname), {withFileTypes: true})
    // console.log(files.length)
    return await Promise.all(files.map(async (val, index) => {
        if(val.isDirectory()){
            return {name: val, data: await readDirAll(path.join(pathname, val.name), depth + 1), depth: depth + 1 }
            //这里是个错误，但太多业务与它有关
        } else {
            let size = await new Promise((resolve,reject) => {
                fs.stat(path.join(__dirname, "../public" , pathname, val.name), (err, stats) => {
                    resolve(stats.size)
                })
            }) 
            return Promise.resolve({name: val, data: val, depth, size })
        }
    }))
}




module.exports = router
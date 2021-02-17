const Koa = require('koa');
const cors = require('koa-cors')
const serve = require('koa-static')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const websockify = require('koa-websocket')
const static = require('koa-static')

const app = new Koa()
const soApp = websockify(new Koa())

const init = require('./init/init')
const playVideo = require('./init/playVideo')
const message = require('./init/message')
const deleteFile = require('./init/delete')
const rename = require('./init/rename')
const paste = require('./init/paste')
const mkdir = require('./init/mkdir')
const upload = require('./init/upload')


let port = 3333
app.listen(port, () => {
    console.log(`${port}端口上运行http～`)
})
soApp.listen(port + 1, () => {
    console.log(`${port + 1}上运行了websockt`)
})

app.use(cors({
    orgin: '*',
    exposeHeaders: [],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'OPTION']
}))

app.use(bodyParser())
app.use(static(path.join(__dirname, 'video')))
// app.use(serve(path.join(__dirname, 'public')))
// app.use(init.allowedMethods())
app.use(init.routes())
app.use(playVideo.routes())
soApp.ws.use(message.routes())
soApp.ws.use(upload.routes())
app.use(deleteFile.routes())
app.use(rename.routes())
app.use(paste.routes())
app.use(mkdir.routes())

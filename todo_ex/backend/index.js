const logger = require('koa-logger')
const koaBody = require('koa-body')
const Koa = require('koa')
const cors = require('koa-cors')
const app = (module.exports = new Koa())

// get the app routes
const newsRoutes = require('./routes/news')

// env data
const API_URL = `${process.env.API_BASE_URL}${process.env.API_NEWS_URL}`

// middlewares
app.use(cors())
app.use(logger())
app.use(koaBody())
app.use(newsRoutes.routes())

// listen
let server
if (!module.parent) server = app.listen(process.env.PORT)
console.log(`Server running in http://localhost:${process.env.PORT}${API_URL}`)

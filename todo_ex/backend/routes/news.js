const Router = require('koa-router')
const router = new Router()

// "database"
const newsDB = []

const API_URL = `${process.env.API_BASE_URL}${process.env.API_NEWS_URL}`

let index = 1

getNextIndex = () => {
  return index++
}

router.get(API_URL, async ctx => {
  console.log(API_URL)
  ctx.body = {
    status: 'success',
    news: newsDB
  }
})

router.post(API_URL, async ctx => {
  const news = ctx.request.body
  const id = newsDB.push(news) - 1
  news.created_at = new Date()
  news.id = getNextIndex()
  ctx.body = {
    status: 'success',
    news: news
  }
})

router.get(`${API_URL}/:id`, async ctx => {
  const id = ctx.params.id
  const news = newsDB.find(n => +n.id === +id)
  console.log(news)
  if (!news) ctx.throw(404, 'invalid news id')
  ctx.body = {
    status: 'success',
    news: news
  }
})

router.put(`${API_URL}/:id`, async ctx => {
  const id = ctx.params.id
  const news = ctx.request.body
  const newsIdx = newsDB.findIndex(n => +n.id === +id)
  if (!news) ctx.throw(404, 'To update the news, one must send a news')
  console.log(newsIdx)
  if (newsIdx === -1) ctx.throw(404, 'There is no news with this id')
  const oldNews = newsDB[newsIdx]
  const mergedNews = {
    ...oldNews,
    ...news,
    id: id
  }
  newsDB[newsIdx] = mergedNews
  ctx.body = {
    status: 'success'
  }
})

router.delete(`${API_URL}/:id`, async ctx => {
  const id = ctx.params.id
  const newsIdx = newsDB.findIndex(n => +n.id === +id)
  if (newsIdx >= 0) {
    newsDB.splice(newsIdx, 1)
    ctx.body = {
      status: 'success'
    }
  } else {
    ctx.throw(404, 'invalid news id')
  }
})

module.exports = router

const Koa = require('koa');
var bodyParser = require('koa-bodyparser');
const router = require('./routes');
const app = new Koa();
const response = require('./middlewares/response');
const auth = require('./middlewares/auth');

app
  .use(auth.decode)
  .use(bodyParser())
  .use(response)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
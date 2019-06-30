
var koa =require('koa');
const views = require('koa-views');
const logger = require('koa-logger');
const router = require('koa-router')();
var path =require('path');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const cors = require('koa2-cors');
const onerror = require('koa-onerror');
const jwt = require('koa-jwt');
const secret = 'jwt demo'

var app=new koa();
onerror(app);

var index=require('./routes/index');
var admin=require('./routes/admin');

//加载html模板要在所有路由前面
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));


app.use(async (ctx,next)=>{
    console.log('app.js里面'+ctx.cookies.get('state'));
    ctx.request.header = {'authorization': "Bearer " + ctx.cookies.get('state')}
    await next();
});

app.use(jwt({secret}).unless({
    path: ['/'] //数组中的路径不需要通过jwt验证
}));

app.use(convert(bodyParser()));
app.use(convert(logger()));


app.use(require('koa-static')(__dirname + '/public'));

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/cors') {  //只要请求 /cors这个路由
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:3201'; //否则请求其他接口只能是这个域名可以请求的到
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'], //设置允许的HTTP请求类型
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('/',index.routes());
router.use('/admin',admin.routes());


app.use(router.routes(), router.allowedMethods());

app.listen('3000');

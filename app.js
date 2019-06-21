
var koa =require('koa');
const views = require('koa-views');
const logger = require('koa-logger');
const router = require('koa-router')();
var path =require('path');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
var app=new koa();


var index=require('./routes/index');
var admin=require('./routes/admin');

//加载html模板要在所有路由前面
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));


app.use(convert(bodyParser()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));


router.use('/',index.routes());
router.use('/admin',admin.routes());


app.use(router.routes(), router.allowedMethods());

app.listen('3000');

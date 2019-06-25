
var Router = require('koa-router');
var koaBody = require('koa-body');
var fs = require('fs');
var request=require('request');



var childProcess = require('child_process');
//var n = childProcess.fork(process.cwd()+'/routes/child.js',[]); //引入要监听的模块

var router = new Router();

    var pubObj={ver:'22.2'};

    router.post('cors',async (ctx, next) => {
        ctx.type='json';
        ctx.body={xx:'123'};
    });









module.exports = router;




var Router = require('koa-router');
var koaBody = require('koa-body');
var fs = require('fs');
var request=require('request');

const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'jwt demo'


var router = new Router();

    var pubObj=null;

    router.get('*',async (ctx, next) => {
        pubObj={web:'http://localhost:3000'};
        ctx.request.header = {'authorization': "Bearer " + ctx.cookies.get('state')}

        await next();
    });



    router.get('/',
        async (ctx, next) => {

            ctx.body='成功'
    });


    router.get('haha',
        async (ctx, next) => {
        console.log(ctx.state);
        await ctx.render('token',Object.assign({
            title:'haha'
        },pubObj))
    });






module.exports = router;



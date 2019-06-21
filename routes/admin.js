
var Router = require('koa-router');
var router = new Router();


    router.get('/',async (ctx, next) => {
        await ctx.render('index', {
            title:'后台首页',
            ver:'2.2.2'
        });
    });


module.exports = router;




var Router = require('koa-router');
var koaBody = require('koa-body');
var fs = require('fs');

var router = new Router();

    var pubObj={ver:'22.2'};

    router.get('/',async (ctx, next) => {
        await ctx.render('index', Object.assign({
            title:'首页'
        },pubObj));
    });



router.post('upload',
    koaBody({
        multipart: true,
        formidable: {
            uploadDir:process.cwd() + '/public/upload'
        }
    }),
    async function (ctx,next) {
        await new Promise((a,b)=>{

            console.log(  ctx.request.body.files["file"] );

            fs.renameSync( (ctx.request.body.files["file"]).path,((ctx.request.body.files["file"]).path)+'.'+((((ctx.request.body.files["file"])).name).split('.'))[(((((ctx.request.body.files["file"])).name).split('.')).length-1)]  ); //重命名

            // var source = tinify.fromFile(  (ctx.request.body.files["file"]).path  );
            // source.toFile(((ctx.request.body.files["file"]).path)+'_tinypng_'+'.'+((((ctx.request.body.files["file"])).name).split('.'))[(((((ctx.request.body.files["file"])).name).split('.')).length-1)]);

            a();

        });
        ctx.body ='上传完成';
    }

)






module.exports = router;



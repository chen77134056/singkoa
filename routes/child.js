//test.js中间件
function log( ctx ) {
    console.log( '执行自定义中间件' );

}

module.exports = function () {
    return async function ( ctx, next ) {
        log(ctx);
        await next()
    }
};
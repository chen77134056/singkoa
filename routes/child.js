

;(async function () {

    process.send({ Hello: '老爸我是儿子' }); //向老爸发送信息
    process.exit(0);  //儿子发数据给老爸后，任务完成退出。

})();
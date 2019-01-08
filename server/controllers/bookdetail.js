const { mysql } = require('../qcloud');

module.exports = async (ctx) => {
    
    const { id } = ctx.request.query;
    await mysql('books')
        .where("id", id)
        .increment('count', 1);


    const detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
        .where('id', id)
        .first();
        //不适用first函数的话，就是返回一个数组，只包含一个数据
    console.log(detail)
    const info = JSON.parse(detail.user_info)
    //increment 累加函数
    ctx.state.data = Object.assign({}, detail, {
        tags: detail.tags.split(',') ,
        summary :detail.summary.split('\n'),
        user_info: {
            
            name:info.nickName,
            image : info.avatarUrl
        }
    })
}
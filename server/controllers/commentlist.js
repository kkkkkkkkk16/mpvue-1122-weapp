const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { bookid, openid } = ctx.request.query
    console.log('commentlist', { bookid, openid })
    const mysqlSelect = mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let comments
// 根据传入参数为bookid和openid判断是图书列表还是个人列表
    if (bookid) {
        comments = await mysqlSelect.where('bookid', bookid)
    } else if (openid) {
        comments = await mysqlSelect.where('openid', openid)
    }

    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })

    }
}

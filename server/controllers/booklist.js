const { mysql } = require('../qcloud')
module.exports = async (ctx) => {
    const books = await mysql('books').select('*').orderBy('id','desc')
    console.log(books)
        ctx.state.data ={
            list : books
        }
}
const { blogModel, blogSchema } = require('./blogModel.js')
const { userModel, userSchema } = require('./userModel.js')
let User = userModel
let Blog = blogModel


module.exports = { User, Blog }
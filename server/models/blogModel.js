const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    content: String,
    userId: { type:Schema.Types.ObjectId,ref:'User' }
},{timestamps:{createdAt:'createdAt',updatedAt:'updatedAt'}})

const blogModel = mongoose.model('Blog',blogSchema)

module.exports = { blogModel,blogSchema }
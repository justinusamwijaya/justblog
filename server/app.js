require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require('cors')
require('mongoose').connect('mongodb://localhost:27017/testBlog')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('',routes)

app.listen(3000,()=>{
    console.log('RA DENGER APA2')
})
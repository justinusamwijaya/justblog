require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')
const cors = require('cors')
require('mongoose').connect('mongodb://user1:12345a@ds145223.mlab.com:45223/blogaaaa')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('',routes)

app.listen(3000,()=>{
    console.log('RA DENGER APA2')
})
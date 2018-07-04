const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    login:(req,res)=>{
        let { user, password } = req.body
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let dataSearch = regex.test(user)?{ email:user }:{ username:user }
        User.findOne( dataSearch ,(err,data)=>{
            if(err) return res.status(400).json({msg:'terjadi kesalahan', err})
            if(!data)return res.status(400).json({msg:"data tidak ditemukan!"}) 
            if(bcrypt.compareSync(password, data.password)){
                jwt.sign({ id:data._id,username:data.username },process.env.SECRETKEY,(err,result)=>{
                    if(err) res.status(400).json({msg:'terjadi kesalahan', err})
                    res.status(200).json({
                        token:result,
                        id:data._id,
                        username:data.username,
                    })
                })
            }else{
                res.status(403).json({
                    msg: "password yang dimasukkan salah!"
                })
            }

        })
    },
    signup:(req,res)=>{
        let { username, email, password } = req.body
        password = bcrypt.hashSync(password, 10);
        let newUser = new User({
            username,
            email,
            password,
            postsUploaded:[],
            postsLiked:[]
        })
        User.create(newUser)
        .then(result =>{
            res.status(200).json({
                msg:'user berhasil ditambahkan!',
                result,
            })
        })
        .catch(error =>{
            res.status(400).json({
                msg:'terjadi kesalahan!',
                error,
            })
        })
    },
}
const { Blog } = require('../models')

module.exports = {
    addBlog:(req,res)=>{
        let { title, content } = req.body
        let newBlog = new Blog({
            title,
            content,
            userId:req.user.id
        })
        Blog.create(newBlog)
        .then(()=>{
            res.status(200).json({msg:'data berhasil ditambahkan'})
        })
        .catch(error=>{
            res.status(400).json({msg:'terjadi kesalahan'})
        })
    },
    getOneBlog:(req,res)=>{
        Blog.findById( req.params.id )
        .then(result=>{
            res.status(200).json({msg:'data berhasil diambil!', result})
        })
        .catch(error=>{
            res.status(400).json({
                msg:'terjadi kesalahan',
                error
            })
        })
    },
    getAllBlog:(req,res)=>{
        Blog.find({ userId: req.user.id })
        .then(result=>{
            res.status(200).json({msg:'data berhasil diambil!', result})
        })
        .catch(error=>{
            res.status(400).json({
                msg:'terjadi kesalahan',
                error
            })
        })
    },
    updateBlog:(req,res)=>{
        Blog.findById(req.params.id)
        .then(result=>{
            let { title, content } = req.body
            result.title = title
            result.content = content
            result.save(err=>{
                if(err) return res.status(400).json({msg:'terjadi kesalahan'})
                res.status(200).json({
                    msg:'data berhasil diupdate'
                })
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    },
    deleteBlog:(req,res)=>{
        Blog.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.status(200).json({
                msg:'data berhasil dihapus'
            })
        })
        .catch(error=>{
            res.status(400).json(error)
        })
    }
}
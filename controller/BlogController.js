const Blog = require('../model/UserModel.js')

exports.createBlog = async (req,res)=>{
   const {title, content} = req.body;

   try {
      const blog = new Blog({title, content, author:req.user.id});
      await blog.save();
      res.status(201).json(blog)
   } catch (error) {
      res.status(500).send('server error')
   }
}

exports.getBlog = (req, res)=>{
   try {
      const blog = Blog.find({author:req.user.id})
      res.json(blog)
      
   } catch (error) {
      res.status(500).send('server error')
   }
}

exports.updateBlog = async (req,res)=>{
   try {
      const  blog = await Blog.findOneAndUpdate(
         {_id: req.params.id, author: req.user.id},req.body,{new:true}
      )
      if(!blog)
         return res.status(404).json({massage:'Blog not found'});
      res.json(blog)
   } catch (error) {
      res.status(500).send('server error')
   }
}

exports.deleteBlog = async (req,res)=>{
    try {
      const blog = await Blog.findOneAndDelete(
         {_id:req.params.id},{author:req.user.id},req.boby,{new:true}
      )
      if(!blog) return res.status(404).json({massage:'Blog not found'})
      res.json(blog)
    } catch (error) {
      res.status(500).semd('server error')
    }
}
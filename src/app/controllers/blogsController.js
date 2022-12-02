const Blog = require("../models/Blogs");
const Users = require("../models/Users");

class BlogsController {

    index(req, res, next){
        Blog.find({})
            .then(blogs => res.render('blogs', {blogs}))
            .catch(next);
    }

    // Create
    create(req, res, next){
        res.render('blogs/create');
    }
    
    store(req, res, next){
        const file = req.file;
        req.body.image = file ? file.filename : "no-avatar.png";
        const blog = new Blog(req.body);
        blog
            .save()
            .then(() => res.redirect('/blogs'))
            .catch((error) => {});
    }
    //Edit
    edit(req, res, next){
        Blog.findById(req.params.id)
            .then(blogs => res.render('blogs/edit', {blog : blogs}))
            .catch(next);
    }
    
    update(req, res, next){
        const file = req.file;
        if(file){
            req.body.image = file.filename;
        }
        Blog.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/blogs'))
            .catch(next);
    }
    
    //Delete
    delete(req, res, next){
        Blog.deleteOne({_id: req.params.id})
        .then(()=> {
            res.send({ type : "success"});
        })
        .catch(next);
    }
    // Datail
    datail(req, res, next){
        Blog.findById(req.query.id)
            .then(blog => {
                res.render('blogs/datail', {blog});
            })
            .catch(next);
    }
}

module.exports = new BlogsController;
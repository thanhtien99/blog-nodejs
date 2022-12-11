const Blog = require("../models/Blogs");
const Users = require("../models/Users");

class BlogsController {

    index(req, res, next){
        if(req.session.user){
            var user_id = req.session.user._id;
            Blog.find({ "users.user_id": user_id})
            .then(blogs => res.render('blogs', {blogs}))
            .catch(next);
        }
    }

    // Create
    create(req, res, next){
        res.render('blogs/create');
    }
    
    store(req, res, next){
        const file = req.file;
        req.body.image = file ? file.filename : "no-avatar.png";
        const blog = new Blog(req.body);
        blog.users.push({ user_id :req.body.user_id, username: req.body.username });
        blog.save()
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

    //Like
    async like(req, res, next){
        var user_id = req.session.user._id;
        var test = await Blog.findByIdAndUpdate(req.params.id, {
            $push:{likes: user_id}
        }, {new: true})
        res.send({ type : "success"});
    }
    async unlike(req, res, next){
        var user_id = req.session.user._id;
        var test = await Blog.findByIdAndUpdate(req.params.id, {
            $pull:{likes: user_id}
        }, {new: true})
        res.send({ type : "success"});
    }
}

module.exports = new BlogsController;
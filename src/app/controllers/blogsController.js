const Blog = require("../models/Blogs");
const Users = require("../models/Users");
const Comments = require("../models/Comments");

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
        Blog.findById(req.query.id, function (err, blog) {
            Comments.find({ "blog_id": req.query.id}, function (err, comments) {
                if(err){
                    res.redirect('/users/login');
                } else {
                    res.render('blogs/datail', {blog, comments});
                }
            });
        });
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
    //comments
    async comments(req, res, next){
        const comments = new Comments(req.body);
        comments.blog_id = req.params.id;
        comments.path = 0;
        comments.content = req.body.comment_content;
        comments.users.push({ user_id :req.body.user_id, username: req.body.username });
        comments.save()
            .then(() => res.send({ type : "success"}))
            .catch((error) => {});
    }
}

module.exports = new BlogsController;
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

    // Detail
    detail(req, res, next){
        const blog = Blog.findById(req.query.id);
        const comments = Comments.find({ "blog": req.query.id}).sort({ createdAt: -1 });
        Promise.all([blog, comments]).then((values) => {
            const format = parent_childs(values[1]);
            res.render('blogs/datail', {blog: values[0], comments : format});
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
        comments.blog = req.params.id;
        comments.path = 0;
        comments.content = req.body.comment_content;
        comments.users.push({ user_id :req.body.user_id, username: req.body.username });
        comments.save()
            .then(() => res.send({ type : "success", commentID : comments._id, commentPath: comments.path}))
            .catch((error) => {});
    }

    // Reply comments
    async replyComments(req, res, next){
        const comments = new Comments(req.body);
        comments.blog = req.body.blog_id;
        comments.path = req.params.id;
        comments.content = req.body.comment_content;
        comments.users.push({ user_id :req.body.user_id, username: req.body.username });
        comments.save()
            .then(() => res.send({ type : "success", commentID : comments._id, commentPath: comments.path}))
            .catch((error) => {});
    }
    
    // Delete Comments
    deleteCmt(req, res, next){
        if(req.body.comment_path == 0 ){
            var deleteAllChild = Comments.deleteMany({path: req.params.id});
            var deletePerent = Comments.deleteOne({_id: req.params.id});
            Promise.all([deleteAllChild, deletePerent]).then(() => {
                res.send({ type : "success"});
            });
        } else {
            Comments.deleteOne({_id: req.params.id})
            .then(()=> {
                res.send({ type : "success"});
            })
            .catch(next);
        }
    }

}

const parent_childs = (comments, parent_id) => {
    // get parent first.
    //C1
    var result = []
    var child = [];
    result = comments.filter(e => {
        if(!parent_id) return !e.path || e.path == 0;
        return e.path == parent_id
    })
    if(result.lenght == 0) return;
    result.map(parent_cmt => {
        child = parent_childs(comments, parent_cmt._id.toString())
        parent_cmt.child = child;
        return parent_cmt
    })
    return result;

    // C1
    // var result = comments.filter(e => !e.path || e.path == 0)
    // for(let comment of comments) {
    //     if(comment.path == 0 || !comment.path) continue;
    //     result.forEach(parent => {
    //         if(!parent.child) {
    //             parent.child = [];
    //         };
    //         if(parent._id.toString() == comment.path) {
    //             parent.child.push(comment);
    //         };
    //     })
    // }
    // return result;
}

module.exports = new BlogsController;
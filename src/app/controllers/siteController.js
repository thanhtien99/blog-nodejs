const Blog = require("../models/Blogs");

class SiteController {

    index(req,res, next) {
        if(req.session.user){
            var user = req.session.user;
        }
        Blog.find({})
        .then(blogs => res.render('site', {blogs, user}))
        .catch(next);    
    }

}

module.exports = new SiteController;
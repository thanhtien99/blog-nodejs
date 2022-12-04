const Blog = require("../models/Blogs");

class SiteController {

    index(req,res, next) {
        Blog.find({})
        .then(blogs => res.render('site', {blogs}))
        .catch(next);    
    }

}

module.exports = new SiteController;
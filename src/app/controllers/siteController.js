const Blog = require("../models/Blogs");

class SiteController {

    index(req,res, next) {
        Blog.find({})
        .then(blogs => res.render('site', {blogs}))
        .catch(next);    
    }
    
    error404(req,res, next){
        res.render('site/error404');
    }

}

module.exports = new SiteController;
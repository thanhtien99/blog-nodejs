const Users = require("../models/Users");
const bcrypt = require('bcrypt');
class UsersController {

    index(req, res){
        res.render('users/index');
    }

    login(req,res, next) {
       res.render('users/login');
    }

    register(req,res, next) {
        res.render('users/register');
    }

    async create(req,res, next) {
        try{
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const user = new Users(req.body);
            await user.save();
            res.send({ type : "success"});
        } catch{
            res.send({ type : "error"});
            // res.redirect('/users/register');
        }
    }
    
    loginPost(req,res, next) {
        Users.findOne({email: req.body.email}).exec(function(err, user){
            if(err) {
                return res.json({err})
            }else if (!user){
                return res.json({err: 'Username and Password are incorrect'})
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result === true){
                    req.session.user = user;
                    res.redirect('/')
                }else{
                    return res.json({err: 'Username and Password are incorrect'})
                }
            })
        })
    }
    
    logout(req, res){
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return res.json({err});
                } else {
                    res.redirect('/users/login');
                }
            });
        }
    }
}

module.exports = new UsersController;
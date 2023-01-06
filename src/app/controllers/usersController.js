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
            if(req.body.username == "" || req.body.email == "" || req.body.password == ""|| req.body.repassword == ""){
                res.render('users/register', {errRegister : 'Your information is incomplete!'});
            }else if(req.body.repassword != req.body.password){
                res.render('users/register', {errRegister : 'Repassword does not match!'});
            }else{
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const user = new Users(req.body);
                await user.save();
                // res.send({ type : "success"});
                res.redirect('/users/login');
            }
        } catch{
            // res.send({ type : "error"});
            res.render('users/register', {errRegister : 'Email already in use!'})
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
                    return res.render('users/login', {errlogin : 'Username and Password are incorrect'})
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
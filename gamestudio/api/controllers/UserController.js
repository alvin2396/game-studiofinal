/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  'register':function(req,res){
  	res.view()
  },

  'login':function(req, res){
  	res.view();
  },
  create:function(req,res,next){
    var email = req.param('email');
    var username = req.param('username');
    User.findOne({email:email},function(err,user){
      if(user){
        return res.json(401, {err:'email sudah terdaftar'});
      }
      else{
        User.create(req.body).exec(function(err,user){
          if(err)
            return res.json(err.status, {err:err});
          if(user){
            res.json(user);
          }
        })
      }
    })
  }

};


/**
 * GenreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add:function(req,res){
  	res.view('admin/addgenre')
  }

};


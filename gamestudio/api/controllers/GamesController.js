/**
 * GamesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  detailGame: function (req, res, next) {

        Games.findOne(req.param('id')).populateAll().exec(function (err, games) {
            if (err) {
                return res.serverError(err);
            } else {

                games.genreStrings = []
                games.userStrings = []
                async.each(games.genre_lists, function (genre, callback) {
                    Genre.findOne({ id: genre.genre_id }).exec(function (err, genres) {
                        if (err) {
                            callback(err)
                        } else {

                            games.genreStrings.push({
                                id: genres.id,
                                nama_genre: genres.genre_name
                            })
                            callback()
                        }
                    })
                }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses

                    if (err)
                        return res.serverError(err);
                    else {
                        async.each(games.ratings, function (user, callback) {

                            User.findOne({ id: user.id_user }).exec(function (err, users) {
                                if (err) {
                                    callback(err)
                                } else {
                                    games.userStrings.push({
                                        id: users.id,
                                        nama: users.nama,
                                        photo_url: users.photo_url, users,
                                        review: user.review,
                                        score: user.score,

                                    })
                                    callback()
                                }
                            })
                        }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses

                            if (err)
                                return res.serverError(err);
                            else {
                                async.each(games.ratings, function (user, callback) {

                                    User.findOne({ id: user.id_user }).exec(function (err, users) {
                                        if (err) {
                                            callback(err)
                                        } else {
                                            games.userStrings.push({
                                                id: users.id,
                                                nama: users.nama,
                                                photo_url: users.photo_url, users,
                                                review: user.review,
                                                score: user.score,

                                            })
                                            callback()
                                        }
                                    })
                                }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses

                                    if (err)
                                        return res.serverError(err);
                                    else {
                                        res.view("user/gameDetail/", {

                                            status: 'OK',
                                            title: 'Detail Game',
                                            games: games
                                        })
                                    }
                                })
                            }
                        })

                    }
                })

            }
        })
    },


    populargame: function(req,res){
        Games.find().sort('rating DESC').limit(40).exec(function(err,games_popular){
            if(err){
                return res.serverError(err);
            }
            else{
                res.view('user/popularGame',{
                    status : 'OK',
                    title : 'Popular Games',
                    games_popular : games_popular
                })
            }
        })
    },

    gamePopular: function(req,res){
    	
        Games.find().sort('rating DESC').limit(4).exec(function(err,games){
            if(err)
                return res.serverError(err);
            else{
                Games.find().sort('harga ASC').limit(4).exec(function(err,newgame){
                    if(err)
                        return res.serverError(err);
                    else{
                        res.view('homepage',{
                            status : 'OK',
                            title : 'Game Studio',
                            games : games,
                            newgame : newgame
                        })
                    }
                })
            }
        })
        
    },

    add:function(req,res){
    	res.view('admin/addGame')
    },

    newGame : function(req,res,next){

    }
};


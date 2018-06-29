/**
 * GamesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  detailGame: function (req, res, next) {
       
        Games.findOne(req.param('id')).populateAll().exec(function (err, game) {
            if (err) {
                return res.serverError(err);
            } else {
                
                games.genreStrings = []
                games.userStrings =[]
                async.each(games.genre_lists, function (genre, callback) {
                    Genre.findOne({ id: genre.id_genre }).exec(function (err, genres) {
                        if (err) {
                            callback(err)
                        } else {
                            
                            games.genreStrings.push({
                                id:genres.id,
                                nama_genre:genres.nama_genre})
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
                                        id:users.id,
                                        nama:users.nama,
                                        photo_url:users.photo_url,users,
                                        review:users.review,
                                        score:user.score,
                                        
                                    })
                                    callback()
                                }
                            })
                        }, function (err) { // function ini akan jalan bila semua genre_lists telah diproses
                           
                            if (err)
                                return res.serverError(err);
                            else {         
                                res.view("user/detail-games/", {
                                    status: 'OK',
                                    title: 'Detail games',
                                    games: games
                                })
                            }
                        })        
                        
                    }
                })

            }
        })
    },

    populargame: function(req,res){
        res.view('popular');
    },

    gamePopular: function(req,res){
        Games.find()
        .sort({harga: 'DESC'})
        .limit(3)
        .exec(function(err,data){
            if(err)
                return res.serverError(err);
            else{
                
            }
        })
    }
};


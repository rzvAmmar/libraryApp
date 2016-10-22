var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    authRouter.route('/signUp')
        .post(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                //console.log(req.body);
                var user = {
                    userName: req.body.userName,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/user');
                    });
                });
            });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/user');
        });

    return authRouter;
};

module.exports = router;
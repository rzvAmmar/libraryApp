var express = require('express');
var userRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var router = function (nav) {

    //    var authorService = require('../services/goodreadsService.js')();
    //    var authorController = require('../controllers/bookController')(bookService, nav);
    userRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/books');
        } else {
            next();
        }
    });

    userRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                collection.findOne({userName: req.user.userName}, function (err, result) {
                    res.render('userView', {
                        title: 'Hello from render',
                        nav: nav,
                        user: result
                    });

                    db.close();
                });
            });
        });

    return userRouter;
};

module.exports = router;
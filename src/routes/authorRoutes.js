var express = require('express');
var authorRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var router = function (nav) {

    //    var authorService = require('../services/goodreadsService.js')();
    //    var authorController = require('../controllers/bookController')(bookService, nav);
    authorRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });

    authorRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    res.render('authorListView', {
                        title: 'Hello from render',
                        nav: nav,
                        books: results
                    });

                    db.close();
                });
            });
        });

    return authorRouter;
};

module.exports = router;
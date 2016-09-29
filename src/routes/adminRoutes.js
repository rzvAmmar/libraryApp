var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        author: 'Leo Tolstoy'
    },
    {
        title: 'Les Miserables',
        author: 'Victor Hugo'
    }
];

var router = function (nav) {

    adminRouter.route('/')
        .get(function (req, res) {
            res.send('Welcome Admin');
        });

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('Inserting Books...');
        });

    return adminRouter;
};
module.exports = router;
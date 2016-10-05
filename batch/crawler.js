var http = require('http');
var xml2js = require('xml2js');
var fs = require('fs');
var parser = xml2js.Parser({
    explicitArray: false
});

var books = [
    {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        bookId: 656
    }
];

var NOT_FOUND_COUNT = 0;
var FOUND_COUNT = 0;

var getBookById = function (id) {

    var options = {
        host: 'www.goodreads.com',
        path: '/book/show/' + id + '?format=xml&key=r72I6BSTmPQqIvJtDs3gPQ'
    };

    var callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            parser.parseString(str, function (err, result) {
                console.log(result.GoodreadsResponse.book.id + ': ' + result.GoodreadsResponse.book.title);
                console.log(result.GoodreadsResponse.book.authors.author[0].name);
            });
        });
    };

    http.request(options, callback).end();
};

var getBookByTitle = function (title) {

    var options = {
        host: 'www.goodreads.com',
        path: '/book/title.xml?format=xml&key=r72I6BSTmPQqIvJtDs3gPQ&title=' + title
    };

    var callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            parser.parseString(str, function (err, result) {
                if (result.GoodreadsResponse && result.GoodreadsResponse.book) {
                    console.log(result.GoodreadsResponse.book.id + ': ' + result.GoodreadsResponse.book.title);
                    //BOOKS_DB.push({bookId: result.GoodreadsResponse.book.id, title: result.GoodreadsResponse.book.title});
                    var b = {
                        title: result.GoodreadsResponse.book.title,
                        bookId: result.GoodreadsResponse.book.id,
                        imageUrl: result.GoodreadsResponse.book.image_url
                    };
                    
                    var mongodb = require('mongodb').MongoClient;
                    var url = 'mongodb://localhost:27017/libraryApp';

                    mongodb.connect(url, function (err, db) {
                        var collection = db.collection('books');
                        collection.insert(b, function (err, results) {
                            db.close();
                        });
                    });
                    //var str1 = result.GoodreadsResponse.book.id + ': ' + result.GoodreadsResponse.book.title + '\n';
                    //fs.appendFile('validatedBooks.txt', str1);
                    //console.log('Books added: '+ FOUND_COUNT);
                }
            });
        });
    };

    http.request(options, callback).end();
};

//getBookByTitle('Hound+Baskervilles+of');
//console.log('Starting API call..');

//getBookById(3311984);
//getBookByTitle('Hound+Baskervilles');


var lineReader = require('readline').createInterface({
    input: fs.createReadStream('booksCatalogue.txt')
});


lineReader.on('line', function (line) {
    //    console.log('Line from file:', line);
    var title = line.split(' ').join('+');
    //    console.log('Title for URL:', title, '\n');
    getBookByTitle(title);
});

//console.log('Total Books Added: ' + BOOKS_DB.length);
//fs.writeFile('validatedBooks.txt', BOOKS_DB);

//console.log('Records Found: ' + FOUND_COUNT);
//console.log('Records not found: ' + NOT_FOUND_COUNT); */



// ------------------------------------- Inserting in DB ----------------------------------






// ------------------------------------------------ */
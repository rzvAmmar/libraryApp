var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

var nav = [
    {
        Link: '/books',
        Text: 'Book'
              },
    {
        Link: '/authors',
        Text: 'Author'
              }
];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', function (request, response) {
    response.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

//app.get('/books', function (request, response) {
//    response.send('Hello Books!');
//});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});
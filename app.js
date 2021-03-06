var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var app = express();

var port = process.env.PORT || 80;

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
var authorRouter = require('./src/routes/authorRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
var userRouter = require('./src/routes/userRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/wuc', function (request, response) {
    response.render('wuc', {
    });
});

app.get('/', function (request, response) {
    response.render('index', {
        title: 'Hello from render',
        nav: nav,
        userWelcome: {
            userValid: request.user
        }
    });
});

//app.get('/books', function (request, response) {
//    response.send('Hello Books!');
//});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});

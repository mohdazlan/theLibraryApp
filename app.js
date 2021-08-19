const chalk = require('chalk');
const morgan = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(morgan('dev'));
// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

// To parse json data
app.use(bodyParser.json());

require('./src/config/passport')(app);
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(
  session({
    secret: 'library',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' },
];

const debug = require('debug')('app');

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/book', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' },
    ],
    title: 'Library',
  });
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/fuck', (req, res) => {
  res.send('WTF');
});

app.listen(5000, () => {
  debug(`listening at port ${chalk.green('5000')}`);
});

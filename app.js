const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const app = express();

const bookRouter = require('./src/routes/bookRoutes');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/book', bookRouter);
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

app.listen(3000, () => {
  debug(`listening at port ${chalk.green('3000')}`);
});

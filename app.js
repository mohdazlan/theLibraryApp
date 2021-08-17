const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '/public/')));
app.get('/', function (req, res) {
  res.send('Hello from my library app');
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function () {
  console.log(`listening on port ${chalk.green('3000')}`);
});

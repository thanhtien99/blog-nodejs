const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'media')));

app.use(morgan('combined'));
// app.engine('hbs', handlebars.engine());
// app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.get('/', function (req, res){
    res.render('home');
});

app.get('/postblog', function (req, res){
  res.render('postblog');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


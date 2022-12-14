const path = require('path');
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const app = express();
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

db.connect();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, 'media')));

// app.use(morgan('combined'));
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true,}),);
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({secret: "secret_key"}));
app.use(function(req, res, next) {
  user = req.session.user;
  next();
});

route(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


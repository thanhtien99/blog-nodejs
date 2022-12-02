const blogsRouter = require('./blogs');
const siteRouter = require('./site');
const usersRouter = require('./users');

function route(app) {
   
    app.use('/blogs', blogsRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
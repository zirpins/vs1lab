var connect = require('connect');

var serveStatic = require('serve-static'),
    serve = serveStatic('./static');

connect()
    .use(logger)
    .use('/admin/', restrict)
    .use(serve)
    .use(hello)
    .listen(3001);

function logger(request, response, next) {
    console.log('%s\t%s\t%s', new Date(),
        request.method, request.url);
    next();
}

function hello(request, response, next) {
    response.setHeader('Content-Type',
        'text/plain');
    response.end('Hello World!');
}

function restrict(req, res, next) {
    var authz = req.headers.authorization;
    if (!authz)
        return next(new Error('Unauthorized'));
    var parts = authz.split(' ');
    var scheme = parts[0];
    var auth = new Buffer(parts[1], 'base64')
        .toString().split(':');
    var user = auth[0]
    var pass = auth[1];
    if (user === "user" && pass === "password") {
        next();
    }
}

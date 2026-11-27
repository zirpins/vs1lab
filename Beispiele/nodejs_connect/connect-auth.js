const connect = require('connect');

const serveStatic = require('serve-static'),
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
    const authz = req.headers.authorization;
    if (!authz)
        return next(new Error('Unauthorized'));
    const parts = authz.split(' ');
    const scheme = parts[0];
    const auth = Buffer.from(parts[1], 'base64')
        .toString().split(':');
    const user = auth[0]
    const pass = auth[1];
    if (user === "user" && pass === "password") {
        next();
    } else{
        next(new Error('Wrong uname/pwd'));
    }
}
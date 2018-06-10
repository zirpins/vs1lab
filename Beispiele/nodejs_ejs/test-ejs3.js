var ejs = require('ejs');

var template = "<%=: movies  | sort | get:1 %>";

var context = {
    'movies': [
        'The Hobbit',
        'X-Men',
        'Superman V'
    ]
};

console.log(ejs.render(template, context));

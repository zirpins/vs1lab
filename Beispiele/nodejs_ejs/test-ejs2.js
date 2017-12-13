var ejs = require('ejs');

var template = '<%= message %>';

var context = {
    message: "<script>alert('hi!');</script>"
};

console.log(ejs.render(template, context));

var ejs = require('ejs');

var template1 = '<%= message %>';
var template2 = '<%- message %>';

var context = {
    message: "<script>alert('hi!');</script>"
};

console.log("Escaped output  : " + ejs.render(template1, context));
console.log("Unescaped output: " + ejs.render(template2, context));

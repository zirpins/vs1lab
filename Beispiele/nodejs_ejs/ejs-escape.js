const ejs = require('ejs');

const template1 = '<%= message %>';
const template2 = '<%- message %>';

const context = {
    message: "<script>alert('hi!');</script>"
};

console.log("Escaped output  : " + ejs.render(template1, context));
console.log("Unescaped output: " + ejs.render(template2, context));

var ejs = require('ejs');
var fs = require('fs');
var template = fs.readFileSync('views/list.ejs', 'utf8');

var tmp_fun = ejs.compile(template);
var ret = tmp_fun({
  names: ['foo', 'bar', 'baz']
});

console.log(ret);
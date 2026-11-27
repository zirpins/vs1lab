const ejs = require('ejs');
const fs = require('fs');
const template = fs.readFileSync('views/list.ejs', 'utf8');

const tmp_fun = ejs.compile(template);
const ret = tmp_fun({
  names: ['foo', 'bar', 'baz']
});

console.log(ret);
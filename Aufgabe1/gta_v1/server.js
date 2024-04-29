const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req, res) => {
    res.render('index');
});

app.listen('3000', '0.0.0.0');
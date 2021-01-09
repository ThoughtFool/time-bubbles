const express = require("express");
const app = express();
const path = require('path');
app.set('view engine', 'ejs');

const port = process.env.PORT || 8081;

// controllers:
app.use(express.static(__dirname + "/public"));
// app.use(path.join(__dirname + "/index"));

app.get('/', (req, res) => {
    res.render('splash');
});

app.get('/game', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`Time Bubbles app is listening on port ${port}!`));
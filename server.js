const express = require("express");
const app = express();

const port = process.env.PORT || 8081;

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => console.log(`Time Bubbles app is listening on port ${port}!`));
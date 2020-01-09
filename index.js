var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

const port = 3000;
const route = require('./routes/route');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json({ limit: "30MB", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30MB", extended: true }));
app.use(cors());
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use('/', route);


app.listen(port, () => {
    console.log('server started at port: ' + port);
});

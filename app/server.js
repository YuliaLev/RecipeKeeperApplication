var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.post('/addData', function (req, res) {
    var recipeKeeperBook = {};
    recipeKeeperBook.recipes = req.body;
    fs.writeFile('data.json', JSON.stringify(recipeKeeperBook));
    res.sendStatus(200);
});

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname );
    }
});

var upload = multer({ storage : storage});

app.post('/photo', upload.single('file'), function(req, res) {
    console.log(req.file);
    console.log('Photo is saved!');
    res.sendStatus(200);
});

var server = app.listen(8001, function () {
    console.log('backend started');
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


app.use('/public',express.static(__dirname + '/src/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/app/conf', express.static(__dirname + '/src/app/conf'));
// app.use('/systemjs-angular-loader.js', express.static(__dirname + '/systemjs-angular-loader.js'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
})

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});
router.get('/getAllUsers', function(req, res) {
    res.json({ message: 'get all users!' });
});

app.use('/api', router);

app.listen(port, errCallback);

function errCallback(err) {
    console.log('running server on port - ' + port);
}


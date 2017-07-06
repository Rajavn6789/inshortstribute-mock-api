const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
//fallback for deprecation
mongoose.Promise = Promise;

//initial settings
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const routes = require('./routes/routes')

/* Initilialization */
import './inc/seeds';

const dburl = 'mongodb://heroku_rg38vss6:nrffnkeef1erkkueih07m5gh0s@ds133271.mlab.com:33271/heroku_rg38vss6';

/* Mongoose connection */
mongoose.connect(dburl);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Database has been connected to ' + dburl);
}).on('error', (error) => {
    console.warn('Warning', error);
});

/* CORS middleware */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

//load the routes function
routes(app);

app.listen(app.get('port'), () => {
    console.log("Node app is running at localhost:" + app.get('port'))
})

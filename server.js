const express = require('express');
const mongoCli = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let db = require('./config/db');
const app = express();
const port = 8000;

app.use(bodyParser.json());

mongoCli.connect(db.URL, (err,database) => {
    if(err) console.log(err.message);

    db = database.db('roseta');
    require('./app/routes')(app,db);
    
    app.listen(port, () => {
        console.log('live on ' + port);
    });
} );
var express = require('express');
var router = express.Router();
var jsonParser = require('body-parser').json();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

function getElements() {
    var mongo = require('mongodb').MongoClient;
    var temp = [];
    temp = mongo.connect("mongodb://127.0.0.1:27017/commentsdb", function (err, db) {
        console.log('Data is here');
        let temp = db.collection("comments").find().toArray(function(err, result) {
            console.log(result.length);
            for (var a = 0; a < result.length; a++) {
                let temp = [];
                temp.push({
                    userName: result[a].userName,
                    theme: result[a].theme,
                    comment: result[a].comment,
                    time: result[a].time
                });
                //console.log(result[a].userName);
                //console.log(result[a].theme);
                //console.log(result[a].comment);
                //console.log(result[a].time);
            }
            db.close();
            //console.log(result);
            return temp;
        });
        while (!temp) {

        }
        return temp;
    });
    //console.log(temp);
    while (!temp) {
        console.log(temp);
    }
    return temp;
}

router.get('/', function (request, response) {
    //Открытие соединения с БД для считывания и передачи данных в представление
    //var temp = getElements();
    //console.log(temp);
    //var elements = getElements().reverse();
    //console.log(elements);
    response.render('index', {
        //elements: temp.reverse(),
        title: "Комментарии"
    });
});

router.post('/', function (request, response) {
    var mongo = require('mongodb').MongoClient;mongo.connect("mongodb://127.0.0.1:27017/commentsdb", function (err, db) {
        console.log('Data is here');
        /*var comm = function (fields) {
            this.userName = fields.userName;
            theme = fields.theme;
            comment = fields.comment;
            time = +fields.time;
        };*/
        db.collection("comments").find().toArray(function(err, result) {
            var temp = [];
            console.log(result.length);
            for (var a = 0; a < result.length - 1; a++) {
                temp.push({
                    userName: result[a].userName,
                    theme: result[a].theme,
                    comment: result[a].comment,
                    time: result[a].time
                });
            }
            temp.sort(function (commA, commB) {
                return commA.time < commB.time;//) return 1;
            });
            response.end(JSON.stringify(temp));
            db.close();
        });
    });
});

router.post('/index', jsonParser, function (request, response) {
    if (!request.body)
        return response.sendStatus(400);
    //Открытие соединения с БД для вставки данных из формы
    var mongo = require('mongodb').MongoClient;
    var mongoURL = "mongodb://127.0.0.1:27017/commentsdb";//Адрес БД
    mongo.connect(mongoURL, function (err, db) {
        var comment = {
            userName: request.body.userName,
            theme: request.body.theme,
            comment: request.body.comment,
            time: +request.body.time
        };
        var conform = require('conform');
        var isComrom = conform.validate(comment, {
            properties: {
                userName: {
                    type: "string",
                    required: true
                },
                theme: {
                    type: "string",
                    required: true
                },
                comment: {
                    type: "any",
                    required: true
                },
                time: {
                    type: "number",
                    required: true
                }
            }
        });
        if (isComrom.valid) {
            db.collection("comments").insertOne(comment, function (err, result) {
                if (err)
                    return console.log(err);
                db.close();
            });
        }
        else {
            console.dir(isComrom.errors);
        }
    });
    response.end(JSON.stringify({
        userName: request.body.userName,
        theme: request.body.theme,
        comment: request.body.comment,
        time: request.body.time
    }));
});

module.exports = router;

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://TrendanBoolan:RumHam96@ds115592.mlab.com:15592/g00350190';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
    var postSchema = new Schema({
        title: String,
        content: String
    })

    var PostData = mongoose.model('Post', postSchema); 

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
// app.post('/name', function(req, res){
//     res.send("Hello you sent " +
//     req.body.firstname + " " +
//     req.body.lastname);
// })

// app.get('/', function (req, res) {
//    res.send('Hello from Express');
// })

// app.post('/api/posts', function(req, res){
//     console.log("post successful");
//     console.log(req.body.title);
//     console.log(req.body.content);


// })


app.post('/api/posts', function(req, res){
    PostData.create({
        title : req.body.title,
        content : req.body.content
    });
    console.log("Inserting Item");
})

app.get('/api/posts', function(req, res){
    PostData.find(function(err,posts){
        if(err)
            res.send(err)
        res.json(posts);
    });
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Mehtods", "GET,POST,DELETE,PUT,OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.delete('/api/posts/:id', function(req, res){
    PostData.deleteOne({_id: req.params.id},
    function (err) {} )
})

// app.get('/getposts/:title', function (req, res){
//     console.log("Get " + req.params.title+" Post");

//     PostData.find({'title': req.params.title},
//         function (err, data){
//             if(err)
//             return handleError(err);

//         res.json(data);
//         });
//     });

/*app.get('/api/posts', function(req, res){

    const posts = 
    [
        { 
            "id": "fadf12421l", 
            "title": "First server-side post", 
            "content": "This is coming from the server" 
        }, 
        { 
            "id": "ksajflaj132", 
            "title": "Second server-side post", 
            "content": "This is coming from the server!" 
        }
    ];

    res.status(200).json({posts:posts})
})*/




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

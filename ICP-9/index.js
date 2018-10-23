var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
app.set('view engine', 'pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://cholleti:Shravya*2689@ds137763.mlab.com:37763/ascicp', function (err) {
    console.log(err);
});
var studentSchema = mongoose.Schema({
    id: Number,
    name: String,
    cos: String,
    major:String,
    minor:String
});
var Student = mongoose.model("users", studentSchema);
app.get('/index', function(req, res){
    res.render('index');
});
app.post('/details', function(req, res){
    var studentInfo = req.body; //Get the parsed information
        var newStudent = new Student({
            id: studentInfo.id,
            fname: studentInfo.fname,
            lname: studentInfo.lname,
            course: studentInfo.course,
            major:studentInfo.major,
            minor: studentInfo.minor

        });

        newStudent.save(function(err, Student){

            console.log(studentInfo);
            if(err)
                res.render('display_details', {message: "Database error", type: "error"});
            else {
                res.render('display_details', {
                        message: "New student added", type: "success", student: studentInfo
                    }
                );
            }
        });


});
app.post('/find', function (req, res) {
    var searchInfo = req.body.search; //Get the parsed information
    console.log(searchInfo);
    Student.find({major: searchInfo}, function (err, response) {
        console.log(response[0].name);
        console.log(response[0].cos);
        console.log(response[0].major);
            res.render('display_details', {
                details: JSON.stringify(response)
            });
    });

});

app.listen(5000);

var express = require('express');
var app = express();
var mongoose = require('mongoose'); //mongoose connection
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// path is used the get the path of our files on the computer
var path = require('path');

var Crud = require('./app/model/Crud');
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb',extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}));
app.use(cookieParser());

// set the templating engine 
app.set('view engine', 'jade');

//set the views folder
app.set('views', path.join(__dirname + '/app/views'));
var dbPath = "mongodb://localhost/CRUD_DB";
// command to connect with database
db = mongoose.connect(dbPath);
mongoose.connection.once('open', function () {
    console.log("database connection open success");
});

app.get('/',function(req,res){

Crud.find(function(err,result){
if(err)
{
	res.render('error',{
		message:"Sorry! Data Can't be displayed..."
	})
}
else
{
	res.render('index',{
		data: result 
	})
}
})
});


app.post('/insert',function(req,res){
var crud = new Crud(req.body);
crud.save(function(err, result){

	if(err){
			res.render('error',{
				message: " sorry! data can't be stored..."
			})
	}
	else
	{
		res.render('index',{
			message:"data inserted SuccessFully!!!",
			data: result
		})
	}
})
});

app.post('/delete',function(req,res){
Crud.findByIdAndRemove({_id:req.body.id},function(err,result){
if(err)
{
	res.render('error',{
		message:"Sorry! Data Can't be displayed..."
	})
}
else
{
	res.render('index',{
		message: "data removed",
		data:result
	})
}
})
});

app.post('/update',function(req,res){
Crud.findOneAndUpdate({_id:req.body.id}, req.body, function(err,result){
if(err)
{
	res.render('error',{
		message:"Sorry! Data Can't be displayed..."
	})
}
else
{        
	res.render('index',{
		message: "Data Updated!!!",
		data:result
	})
}
})
});


app.use(function (err, req, res, next) {
    console.log(err.status);
    res.status(err.status || 500);
    if (err.status == 404) {
        res.render('404', {
            message: err.message,
            error: err
        });
    } else {
        res.render('error', {
            message: err.message,
            error: err
        });
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

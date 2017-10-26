var express = require('express');
var bodyParser = require('body-Parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3334;
var router = express.Router(); 
var models = require('./models')

/*app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.get('/signup', function(req,res){
	res.sendFile(path.join(__dirname + '/public/signup.html'));
})
*/
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }))

app.get('/', function(req,res,next){
	models.User.findAll().then(function(account){
		res.render('index', {userAccount: account})
		
	})
});

app.post('/', function(req, res){

	let createUserAccount = models.User.build({
		username: req.body.username,
		password: req.body.password
	})

	createUserAccount.save().then(function(){
		console.log('new account created..')
	})
	res.redirect('/')
})

app.listen(port, function(){
	console.log('listening to port ' + port);
});
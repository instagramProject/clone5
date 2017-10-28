var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3334;
var router = express.Router(); 
var models = require('./models');
var multer = require('multer');

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

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, __dirname + '/./public/images' )
	},
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
	}
})

var upload = multer({ storage: storage })

app.get('/', function(req,res){
	models.User.findAll().then(function(){
		res.render('index')
		
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

app.get('/homepage', function(req,res){
	res.render('newsfeed/homepage', {title: 'Your Newsfeed', nav: 'Add Post'})
})

app.post('/homepage', upload.single('imageUpload'), function(req,res){
	if (!req.file){
		console.log('no file received..');
		return res.send({
			success:false
		});
	} else {
		console.log('file received..')
			return res.send({
				success:true
			})
		}
	

})

app.listen(port, function(){
	console.log('listening to port ' + port);
});
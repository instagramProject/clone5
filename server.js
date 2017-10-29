var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3334;
var router = express.Router(); 
var models = require('./models');
var multer = require('multer');
var sharp = require('sharp');

var userPhotos = require('./model/photo');
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

	var createUserAccount = models.User.build({
		username: req.body.username,
		password: req.body.password
	})

	createUserAccount.save().then(function(){
		console.log('new account created..')
	})
	res.redirect('/')
})



app.post('/create', upload.single('imageUpload'), function(req,res,next){

	//console.log( __dirname + '/public/images/' + req.file.filename)
	sharp(__dirname + '/public/images/' + req.file.filename)
	.ignoreAspectRatio()
	.resize(300,300)
	.toFile(__dirname + '/public/thumbnails/' + req.file.filename, function(err, info){
		userPhotos.addPhoto(req.body, req.file.filename)
		res.redirect('/homepage')
	})
});

app.get('/create', function(req,res,next){
	res.render('newsfeed/create', {title: 'Homepage', nav: 'Photos'})
	})

app.get('/thumbnails/:id', function(req,res){
	res.sendFile(__dirname + '/public/thumbnails/' + req.params.id);
});

app.get('/:id', function(req,res, next){
	var photos = userPhotos.list(); 
	console.log(req.params.id);
	//console.log(photos)
	//console.log(userPhotos.findById)
	//console.log(userPhotos.photoList[0])
	res.render('newsfeed/homepage', {photos: photos, nav: 'Add Photo' })

	})	

	/*if (!req.file){
		console.log('no file received..');
		return res.send({
			success:false
		});
	} else {
		console.log('file received..')
			return res.send(
				console.log(storage.filename)
				)
	}})*/

app.listen(port, function(){
	console.log('listening to port ' + port);
});
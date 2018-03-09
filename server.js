var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3768;
var router = express.Router(); 

var multer = require('multer');
var sharp = require('sharp');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var userPhotos = require('./model/photo');
var passport = require('passport');
//const db = require('./db').user;
var models = require('./models');
require('./config/config')
require('./strategies/passport-local')(passport); 

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(session({
	key: 'user_sid',
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000
	}
}));
app.use(passport.initialize());
//app.use(

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, __dirname + '/./public/images' )
	},
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
	}
})

var upload = multer({ storage: storage })


app.get('/signup', function(req,res){

	models.Users.findAll().then(function(){
		res.render('signup')
	})
});

app.post('/signup', passport.authenticate('local-signup'), function(req, res){
	res.redirect('/login')
})

app.get('/login', function(req,res){
	res.render('login');
})

app.post('/login', passport.authenticate('local-login'), function(req,res){
	console.log(req.user.id)
	res.redirect('/homepage');
})

app.post('/create', upload.single('imageUpload'), function(req,res,next){
	sharp(__dirname + '/public/images/' + req.file.filename)
	.ignoreAspectRatio()
	.resize(300,300)
	.toFile(__dirname + '/public/thumbnails/' + req.file.filename, function(err, info){
		userPhotos.addPhoto(req.body, req.file.filename)
		models.Post.create({
			caption: req.body.caption,
			fileName: __dirname + 'public/thumbnails/' + req.file.filename
		})
		res.redirect('/homepage')
		//console.log(__dirname + 'public/thumbnails/' + req.file.filename)
		//console.log(req.body.fileName)
		//console.log(req.body.caption)
	})
});

/*app.post('/create', function(req,res){
	models.Post.create({
		caption: req.body.caption,
		fileName: req.body.imageUpload
	})
	.then(()=>{
		res.redirect('/homepage')
	})
})*/

app.get('/create', function(req,res,next){
	res.render('newsfeed/create', {title: 'Homepage', nav: 'Photos'})
	})

app.get('/thumbnails/:id', function(req,res){
	res.sendFile(__dirname + '/public/thumbnails/' + req.params.id);
});


app.get('/:id', function(req,res, next){
	var photos = userPhotos.list(); 
	res.render('newsfeed/homepage', {photos: photos, nav: 'Add Photo'})
});

app.listen(port, function(){
	console.log('listening to port ' + port);
});
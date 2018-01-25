/*var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3768;
var router = express.Router(); 
var models = require('./models');
var multer = require('multer');
var sharp = require('sharp');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var userPhotos = require('./model/photo');
var passport = require('passport');
require('./strategies/passport-local')(passport);

/*app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/public/login.html'));
})

app.get('/signup', function(req,res){
	res.sendFile(path.join(__dirname + '/public/signup.html'));
})

const db = require('./db').user;
require('./config/config')
require('./strategies/passport-local')(passport); 


app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


var session = require('express-session')
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

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
		res.render('index')
	})
}); 


/*app.post('/', passport.authenticate('local-signup'), function(req, res){

	/*var createUserAccount = models.Users.build({
		username: req.body.username,
		password: req.body.password
	})

	createUserAccount.save().then(function(){
		console.log('new account created..')
	})
	res.redirect('/')
})  


app.post('/login', passport.authenticate('local-login'), function(req, res, next){
	if (err) {
		return next(err);
		console.log('first IF triggered.');
	}
	if (!user) {
		return next({error: true, message: info})
	}
	req.login(user, function(loginError){
		if(loginError){
			return next(loginError);
		}
		res.cookie('jwt', user.token);
		res.cookie('username', user.username);
		res.cookie('userID', user.id);
		res.cookie('cookieName', user.dbData);

		return res.redirect('/homepage');
	})
	return router; 
})

app.post('/signup', passport.authenticate('local-signup'), function(req, res){
	res.redirect('/login')
})

app.get('/login', function(req,res){
	res.render('login');
})

/*app.post('/login', passport.authenticate('local-login'), function(req,res){
	res.redirect('/homepage');
})

app.post('/create', upload.single('imageUpload'), function(req,res,next){
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
	res.render('newsfeed/homepage', {photos: photos, nav: 'Add Photo' })

	})	

app.listen(port, function(){
	console.log('listening to port ' + port);
});*/

var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 
var path = require('path');
var port = process.env.PORT || 3768;
var router = express.Router(); 
var models = require('./models');
var multer = require('multer');
var sharp = require('sharp');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var userPhotos = require('./model/photo');
var passport = require('passport');
const db = require('./db').user;
require('./config/config')
require('./strategies/passport-local')(passport); 

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs');

app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));


/*var session = require('express-session')
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))*/
app.use(passport.initialize());
//app.use(passport.session());

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
		res.render('index')
	})
});

app.post('/signup', passport.authenticate('local-signup'), function(req, res){
	res.redirect('/login')
})

app.get('/login', function(req,res){
	res.render('login');
})

app.post('/login', passport.authenticate('local-login'), function(req,res){
	res.redirect('/homepage');
})

app.post('/create', upload.single('imageUpload'), function(req,res,next){
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
	res.render('newsfeed/homepage', {photos: photos, nav: 'Add Photo' })

	})	

app.listen(port, function(){
	console.log('listening to port ' + port);
});
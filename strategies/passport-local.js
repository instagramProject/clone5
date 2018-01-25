var LocalStrategy = require('passport-local').Strategy; 
var bcrypt = require('bcryptjs');
var User = require('../db').Users
//console.log(User)
var saltRounds = 10; 
module.exports = function(passport){

	function getUserParams(req) {
    var body = req.body
    return {
        id: body.id,
        email: body.email,
        username: body.username,
        password: body.password
    	};
	}

	passport.serializeUser(function(user, done){
		done(null, user.id)
	})

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		})
	})

	passport.use('local-signup', new LocalStrategy({
		email: 'email',
		username: 'username',
		password: 'password',
		passReqToCallback: true
	}, processSignupCallback));

	passport.use('local-login', new LocalStrategy({
		username: 'email',
		password: 'password'
	}, processLoginCallback))

	function processSignupCallback(request, email, password, done) {
		User.findOne({
			where: {
				'email': email
			},
			attributes : ['id']
		})
		.then(function(user){
			if(user){
				return done(null, false);
			} else {

				var userToCreate = getUserParams(request);
				console.log(request)
				bcrypt.hash(userToCreate.password, saltRounds, function(err, hash){
				userToCreate.password = hash; 
				User.create(userToCreate)
				.then(function(createdRecord){
					createdRecord.password = undefined;
					return done(null, createdRecord);
					})})
			}})}

	function processLoginCallback(email, password, done){
		User.findOne({
			where: {
				'email': email
			}
		})
		.then(function(user){
			console.log(user.password)
			console.log(password)
			//console.log(result)
			if (!user) {
				return done(null, false)
			}
			else {
			bcrypt.compare(password, user.password, function(err, res){
				
				if (err){
					return done(err)
				}
				if (!res){
					return done(null, false)
				}
				return done(null, user);
				
			})}
		});
	}

}

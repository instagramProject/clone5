var LocalStrategy = require('passport-local').Strategy; 
var bcrypt = require('bcrypt');
var User = require('../db').User
//console.log(User)
var saltRounds = 10; 
module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	})

	passport.use('local-signup', new LocalStrategy({
		username: 'email',
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
				var userToCreate = request.body;

				bcrypt.hash(userToCreate.password, saltRounds, function(err, hash){
				userToCreate.password = hash; 
				User.create(userToCreate)
				.then(function(createdRecord){
					createdRecord.password = undefined;
					return done(null, createdRecord);
					})
				})
			}
		})
	};

	function processLoginCallback(email, password, done){
		User.findOne({
			where: {
				'email' : email 
			}
		})
		.then(function(user){
			if (!user) {
				return done(null, false)
			}
			bcrypt.compare(password, user.password, function(err, result){
				user.password = undefined,
				return result ? done (null,user) : done(null, false);
			})
		})
	}

}

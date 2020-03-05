'use strict';
var user_controller = require('./controllers/UserController');
var note_controller = require('./controllers/NotesController');
var jwt_decoder = require('jwt-decode'); // for parsing token from frontend

var Users = require('./model/Users.js');

function validUser(req, res, next) {
	try {
		if(req.method !="OPTIONS"){
			if (req.headers.authorization.indexOf('null')>-1 ||req.headers.authorization == null || req.headers.authorization == undefined) { throw 'No header auth'; }
			let user_data = jwt_decoder(req.headers.authorization)
		
			if(user_data.username && user_data.username!='undefined'){
		
				var query = { $or: [{ username: user_data.username }] }
				Users.findOne(query).then((found_user) => {
					if (!found_user) {
						found_user = new Users();
					}
					found_user.username = user_data.username;
					found_user.fullname = user_data.fullname;
					found_user.roles = user_data.roles;
	
					Users.findOneAndUpdate(query, found_user, { upsert: true, new: true, returnNewDocument: true }, function (error, data) {
						if (error) {
							throw error;
						}
		
						res.locals.user_id = data._id;
						res.locals.username = data.username;
						next();
					});
				}).catch(err => { commonFunctions.logError(err); });
			}else{
				user_data = user_data.user;
		
				var query = { $or: [{ email: user_data.email }] }
				Users.findOne(query).then((found_user) => {
					if (!found_user) {
						commonFunctions.sendResults(res, false, { redirect: '/login' }, "validUser Access to: '" + req.baseUrl + "' denied. User is invalid")
					}
					res.locals.user_id = found_user._id;
					res.locals.roles = found_user.roles;
					next();
				}).catch(err => { commonFunctions.logError(err); });
			}
			
		}else{
			commonFunctions.sendResults(res, false, "Successfull")
		}
		

	} catch (err) {
		
		commonFunctions.logError(err);
		commonFunctions.sendResults(res, false, { redirect: '/login' }, "validUser Access to: '" + req.baseUrl + "' denied. User is invalid")
	}
}


function validUserOld(req, res, next) {
	try {
		if(req.method !="OPTIONS"){
			next();
			
		}else{
			commonFunctions.sendResults(res, false, "Successfull")
		}
		

	} catch (err) {
		commonFunctions.logError(err);
		commonFunctions.sendResults(res, false, { redirect: '/login' }, "Access to: '" + req.baseUrl + "' denied. User is invalid")
	}
}

module.exports = function (app) {
	var ignorePathRegex = /\/(?!login|site\/jenkins|auth)\S*/;

	app.use(ignorePathRegex, validUser, function (req, res, next) {
		next();
	});



	
	app.post('/login',validUserOld,user_controller.localLogin);
};




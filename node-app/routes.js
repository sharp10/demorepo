'use strict';
var user_controller = require('./controllers/UserController');
var note_controller = require('./controllers/NotesController');
var jwt_decoder = require('jwt-decode'); // for parsing token from frontend
var commonFunctions = require('./config/CommonFunctions.js');
var Users = require('./model/Users.js');

function validUser(req, res, next) {
	try {
		if((req.method !="OPTIONS" && req.headers.authorization)){
			console.log("req.url",req.url);
			console.log("req.method",req.method);
			if((req.url.indexOf('auth/login')>-1)){
				commonFunctions.setSuccess({}, "Successfull",function (response) {
					return res.status(response.status).json(response);
				});
			}
			if (req.headers.authorization.indexOf('null')>-1 ||req.headers.authorization == null || req.headers.authorization == undefined) { throw 'No header auth'; }
			let user_data = jwt_decoder(req.headers.authorization)
			user_data = user_data.user;
			if(user_data.username && user_data.username!='undefined'){	
				var query = { $or: [{ username: user_data.username }] }
				Users.findOne(query).then((found_user) => {
					if (!found_user) {
						found_user = new Users();
					}	
					res.locals.user_id = found_user._id;
					res.locals.username = found_user.username;
					next();
				}).catch(err => { 
					commonFunctions.setFatalError(err,function (response) {
						return res.status(response.status).json(response);
					});
				});
			}			
		}else{
			commonFunctions.setSuccess({}, "Successfull",function (response) {
				return res.status(response.status).json(response);
			});
		}
	} catch (err) {
		console.log(err);
		commonFunctions.setAuthFailedError("validUser Access to: '" + req.baseUrl + "' denied. User is invalid",function (response) {
			return res.status(response.status).json(response);
		});
	}
}


module.exports = function (app) {
	app.use('/api/*', validUser, function (req, res, next) {
		next();
	});

	Users.findOne({}).exec(function(err,data){
		if(!data){
			var saveData = {
				fullname:'Admin',
				username:'admin',
				password:'admin',
			}
			saveData.password = commonFunctions.encryptPassword(saveData.password);
			var addUser = new Users(saveData);
			addUser.save(function (err, result) {		});
		}
	})


	
	app.post('/auth/login',user_controller.Login);

	app.get('/api/notes',note_controller.getNotes);
	app.post('/api/notes',note_controller.saveNotes);
	app.put('/api/notes/:id',note_controller.updateNotes);
	app.delete('/api/notes/:id',note_controller.deleteNotes);
};




'use strict';
var constants = require('../config/constants');
var Users = require('../model/Users.js');
var commonFunctions = require('../config/CommonFunctions.js');
var jwt = require('jwt-simple');
var accessTokenLifetime = 86400 * 48;

exports.Login= function(req,res){
	var mappedErrors = {};

        if (req.body != "") {
            req.checkBody('username', 'username is required').notEmpty();
			req.checkBody('password', 'password is required').notEmpty();
			mappedErrors = req.validationErrors(true);
		}
		
	
		try{
			if (mappedErrors == false) {
				var username = req.body.username;
				var password = req.body.password;
				Users.findOne({username:username}).exec(function(err,data){
					if(data && data.password!=''){
						var authenthicate = commonFunctions.authenticate(password,data.password);
						if(authenthicate == true){
							var userData = {
								user_id:data._id,
								display_name:data.display_name,
								username:data.username
							}
							var expireDate = new Date();
							expireDate.setTime(expireDate.getTime() + accessTokenLifetime * 1000);
			
							var token = jwt.encode({
								user: userData,
								subject: 'SAMPLE',
								exp: expireDate
							}, 'SAMPLE');				
							commonFunctions.setSuccess({token:token}, 'Logged in successfully',function (response) {
								return res.status(response.status).json(response);
							});
						}else{
							commonFunctions.setAuthFailedError('Username/Password is wrong',function (response) {
								return res.status(response.status).json(response);
							});
						}
					}else{
						commonFunctions.setAuthFailedError('Username/Password is wrong',function (response) {
							return res.status(response.status).json(response);
						});
					}
				})
			}else{
				commonFunctions.setValidationError(mappedErrors, function (response) {
					res.status(response.status).json(response);
				});
			}
		}catch(e){
			commonFunctions.setFatalError(e,function (response) {
				return res.status(response.status).json(response);
			});
		}
		
	
}
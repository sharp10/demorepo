'use strict';
var constants = require('../config/constants');
var Users = require('../model/Users.js');
var commonFunctions = require('../config/CommonFunctions.js');
var jwt = require('jwt-simple');
var accessTokenLifetime = 86400 * 48;

exports.localLogin= function(req,res){
	//var user_id = res.locals.user_id;
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
					subject: 'TMO',
					exp: expireDate
				}, 'TMO');				
				commonFunctions.sendResults(res, true,{token:token}, 'Token Has been successfully made');
			}else{
				commonFunctions.sendResults(res, false,{token:''}, 'username/Password is wrong');
			}
		}else{
			commonFunctions.sendResults(res, false,{token:''}, 'username / Password is wrong');
		}
	})
}
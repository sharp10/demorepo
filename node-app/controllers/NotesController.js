'use strict';
var constants = require('../config/constants');
var Notes = require('../model/Notes.js');
var commonFunctions = require('../config/CommonFunctions.js');
var jwt = require('jwt-simple');
var accessTokenLifetime = 86400 * 48;

exports.getNotes= function(req,res){
	//var user_id = res.locals.user_id;
	try{
		Notes.find().exec(function(err,data){
			commonFunctions.setSuccess(data, 'Data Retrived Successfully',function (response) {
				return res.status(response.status).json(response);
			});
		})
	}catch(e){
		commonFunctions.setFatalError(e,function (response) {
			return res.status(response.status).json(response);
		});
	}
}

exports.saveNotes= function(req,res){
	try{
		var mappedErrors = {};

        if (req.body != "") {
            req.checkBody('title', 'title is required').notEmpty();

			mappedErrors = req.validationErrors(true);
		}
		if (mappedErrors == false) {
			var saveData = req.body;
			var addNotes = new Notes(saveData);
			addNotes.save(function (err, result) {	
				if(err){
					commonFunctions.setFatalError(err,function (response) {
						return res.status(response.status).json(response);
					});
				}else{
					commonFunctions.setSuccess({}, 'Data Retrived Successfully',function (response) {
						return res.status(response.status).json(response);
					});
				}
			});
		}else {
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

exports.updateNotes= function(req,res){
	try{
		var mappedErrors = {};

        if (req.body != "") {
            req.checkBody('title', 'title is required').notEmpty();
			req.checkParams('id', 'Note Id is required').notEmpty();
			mappedErrors = req.validationErrors(true);
		}
		if (mappedErrors == false) {
			var saveData = req.body;
			var note_id = req.params.id
			Notes.findByIdAndUpdate({_id:note_id},saveData).exec(function(err,data){
				if(err){
					commonFunctions.setFatalError(err,function (response) {
						return res.status(response.status).json(response);
					});
				}else{
					commonFunctions.setSuccess({}, 'Data updated Successfully',function (response) {
						return res.status(response.status).json(response);
					});
				}
			})
		}else {
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

exports.deleteNotes= function(req,res){	
	try{
		var mappedErrors = {};
		if (req.body != "") {
			req.checkParams('id', 'Note Id is required').notEmpty();
			mappedErrors = req.validationErrors(true);
		}
		if (mappedErrors == false) {
			var note_id = req.params.id
			Notes.findByIdAndRemove({_id:note_id}).exec(function(err,data){
				if(err){
					commonFunctions.setFatalError(err,function (response) {
						return res.status(response.status).json(response);
					});
				}else{
					commonFunctions.setSuccess({}, 'Data deleted Successfully',function (response) {
						return res.status(response.status).json(response);
					});
				}
			})
		}else {
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
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * User Schema
 */
var UsersSchema = new Schema({
	fullname: {
		type: String,
		//required: 'Please fill in a fullname',
		trim: true
	},
	username: {
		type: String,
		//required: 'Please fill in a username',
		trim: true
	},		
	password:{
		type: String,
		default: ''	
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	modified_at: {
		type: Date,
		default: Date.now
	}
});

var collectionName = 'Users';
var Users = mongoose.model('Users', UsersSchema , collectionName); //name of collection is 'Users'

module.exports = Users;
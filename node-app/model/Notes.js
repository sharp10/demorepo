'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Notes Schema
 */
var NotesSchema = new Schema({
	title: {
		type: String,
		//required: 'Please fill in a fullname',
		trim: true
	},
	description: {
		type: String,
		//required: 'Please fill in a username',
		trim: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	modified_at: {
		type: Date,
		default: Date.now
	},
});
var collectionName = 'Notes';
var Notes = mongoose.model('Notes', NotesSchema , collectionName); //name of collection is 'Notes'

module.exports = Notes;
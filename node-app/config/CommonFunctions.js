'use strict';

var crypto = require('crypto');

var key = "52682AC3F56FAC84FDDE2DF325883";
var path = require('path');
var fs = require('fs');
var constants = require("./constants");
var mod_self = this;

exports.encrypt = function (data) {
	var cipher = crypto.createCipher('aes-256-cbc', key);
	var crypted = cipher.update(data, 'utf-8', 'hex');
	crypted = crypted + cipher.final('hex');
	return crypted;
}

exports.decrypt = function (data) {
	var decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(data, 'hex', 'utf-8');
	decrypted = decrypted + decipher.final('utf-8');
	return decrypted;
}

exports.logError = function (message) {
	console.log("message",message);
}

exports.logErrorAndSend = function (message, res) {
	console.log("message",message);
	mod_self.sendResults(res, false, null, "An error has occurred. If it persists, contact the developers");
}

exports.authenticate = function(plainText, hashedPassword) {
    return this.encryptPassword(plainText, key) === hashedPassword;
}

exports.encryptPassword = function(password) {
    if (!password) return '';
    return crypto.pbkdf2Sync(password, key, 10000, 64, 'sha512').toString('hex');
}
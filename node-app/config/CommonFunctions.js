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

/**
 * @description this will make error json error object with params and messages object
 * @param errors
 * @param callback
 * @author pratik shah
 */
exports.setValidationError = function (errors, callback) {
    var err = [];
    var errorsObject = Object.keys(errors).map(function (obj) {
        var errObj = errors[obj];
        delete errObj.location;
        delete errObj.value;
        if (typeof errObj.msg != 'undefined') {
            errObj.message = errObj.msg;
            delete errObj.msg;
        }
        err.push(errObj);
    });
    return callback({
        status: 412,
        message: 'Validation failed',
        error: err,
    });
};
/**
 * @description Seeting a fatal error response catch error response
 * @param errors
 * @param callback
 * @author pratik shah
 */
exports.setFatalError = function (errors, callback) {
    var error = [
        {
            params: errors.name,
            message: errors.message
        }
    ];
    return callback({
        status: 500,
        error: error,
        message: 'There is some problem please try again later'
    });
};
/**
 * @description Seeting a success response
 * @param data
 * @param message
 * @param callback
 * @author pratik shah
 */
exports.setSuccess = function (data, message, callback) {
    return callback({
        status: 200,
        data: data,
        message: message
    });
};

/**
 * @description Seeting a auth error
 * @param error
 * @param callback
 * @author pratik shah
 */
exports.setAuthFailedError = function (error, callback) {
    return callback({
        status: 401,
        error: error,
        message:'Authentication Failed'
    });
};

exports.authenticate = function(plainText, hashedPassword) {
    return this.encryptPassword(plainText, key) === hashedPassword;
}

exports.encryptPassword = function(password) {
    if (!password) return '';
    return crypto.pbkdf2Sync(password, key, 10000, 64, 'sha512').toString('hex');
}
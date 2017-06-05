/**
 * Created by caiomcg on 05/06/17.
 */

'use strict';

/**
 * Error when not find the resource.
 */
exports.notFound = function(message, next) {
    var err = new Error(message || 'The requested resource couldn\'t be found.');
    err.status = 404;
    next(err);
};

/**
 * Error when receive a malformed request syntax.
 */
exports.badRequest = function(message, next) {
    var err = new Error(message || 'The request can\'t be fulfilled due to bad syntax.');
    err.status = 400;
    next(err);
};

/**
 * Error when workers processing.
 */
exports.internalError = function(message, next) {
    var err = new Error(message || 'An internal error occurred while processing.');
    err.status = 500;
    next(err);
};
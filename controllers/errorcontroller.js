/**
 * Created by caiomcg on 05/06/17.
 */

'use strict';

/**
 * Error when not find the resource.
 */
module.exports = function(message, status, next) {
    const err = new Error(message);
    err.status = status;
    next(err);
};
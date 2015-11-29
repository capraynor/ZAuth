/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../database');
var Users = require('./Users')(db);

var GroupsSchema = new Schema({
    gName:String,
    gInfo:String,
    gLevel: Number,
    groups:[Schema.Types.ObjectId],
    users:[Schema.Types.ObjectId]

});
GroupsSchema.virtual('gId').get(function () {
    return this._id;
});

/**
 *
 *
 * @param uId 用户编号
 * @constructor
 * @param cb success callback
 */

GroupsSchema.methods.addUser = function(uId, cb){

    Users.findOne({})

    this.users.push(uId);
    this.markModified('users');
    this.save(cb);
};



mongoose.model('Groups',GroupsSchema);

module.exports = function (connection) {
    'use strict';
    return (connection || mongoose).model('Groups');
};
/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../database').connection;
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
 * @param uId 用户编号
 * @constructor
 * @param cb success callback
 */

GroupsSchema.methods.addUser = function(uId, cb){

    var promise = Users.findOne({uId: uId}).exec();
    promise.then(function (user) {
        if (!user){
            return new Error('Can not find user:'+uId.toString());
        }

        this.users.push(uId);
        this.markModified('users');
        return this.save();
    })
        .then(function (user) {
            console.log('user updated:'+ user.uId);
            cb(null,user);
        })
        .catch(function (err) {
            cb(err);
        });
};



mongoose.model('Groups',GroupsSchema);

module.exports = function (connection) {
    return (connection || mongoose).model('Groups');
};
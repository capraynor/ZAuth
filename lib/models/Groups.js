/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = require('../database').connection;
var Users = require('./Users')(db);

var GroupsSchema = new Schema({
    gName: String,
    gInfo: String,
    gLevel: Number,
    groups: [{type: Schema.Types.ObjectId, ref: 'Groups'}],
    users: [{type: Schema.Types.ObjectId, ref: 'Users'}],
    parent:{type: Schema.Types.ObjectId, ref: 'Groups'}

}, {collection: 'Groups'});
GroupsSchema.virtual('gId').get(function () {
    return this._id;
});

/**
 * @param uId 用户编号
 * @constructor
 * @param cb success callback
 */

GroupsSchema.methods.addUser = function (uId, cb) {

    var _this = this;
    var _uId = uId;

    Users.findOne({_id:uId}, function (err, user) {
        if (!user) {
            return cb(new Error('Can not find this user'));
        }

        if (_this.users.indexOf(uId) > -1){
            return _this.save(cb);

        }

        _this.users.push(uId);
        user.parent.push(_this.gId);
        user.markModified('parent');
        _this.markModified('users');
        return user.save(function (err, group) {
            if (err){
                return cb(err);
            }
            return _this.save(cb)
        });
    });


};

GroupsSchema.methods.addGroup = function (gId, cb) {
    var _this = this;
    var _gId = gId;


    db.model('Groups').findOne({_id:gId}, function (err, group) {
        if (!group){
            return cb(new Error('can not find this group:' + gId));
        }

        if (group.gLevel <= _this.gLevel){//2>1
            return _this.save(cb);
        }

        _this.groups.push(gId);
        _this.markModified('groups');
        group.parent=_this.gId;
        return group.save(function () {
            _this.save(cb);
        });
    })
}


mongoose.model('Groups', GroupsSchema);

module.exports = function (connection) {
    return (connection || mongoose).model('Groups');
};
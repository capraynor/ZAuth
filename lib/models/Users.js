/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    //uId: Schema.Types.ObjectId,
    uName: String,
    uPwd: String,
    uInfo: String
}, {collection: 'Users'});
UsersSchema.virtual('uId').get(function () {
    return this._id;
});

mongoose.model('Users', UsersSchema);


module.exports = function (connection) {

    return (connection || mongoose).model('Users');
};
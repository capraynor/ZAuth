/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * 邮件格式检查
 * @param email
 * @returns {boolean}
 */
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var UsersSchema = new Schema({
    uName: String,
    uPwd: String,
    uInfo: String,
    parent:[{type: Schema.Types.ObjectId, ref: 'Groups'}],
    uEmail: {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
}, {collection: 'Users'});
UsersSchema.virtual('uId').get(function () {
    return this._id;

});



mongoose.model('Users', UsersSchema);

module.exports = function (connection) {
    return (connection || mongoose).model('Users');
};
/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupsSchema = new Schema({
    gId:Schema.Types.ObjectId,
    gName:String,
    gInfo:String,
    groups:[Schema.Types.ObjectId],
    users:[Schema.Types.ObjectId]

});
//group查环 users查重复
//增加一个group/user之前查环/查重

/**
 *
 * @param gId 组号
 * @param uId 用户编号
 * @constructor
 */
GroupsSchema.methods.AddUser = function(gId, uId){
    'use strict';
    
};

mongoose.model('Groups',GroupsSchema);
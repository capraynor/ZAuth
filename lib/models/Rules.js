'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.schema;
var db = require('../database.js').connection;

var RulesSchema = new Schema({
    rName:String,
    groups:[{type: Schema.Types.ObjectId, ref: 'Groups'}],

});
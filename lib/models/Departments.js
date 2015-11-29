/**
 * Created by raynorchan on 15-11-2.
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('../database.js').connection;

var DepartmentsSchema = new Schema({
    dId:Schema.Types.ObjectId,
    dName:{type:String,required:true},  //部门名称
    dInfo:{type:String,required:true},  //部门描述
    dLevel:{type:String,required:true}, //部门级别
    departmentIds:[Schema.Types.ObjectId], //下属部门
    userIds:[Schema.Types.ObjectId] //部门包含的用户

});

/**
 * 增加一个子部门
 * @param childDepartmentId  子部门Id
 * @param callback 回调函数
 */
DepartmentsSchema.methods.appendDepartment = function (childDepartmentId, callback) {
    console.log(this);
};

//获取所有的子部门
DepartmentsSchema.virtual('departments').get(function () {
    this.model('Departments').find({dId:{$in:this.departmentIds}},
        function (err, departments) {
            console.log(departments);
            return departments;
    });
});

//获取所有的部门包含的用户
DepartmentsSchema.virtual('users').get(function () {
    this.model('Users').find({uId:{$in:this.userIds}}, function (err, users) {
        console.log(users);
        return users;
    });
});


mongoose.model('Departments',DepartmentsSchema);

module.exports = function (connection) {

    return (connection || mongoose).model('Departments');
};
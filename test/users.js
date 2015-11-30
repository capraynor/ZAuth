'use strict';


var should = require('chai').should();
var expect = require('chai').expect();


describe('Hello Test', function() {

    it ('complex unit test', function () {
        var foo = 'bar';
        var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

        foo.should.be.a('string');
        foo.should.equal('bar');
        foo.should.have.length(3);
        beverages.should.have.property('tea').with.length(3);
    })
});

describe('Create User', function () {

    var db = require('../lib/database').connection;
    var User = require('../lib/models/Users')(db);


    before('remove test users in Users collection',function (done) {
        User.remove({uInfo:'_____TESTDATA_____'}, function (err) {
            done(err);
        })
    })

    after('remove test users in Users collection',function (done) {
        User.remove({uInfo:'_____TESTDATA_____'}, function (err) {
            done(err);
        })
    })

    it('should not error when user saved', function (done) {
        var db = require('../lib/database').connection;
        var User = require('../lib/models/Users')(db);

        var user = new User({
            uName:'张三',
            uPwd:'abc',
            uInfo:'_____TESTDATA_____',
            uEmail:'test@test.com'
        });

        user.save(function (err, user) {
            if (err){
                done (err);
            }
            user.should.be.an.instanceOf(User);
            user.should.have.property('uId');
            user.should.not.have.property('uid');
            done();
        });
    });

    it('should not be created while email is duplicate', function (done) {
        var db = require('../lib/database').connection;
        var User = require('../lib/models/Users')(db);

        var user = new User({
            uName:'张三',
            uPwd:'abc',
            uInfo:'_____test user',
            uEmail:'test@test.com'
        });

        user.save(function (err, user) {
            if (!err){
                done (new Error('success while email is duplicate'));
            }

            done();

        });
    })
});

describe('Create Group', function () {
    before('remove test groups', function (done) {
        var db = require('../lib/database').connection;
        var Group = require('../lib/models/Groups')(db);
        Group.remove({gInfo:'_____TESTDATA_____'}, function (err) {
            done (err);
        });
    })

    after('remove test groups', function (done) {
        var db = require('../lib/database').connection;
        var Group = require('../lib/models/Groups')(db);
        Group.remove({gInfo:'_____TESTDATA_____'}, function (err) {
            done (err);
        });
    })



    it ('should be not have error while creating group', function (done) {
        var db = require('../lib/database').connection;
        var Group = require('../lib/models/Groups')(db);
        var group = new Group({
            gName:'测试组',
            gInfo:'_____TESTDATA_____',
            gLevel:1
        })

        group.save(function (err, group) {
            if (err){
                done(err);
            }

            group.should.be.an.instanceOf(Group);
            done();
        })
    })
})

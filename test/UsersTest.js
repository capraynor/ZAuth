'use strict';


var should = require('chai').should();

describe('User', function () {
    describe('#CreateUser', function () {
        before('remove test users in Users collection',function (done) {

            var db = require('../lib/database').connection;
            var User = require('../lib/models/Users')(db);
            User.remove({uInfo:'_____TESTDATA_USER_____'}, function (err) {
                done(err);
            })
        })

        after('remove test users in Users collection',function (done) {

            var db = require('../lib/database').connection;
            var User = require('../lib/models/Users')(db);
            User.remove({uInfo:'_____TESTDATA_USER_____'}, function (err) {
                done(err);
            })
        })

        it('should not error when user saved', function (done) {
            var db = require('../lib/database').connection;
            var User = require('../lib/models/Users')(db);

            var user = new User({
                uName:'张三',
                uPwd:'abc',
                uInfo:'_____TESTDATA_USER_____',
                uEmail:'UsersTest@test.com'
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
                uInfo:'_____TESTDATA_USER_____',
                uEmail:'UsersTest@test.com'
            });

            user.save(function (err, user) {
                if (!err){
                    return done (new Error('success while user\'s email is duplicate'));
                }
                return done();

            });
        });

    })

});


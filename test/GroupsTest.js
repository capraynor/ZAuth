'use strict';


var should = require('chai').should();

describe('Group', function () {
    describe('#CreateGroup', function () {
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
        });




        it ('should not have error while creating group', function (done) {
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
                group.should.have.property('gName');
                group.should.have.property('gId');
                done();
            });
        });
    });


    describe('#AddUserToGroup', function () {

        before('remove test groups', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            Group.remove({gInfo:'_____TESTDATA_____'}, function (err) {
                if (err){
                    done (err);
                }
                User.remove({uInfo:'_____TESTDATA_____'}, function (err) {
                    done(err);
                })
            });

        })

        after('remove test groups', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            Group.remove({gInfo:'_____TESTDATA_____'}, function (err) {
                if (err){
                    done (err);
                }
                User.remove({uInfo:'_____TESTDATA_____'}, function (err) {
                    done(err);
                })
            });

        });



        it('should not have error while add user to group', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
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

                user.should.be.an.instanceOf(User)

                var uId = user.uId;

                var group = new Group({
                    gName:'测试组',
                    gInfo:'_____TESTDATA_____',
                    gLevel:1
                });

                group.addUser(uId, function (err) {
                    if (err){
                        done(err);
                    }

                });
                group.save(function (err, group) {
                    if (err){
                        done(err);
                    }

                    group.users.length.should.to.equal(1);
                    group.users[group.users.length-1].should.to.equal(uId);

                    console.log(group.users[0]);

                    done();
                })
            });
        })
    })
})

'use strict';

var should = require('chai').should();

describe('Group', function () {
    describe('#CreateGroup', function () {
        before('remove test groups', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            Group.remove({gInfo: '_____TESTDATA_GROUP_CREATE_____'}, function (err) {
                return done(err);
            });
        })

        after('remove test groups', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            Group.remove({gInfo: '_____TESTDATA_GROUP_CREATE_____'}, function (err) {
                return done(err);
            });
        });


        it('should not have error while creating group', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var group = new Group({
                gName: '测试组',
                gInfo: '_____TESTDATA_GROUP_CREATE_____',
                gLevel: 1
            })
            group.save(function (err, group) {
                if (err) {
                    return done(err);
                }
                group.should.be.an.instanceOf(Group);
                group.should.have.property('gName');
                group.should.have.property('gId');
                return done();
            });
        });
    });


    describe('#AddUserToGroup', function () {

        beforeEach('remove test data', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            Group.remove({gInfo: '_____TESTDATA_GROUP_ADD_USER_____'}, function (err) {
                if (err) {
                    return done(err);
                }
                User.remove({uInfo: '_____TESTDATA_GROUP_ADD_USER_____'}, function (err) {
                    return done(err);
                })
            });

        })

        afterEach('remove test data', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            Group.remove({gInfo: '_____TESTDATA_GROUP_ADD_USER_____'}, function (err) {
                if (err) {
                    return done(err);
                }
                User.remove({uInfo: '_____TESTDATA_GROUP_ADD_USER_____'}, function (err) {
                    return done(err);
                })
            });

        });


        it('should not have error while add user to group', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            var user = new User({
                uName: '张三',
                uPwd: 'abc',
                uInfo: '_____TESTDATA_GROUP_ADD_USER_____',
                uEmail: 'test@test.com'
            });

            user.save(function (err, user) {
                if (err) {
                    return done(err);
                }

                user.should.be.an.instanceOf(User)

                var uId = user.uId;

                var group = new Group({
                    gName: '测试组',
                    gInfo: '_____TESTDATA_GROUP_ADD_USER_____',
                    gLevel: 1
                });
                var _user = user;
                group.addUser(uId, function (err, group) {
                    if (!!err) {
                        return done(err);
                    }
                    group.users.should.to.contain(uId);
                    User.findOne({_id:uId}, function (err, user) {
                        user.parent.should.to.contain(group._id);
                        done(err);
                    });

                });

            });
        });

        it('should not be duplicate while add same user to a group', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var User = require('../lib/models/Users')(db);

            var user = new User({
                uName: '张三',
                uPwd: 'abc',
                uInfo: '_____TESTDATA_GROUP_ADD_USER_____',
                uEmail: 'test@test.com'
            });

            user.save(function (err, user) {
                if (err) {
                    return done(err);
                }

                user.should.be.an.instanceOf(User)

                var uId = user.uId;

                var group = new Group({
                    gName: '测试组',
                    gInfo: '_____TESTDATA_GROUP_ADD_USER_____',
                    gLevel: 1
                });

                group.addUser(uId, function (err) {
                    if (err) {
                        return done(err);
                    }
                    group.addUser(uId, function (err, group) {
                        if (err) {
                            return done(err);
                        }

                        var count = 0;
                        for (var i = 0; i < group.users.length; i++) {
                            if (group.users[i] == uId) {
                                count++
                            }
                        }


                        count.should.to.equal(1);
                        done();
                    })
                });

            });
        })

        //it('should not be added while user is duplicate in a group')
    })
    describe('#DeleteGroup', function () {

        var currentGid = null;

        before('group should be created', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            var group = new Group({
                gName: '测试组',
                gInfo: '_____TESTDATA_GROUP_DELETE_____',
                gLevel: 1
            })
            group.save(function (err, group) {
                if (err) {
                    return done(err);
                }
                group.should.be.an.instanceOf(Group);
                group.should.have.property('gName');
                group.should.have.property('gId');
                currentGid = group.gId;
                return done();
            });
        });

        after('clear test data : _____TESTDATA_GROUP_DELETE_____', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            Group.remove({gInfo: '_____TESTDATA_GROUP_DELETE_____'}, function (err) {
                return done(err);
            });
        });

        it('should be null after the group deleted', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);

            Group.remove({_id: currentGid}, function (err) {
                if (err) {
                    return done(err)
                }

                Group.findOne({_id: currentGid}, function (group) {
                    if (group) {
                        return done(new Error('Error while deleting a group: still exsists after deleted'))
                    }
                    done();
                })
            })
        })
    })
    describe('#AddGroupToGroup', function () {
        var childGroupId = null;
        var parentGroupId = null;


        beforeEach('add test data', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);
            Group.remove({gInfo: '_____TESTDATA_GROUP_ADD_GROUP_____'}, function () {

                var parentGroup = new Group({
                    gName: '测试组',
                    gInfo: '_____TESTDATA_GROUP_ADD_GROUP_____',
                    gLevel: 1
                });
                var childGroup = new Group({
                    gName: '测试组',
                    gInfo: '_____TESTDATA_GROUP_ADD_GROUP_____',
                    gLevel: 2
                });

                parentGroup.save(function (err, group) {
                    parentGroupId = group._id;
                    childGroup.save(function (err, group) {
                        childGroupId = group._id;
                        done(err);
                    })

                })


            })
        })

        afterEach('delete test data', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);

            Group.remove({gInfo: "_____TESTDATA_GROUP_ADD_GROUP_____"}, function (err) {
                return done(err);
            });
        })

        it('should be success while group added', function (done) {

            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);

            Group.findOne({_id: parentGroupId}, function (err, parentGroup) {

                parentGroup.addGroup(childGroupId, function (err, parentGroup) {
                    if (err) {
                        return done(err);
                    }
                    parentGroup.groups.should.to.contain(childGroupId);
                    done();

                })
            })
        });

        it('should not success while group level is wrong', function (done) {
            var db = require('../lib/database').connection;
            var Group = require('../lib/models/Groups')(db);

            Group.findOne({_id: childGroupId}, function (err, parentGroup) {

                parentGroup.addGroup(parentGroupId, function (err, childGroup) {
                    childGroup.groups.should.not.to.contain(parentGroupId);
                    return done();
                });
            });
        });

    })


})

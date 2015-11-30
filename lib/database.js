'use strict';

/**
 * Created by raynorchan on 15-11-2.
 */

var mongoose = require('mongoose');
var databaseOpt = require('../options/dbOptions');
var connection = mongoose.createConnection(databaseOpt.DBADDRESS,databaseOpt.DBOPT);
connection.on('error', function (err) {
    console.log(err);
});

exports.connection = connection;
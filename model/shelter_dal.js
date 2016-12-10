/**
 * Created by JT on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM shelter;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(shelter_id, callback) {
    var query = 'SELECT * FROM shelter WHERE shelter_id = ?';
    var queryData = [shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO shelter (shelterName) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.shelterName];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.delete = function(account_id, callback) {
    var query = 'DELETE FROM shelter WHERE shelter_id = ?';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE shelter SET shelterName = ? WHERE shelter_id = ?';
    var queryData = [params.shelterName, params.shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*
 exports.edit = function(account_id, callback) {
 var query = 'CALL account_getinfo(?)';
 var queryData = [account_id];

 connection.query(query, queryData, function(err, result) {
 callback(err, result);
 });
 };
 */
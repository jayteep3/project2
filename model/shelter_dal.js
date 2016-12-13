/**
 * Created by JT on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM shelter ;';

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
    var query = 'INSERT INTO shelter (shelterName, city, street, zip) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.shelterName, params.city, params.street, params.zip];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.delete = function(shelter_id, callback) {
    var query = 'DELETE FROM shelter WHERE shelter_id = ?';
    var queryData = [shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE shelter SET shelterName = ?, city = ?, street = ?, zip = ? WHERE shelter_id = ?';
    var queryData = [params.shelterName, params.city, params.street, params.zip, params.shelter_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

 exports.edit = function(shelter_id, callback) {
 var query = 'SELECT * FROM shelter WHERE shelter_id = ?';
 var queryData = [shelter_id];

 connection.query(query, queryData, function(err, result) {
 callback(err, result);
 });
 };
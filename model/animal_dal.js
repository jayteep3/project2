/**
 * Created by JT on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback) {
    var query = 'SELECT * FROM animals';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(animal_id, callback) {
    var query = 'SELECT * FROM animals WHERE animal_id = ?';
    var queryData = [animal_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO animals (typeOfAnimal,sex,weight_in_pounds,breed_name,adopterSSN,homeShelt) VALUES (?,?,?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.typeOfAnimal,params.sex,params.weight_in_pounds, params.breed_name, params.adopterSSN,params.homeShelt];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.delete = function(animal_id, callback) {
    var query = 'DELETE FROM animals WHERE animal_id = ?';
    var queryData = [animal_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE animals SET typeOfAnimals = ?,sex = ?, weight_in_Pounds = ?, breed_name = ?, homeShelt = ? WHERE animals_id = ?';
    var queryData = [params.animalsName, params.animals_id];

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
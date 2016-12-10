/**
 * Created by JT on 12/9/2016.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

// VIEW ALL FUNCTION(S):

exports.getAll = function(callback) {
    var query = 'SELECT * FROM animal_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

// VIEW BY ID FUNCTION(S):

exports.getById = function(animals_id, callback) {
    var query = 'SELECT * FROM animal_viewById WHERE animal_id = ?';
    var queryData = [animals_id];
    connection.query(query, queryData, function(err, animals) {
        animalsSkillViewById(animals_id, function (err, animals_skill) {
            animalsCompanyViewById(animals_id, function(err, animals_company) {
                animalsSchoolViewById(animals_id, function(err, animals_school) {
                    callback(err, animals, animals_skill, animals_company, animals_school);
                });
            });
        });
    });
};
/*
var animalsSkillViewById = function(animals_id, callback){
    var query = 'SELECT * FROM animalsSkill_viewById WHERE animals_id = ?';
    connection.query(query, animals_id, function (err, result) {
        callback(err, result);
    });
};
module.exports.animalsSkillViewById = animalsSkillViewById;

var animalsCompanyViewById = function(animals_id, callback){
    var query = 'SELECT * FROM animalsCompany_viewById WHERE animals_id = ?';
    connection.query(query, animals_id, function (err, result) {
        callback(err, result);
    });
};
module.exports.animalsCompanyViewById = animalsCompanyViewById;

var animalsSchoolViewById = function(animals_id, callback){
    var query = 'SELECT * FROM animalsSchool_viewById WHERE animals_id = ?';
    connection.query(query, animals_id, function (err, result) {
        callback(err, result);
    });
};
module.exports.animalsSchoolViewById = animalsSchoolViewById;

*/
// INSERT FUNCTION(S):

exports.insert = function(params, callback) {
    var query = 'INSERT INTO animals (typeOfAnimal, sex, weight_in_Pounds, breed_name, adopterSSN, homeShelt) VALUES (?, ?, ?, ?, ?, ?)';
    // var query2 = 'INSERT INTO animals_skill (skill_id, animals_id) VALUES ?';
    // var query3 = 'INSERT into animals_company (company_id, animals_id) VALUES ?';


    var animalsData = [params.account_id, params.animals_name];
    connection.query(query, animalsData, function(err, result) {
        if(err) {
            console.log(err);
        }
        var animals_id = result.insertId;

        // IF THERYRE NULL THEY CRASH
        animalsSkillInsert(animals_id, params.skill_id, function(err, result) {
            animalsCompanyInsert(animals_id, params.company_id, function(err, result) {
                animalsSchoolInsert(animals_id, params.school_id, function(err, result) {
                    callback(err, result);
                });
            });
        });
    });
};
/*
var animalsCompanyInsert = function(animals_id, companyIdArray, callback) {
    console.log("companyIDArray: " + companyIdArray);
    var query = 'INSERT into animals_company (company_id, animals_id) VALUES ?';

    var animalsCompanyData = [];
    if(companyIdArray instanceof Array) {
        for(var i=0; i < companyIdArray.length; i++) {
            animalsCompanyData.push([companyIdArray[i], animals_id]);
        }
    }
    else {
        animalsCompanyData.push([companyIdArray, animals_id]);
    }
    connection.query(query, [animalsCompanyData], function(err, result) {
        console.log("GETTING HERE COMPANY INSERT FOR animals ");
        console.log(err);
        callback(err, result);
    });
};
module.exports.animalsCompanyInsert = animalsCompanyInsert;

//declare the function so it can be used locally
var animalsSkillInsert = function(animals_id, skillIdArray, callback){
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    console.log("skills to be inserted: " + skillIdArray.length);
    var query = 'INSERT INTO animals_skill (skill_id, animals_id) VALUES ?';
    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var animalsSkillData = [];
    if(skillIdArray instanceof Array) {
        for(var i=0; i < skillIdArray.length; i++) {
            animalsSkillData.push([skillIdArray[i], animals_id]);
        }
    }
    else {
        animalsSkillData.push([skillIdArray, animals_id]);
    }
    connection.query(query, [animalsSkillData], function (err, result) {
        console.log("INSERTING");
        console.log(err);
        callback(err, result);
    });
};
//export the same function so it can be used by external callers
module.exports.animalsSkillInsert = animalsSkillInsert;


var animalsSchoolInsert = function (animals_id, schoolIdArray, callback) {
    // NOTE THAT THERE IS ONLY ONE QUESTION MARK IN VALUES ?
    // console.log("schools to be inserted: " + schoolIdArray);

    var query = 'INSERT INTO animals_school (school_id, animals_id) VALUES ?';
    // TO BULK INSERT RECORDS WE CREATE A MULTIDIMENSIONAL ARRAY OF THE VALUES
    var animalsSchoolData = [];
    if(schoolIdArray instanceof Array) {
        for(var i=0; i < schoolIdArray.length; i++) {
            animalsSchoolData.push([schoolIdArray[i], animals_id]);
        }
    }
    else {
        animalsSchoolData.push([schoolIdArray, animals_id]);
    }
    connection.query(query, [animalsSchoolData], function (err, result) {
        console.log("INSERTING SCHOOLs");
        callback(err, result);
    });
};
module.exports.animalsSchoolInsert = animalsSchoolInsert;
*/



// UPDATE FUNCTION(S):
/*
exports.update = function(params, callback) {
    var query = 'UPDATE animals SET animals_name = ?, user_account_id = ? WHERE animals_id = ?';
    var queryData = [params.animals_name, params.user_account_id, params.animals_id];
    connection.query(query, queryData, function(err, result) {
        animalsSkillDeleteAll(params.animals_id, function(err, result) {
            if (params.skill_id != null) {
                console.log("Params skill id: " + params.skill_id);
                animalsSkillInsert(params.animals_skill, params.skill_id, function (err, result) {
                    callback(err,result);
                });
            } else {
                console.log("skill_id array is null");
                callback(err, result);
            }
        });
    });
};


var animalsSkillDeleteAll = function (animals_id, callback) {

    var query = 'DELETE FROM animals_skill WHERE animals_id = ?';
    var queryData = [animals_id];
    connection.query(query, queryData, function(err, result) {
        console.log("DELETING");
        callback(err, result);
    });
};
module.exports.animalsSkillDeleteAll = animalsSkillDeleteAll;

var animalsCompanyDeleteAll = function (animals_id, callback) {
    var query = 'DELETE FROM animals_company WHERE animals_id = ?';
    var queryData = [animals_id];
    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};
module.exports.animalsCompanyDeleteAll = animalsCompanyDeleteAll;

var updateanimalsSkill = function(animals_id, skillIdArray, callback) {
    var query = 'UPDATE animals_skill SET skill_id = ? WHERE animals_id = ?';

    var skillData = [];
    for (var i = 0; i < skillIdArray.length; i++) {
        skillData.push([skillIdArray[i], animals_id]);
    }
    connection.query(query, skillData, function(err, result) {
        callback(err, result);
    });
};
module.exports.updateanimalsSkill = updateanimalsSkill;
*/

exports.delete = function(animals_id, callback) {
    var query = 'DELETE FROM animals WHERE animals_id = ?';
    var queryData = [animals_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};



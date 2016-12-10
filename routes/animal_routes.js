/**
 * Created by JT on 12/9/2016.
 */
var express = require('express');
var router = express.Router();
var animals_dal = require('../model/animal_dal');
var account_dal = require('../model/breed_dal');
var skill_dal = require('../model/applicant_dal');
var company_dal = require('../model/shelter_dal');



// View All animalss
router.get('/all', function(req, res) {
    animals_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('animal/animalViewAll', { 'result': result });
        }
    });
});

// View the animals for the given id
router.get('/', function(req, res){
    if(req.query.animal_id == null) {
        res.send('animal_id is null');
    }
    else {
        animals_dal.getById(req.query.animals_id, function(err,animals, animals_skill, animals_company, animals_school) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('animal/animalViewById', {animals: animals}); //, animals_skill: animals_skill, animals_company: animals_company, animals_school: animals_school});
            }
        });
    }
});

/*
// Return the add a new animals form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    account_dal.getAll(function(err,account) {
        company_dal.getAll(function(err, company) {
            skill_dal.getAll(function(err, skill) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.render('animals/animalsAdd', {account: account, company: company,
                            skill: skill});
                    }
                });
            });
        });
    });
*/

// insert a animals record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.animal_name == null) {
        res.send('animals Name must be provided.');
    }
    else if(req.query.account_id == null) {
        res.send('An Account Id must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        animals_dal.insert(req.query, function(err,result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/animal/all');
            }
        });
    }
});

// Delete a animals for the given animals_id
router.get('/delete', function(req, res){
    if(req.query.animals_id == null) {
        res.send('animals_id is null');
    }
    else {
        animals_dal.delete(req.query.animals_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/animals/all');
            }
        });
    }
});

/* LAB 12 */
// router.get('/edit', function(req, res){
//     if(req.query.animals_id == null) {
//         res.send('A animals id is required');
//     }
//     else {
//         animals_dal.edit(req.query.animals_id, function(err, result){
//             res.render('animals/animalsUpdate', {school: result[0][0], address: result[1]});
//         });
//     }
// });
/*
router.get('/edit2', function(req, res){
    if(req.query.animals_id == null) {
        res.send('A animals id is required');
    }
    else {
        animals_dal.getById(req.query.animals_id, function(err, animals){
            account_dal.getAll(function(err, account) {
                company_dal.getAll(function(err, company) {
                    company_dal.getByIdX(req.query.animals_id, function(err, companyX) {
                                skill_dal.getAll(function(err, skill) {
                                    skill_dal.getByIdX(req.query.animals_id, function(err, skillX) {
                                        console.log("company: "+ company.length);
                                        console.log("companyX: "+ companyX);
                                        res.render('animals/animalsUpdate', {animals: animals[0], account: account, company: company, school: school, skill: skill,
                                            companyX: companyX, schoolX: schoolX, skillX: skillX });
                                    });
                                });
                        });
                    });
                });
            });
        };
});
*/
router.get('/update', function(req, res){
    animals_dal.delete(req.query.animals_id, function(err, result){
        animals_dal.insert(req.query, function (err, result) {
            res.redirect(302, '/animal/all');
        });
    });
});

module.exports = router;
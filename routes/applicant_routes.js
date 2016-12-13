/**
 * Created by JT on 12/9/2016.
 */
var express = require('express');
var router = express.Router();
var applicant_dal = require('../model/applicant_dal');


// View All applicants
router.get('/all', function(req, res) {
    applicant_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('applicant/applicantViewAll', { 'result':result });
        }
    });

});

// View the applicant for the given id
router.get('/', function(req, res){
    if(req.query.applicant_id == null) {
        res.send('applicant_id is null');
    }
    else {
        applicant_dal.getById(req.query.applicant_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('applicant/applicantViewById', {'result': result});
            }
        });
    }
});

// Return the add a new applicant form
router.get('/add', function(req, res){
    res.render('applicant/applicantAdd');
});

// insert a applicant record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.applicantName == null) {
        res.send('an applicant must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        applicant_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/applicant/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.applicant_id == null) {
        res.send('A applicant id is required');
    }
    else {
        applicant_dal.edit(req.query.applicant_id, function(err, result){
            console.log(result);
            //need to change this line
            res.render('applicant/applicantUpdate', {applicants: result[0]});//, address: result[1]});
        });
    }

});

router.get('/update', function(req, res) {
    applicant_dal.update(req.query, function(err, result){
        res.redirect(302, '/applicant/all');
    });
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.applicant_id == null) {
        res.send('applicant_id is null');
    }
    else {
        applicant_dal.delete(req.query.applicant_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/applicant/all');
            }
        });
    }
});


module.exports = router;
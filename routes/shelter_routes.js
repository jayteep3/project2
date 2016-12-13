/**
 * Created by JT on 12/9/2016.
 */
var express = require('express');
var router = express.Router();
var shelter_dal = require('../model/shelter_dal');


// View All shelters
router.get('/all', function(req, res) {
    shelter_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('shelter/shelterViewAll', { 'result':result });
        }
    });

});

// View the shelter for the given id
router.get('/', function(req, res){
    if(req.query.shelter_id == null) {
        res.send('shelter_id is null');
    }
    else {
        shelter_dal.getById(req.query.shelter_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('shelter/shelterViewById', {'result': result});
            }
        });
    }
});

// Return the add a new shelter form
router.get('/add', function(req, res){
    res.render('shelter/shelterAdd');
});

// insert a shelter record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.shelterName == null) {
        res.send('a shelter must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        shelter_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/shelter/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.shelter_id == null) {
        res.send('A shelter id is required');
    }
    else {
        shelter_dal.edit(req.query.shelter_id, function(err, result){
            console.log(result);
            //need to change this line
            res.render('shelter/shelterUpdate', {shelter: result[0]});//, address: result[1]});
        });
    }

});

router.get('/update', function(req, res) {
    shelter_dal.update(req.query, function(err, result){
        res.redirect(302, '/shelter/all');
    });
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.shelter_id == null) {
        res.send('shelter_id is null');
    }
    else {
        shelter_dal.delete(req.query.shelter_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/shelter/all');
            }
        });
    }
});


module.exports = router;
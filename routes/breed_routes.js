/**
 * Created by JT on 12/9/2016.
 */
var express = require('express');
var router = express.Router();
var breed_dal = require('../model/breed_dal');


// View All breeds
router.get('/all', function(req, res) {
    breed_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('breed/breedViewAll', { 'result':result });
        }
    });

});

// View the breed for the given id
router.get('/', function(req, res){
    if(req.query.breed_id == null) {
        res.send('breed_id is null');
    }
    else {
        breed_dal.getById(req.query.breed_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('breed/breedViewById', {'result': result});
            }
        });
    }
});

// Return the add a new breed form
router.get('/add', function(req, res){
    res.render('breed/breedAdd');
});

// insert a breed record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.breedName == null) {
        res.send('a breed must be provided.');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        breed_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/breed/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.breed_id == null) {
        res.send('A breed id is required');
    }
    else {
        breed_dal.edit(req.query.breed_id, function(err, result){
            console.log(result);
            //need to change this line
            res.render('breed/breedUpdate', {breed: result[0][0], address: result[1]});
        });
    }

});

router.get('/update', function(req, res) {
    breed_dal.update(req.query, function(err, result){
        res.redirect(302, '/breed/all');
    });
});


// Delete a address for the given address_id
router.get('/delete', function(req, res){
    if(req.query.breed_id == null) {
        res.send('breed_id is null');
    }
    else {
        breed_dal.delete(req.query.breed_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/breed/all');
            }
        });
    }
});


module.exports = router;
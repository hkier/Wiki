var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User;
var Page = models.Page;

router.get('/', function(req, res, next){
    // res.send('message for get /');
    User.findAll()
    .then(function(foundUsers){
        res.render('users', {
           users: foundUsers
    });
  })
  .catch(next);
});

router.get('/:userId', function (req, res, next) {

  var pagePromise = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  var userPromise = User.findOne({
    where: {
      id: req.params.userId
    }
  });

  Promise.all([pagePromise, userPromise])
  .then(function(values){
    res.render('index', {
        pages: values[0],
        userName: values[1].dataValues.name
    });
  })
  .catch(next);

});

module.exports = router;

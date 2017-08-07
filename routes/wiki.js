var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next){
    // res.send('message for get /');
    res.redirect('/');
});

router.post('/', function(req, res, next){
    // res.send('message for post /');
    // res.json(req.body);

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then(function () {
      res.json(req.body);
  })
  .catch(function (err) {
      if (err) throw err;
  });
  // -> after save -> res.redirect('/');
});

router.get('/add', function(req, res, next){
    // res.send('message for get /add');
    res.render('addpage');
});

module.exports = router;
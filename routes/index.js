var express = require('express');
var Pending = require('../models/pending');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('idx', { title: 'Express' });
});

router.post('/studentInfo', function(req, res, next) {
    var studentName = req.body.studentName;
    var studentMobile = req.body.studentMobile;

    //console.log(studentName + '   ' + studentMobile);

    pending = new Pending ({
        studentName: studentName,
        studentMobile: studentMobile
    });

    pending.save(function(err, data) {
        if(err) {
            console.log('Errro in save data: ' + err);
        } else {
            console.log('Successfully add');
            res.redirect('/pending');
        }
    });

    //  res.render('studentRequest', { title: 'Express' });
});

router.get('/pending', function(req, res, next) {
    Pending.find(function(err, data) {
        if(err) {
            console.log('Error: ' + err);
        } else {
           // console.log(data);

            var studentInfo = [];
            for(var index=0; index<data.length; index++) {
                if(data[index].status == 0) {
                    studentInfo.push(data[index]);
                }
            }
            res.render('pendingList', {
                pending: studentInfo
            });
        }
    });

});

router.get('/permanent', function(req, res, next) {
    Pending.find(function(err, data) {
        if(err) {
            console.log('Error: ' + err);
        } else {
            //console.log(data);

            var studentInfo = [];
            for(var index=0; index<data.length; index++) {
                if(data[index].status == 1) {
                    studentInfo.push(data[index]);
                }
            }
            res.render('permanentList', {
                pending: studentInfo
            });
        }
    });

});

router.get('/remove/:studentId', function(req, res, next) {
    var studentId = req.params.studentId;

    //console.log('id is: ' + studentId);

    Pending.findOneAndRemove({_id: studentId}, function (err, success) {
        if(err) {
            console.log('Error');
        } else {
            res.redirect('/pending');
        }
    });

});

router.get('/add/:studentId', function(req, res, next) {
    var studentId = req.params.studentId;

    console.log('id is: ' + studentId);

    Pending.findById({_id: studentId}, function (err, stInfo) {
        if(err) {
            console.log('Error');
        } else {
            stInfo.status = 1;
            stInfo.save(function (err, succ) {
                if(err) {
                    console.log('Error in updating');
                } else {
                    res.redirect('/pending');
                }
            });
        }
    });

});




module.exports = router;

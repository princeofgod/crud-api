var express = require('express');
const { validationResult } = require('express-validator');
const { validateData, validateSearch, validateUpdate } = require('../helpers/validate');
const userController = require('../controllers/user')
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json({
//     message : 'Welcome to users API'
//   });
// });

router.post('/create',validateData, userController.createOne);

router.get('/readall', userController.getAll);

router.patch('/update',validateUpdate, userController.updateOne)


router.delete('/delete', userController.deleteOne)


router.get('/search', userController.search)
module.exports = router;

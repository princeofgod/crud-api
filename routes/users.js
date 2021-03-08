var express = require('express');
const { validationResult } = require('express-validator');
const { validateData, validateSearch } = require('../helpers/validate');
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

router.patch('/update', userController.updateOne)


router.delete('/delete', async (req, res) => {
  const deleted = await userController.deleteOne(req.body)
  res.json({
    deleted
  })
})


router.get('/search',validateSearch, async (req, res) => {
  const result = validationResult(req);

  if(!result.isEmpty()){
    const err = []
    result.array().forEach( el => {
      err.push(el.msg)
    });
    res.json({
      errors : err
    });
  } else {
      const searchResult = await userController.searchByEmail(req.body);
      res.json({
        searchResult
      });
  }
})
module.exports = router;

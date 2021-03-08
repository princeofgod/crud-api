const User = require("../models/users")
const AppError = require('../utils/appError');
const { validationResult } = require('express-validator');
const { validateUpdate } = require("../helpers/validate");

exports.createOne = async (req, res) => {
    console.log(req.body)
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                console.log("1+++++++++++++++++++++ i am here")
                return res.status(422).json({
                    errors: result.array()
                })
                
            } 

            var data = await User.create(req.body)
            // var data = await userController.createOne(req.body);
    
            res.status(200).json({
                success : "User successfully created!",
                data
            })
            } catch (error) {
            return error;
        }
    // }
}

exports.getAll = async (req, res) => {
    try {
        const users = await User.find({});
                                
        res.status(200).json({
            success : "success",
            users
        })    
    } catch (error) {
        next(error);
    }
}

exports.deleteOne = async (req, res, next) => {
    
    try {

        const deleted = await User.deleteOne({email:req.body.email});
        if (!deleted) {
            return next(new AppError(404, 'Not found', 'No document found with that id'), req, res, next);
        }
        res.status(200).json()
        
    } catch (error) {
        next(error);
    }
}


exports.updateOne = async (req, res, next) => {

    try {
            const result = validationResult(req);
            if(!result.isEmpty()){
                return res.status(422).json({
                    result: result.array()
                })
            }
    
            const updated = await User.updateOne({email:req.body.email},{$set : req.body}, {new:true});     
    
            if (!updated) {
                return next(new AppError(404, 'Not found', 'No document found with that id'), req, res, next);
            }else{

                res.status(200).json({
                    status: "updated",
                    updated
                })
            } 
    
        } catch (error) {
            return error
        }


}

exports.search = async (req, res) => {
    var query = req.body.query
   try {
    const result = validationResult(req);
  
    if(!result.isEmpty()){
      return res.status(422).json({
        errors : result.array()
      });
    } else {
        if (query.split('').includes('@')) {
            console.log("1===", req.body)
            const users = await User.find({email:query});
            res.json({
                users
              });
        } else {
            if(query.match(/^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/)) {
                console.log("2===", req.body)
                const users = await User.find({_id : query});
                res.json({
                    users
                  });
            } else if(query.match(/^[0-9]+$/)) {
                console.log("3===", req.body)
                const users = await User.find({phone : query});
                res.json({
                    users
                  });
            } else {
                console.log("4===", req.body)
                const users = await User.find({ $text : {$search: query,$caseSensitive: false} });
                res.json({
                  users
                });
            }
            
        }
    }
   } catch (error) {
       
   }
  }
  
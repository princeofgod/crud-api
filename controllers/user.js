const User = require("../models/users")
const AppError = require('../utils/appError');

exports.createOne = async (req, res) => {
    try {
        const result = validationResult(req);
        if(!result.isEmpty()){
          const err = []
          result.array().forEach( el => {
            err.push(el.msg)
          });
          res.json({
            errors : err
          });
        } 

        var data = await userController.createOne(req.body);

        res.status(200).json({
            success : "User successfully created!",
            data
        })

    } catch (error) {
        return error;
    }
}

exports.getAll = async (req, res) => {
    try {
        const users = await User.find({});
                                
        res.status(200).json({
            success : "success",
            users
        })    
    } catch (error) {
        return error;
    }
}

exports.deleteOne = async (data) => {
    const deleted = await User.deleteOne({email:data.email},(err, item) => {
                                if (err) {
                                    throw new Error(err)
                                }
                                if(item) {
                                    return item;
                                }
                            });
    return deleted;
}

exports.updateOne = async (req, res) => {

    try {

        const updated = await User.updateOne({email:req.body.email},{$set : req.body}, {upsert:true, new:true});     

        if (!updated) {
            return next(new AppError(404, 'Not found', 'No document found with that id'), req, res, next);
        };

        res.json(200, {
            status: "updated",
            updated
        })
        

    } catch (error) {
        return error
    }
}
const User = require("../models/users")

exports.createOne = async (data) => {
    await User.create(data)
}


exports.getAll = async () => {
     const users = await User
                            .find({})
                                .then(items => {
                                    return items;
                                })
                return users;
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

exports.updateOne = async (data) => {
    const updated = await User.updateOne({email:data.email},{$set : data}, {upsert:true, new:true}, (err, item) => {
        if (err) {
            throw new Error(err);
        };
        if (item) {
            return item;
        }
    });

    return updated;
}

exports.searchByEmail = async (data) => {
    const searchResult = await User.find({email:data.email}).then(item => {
        return item;
    }).catch(err => {
        throw new Error(err);
    })
    return searchResult;
}

exports.searchByFirstname = async (data) => {
    const searchResult = await User.find({firstname:data.firstname}).then(item => {
        return item;
    }).catch(err => {
        throw new Error(err);
    })
    return searchResult;
}

exports.searchByLastname = async (data) => {
    const searchResult = await User.find({lastname:data.lastname}).then(item => {
        return item;
    }).catch(err => {
        throw new Error(err);
    })
    return searchResult;
}
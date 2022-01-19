const mongoose = require('mongoose');
const product = mongoose.model("product");
module.exports = {
    insert(req, res) {
        console.log(req.body);
        console.log('req.body._id'+req.body._id);
        if (req.body._id != 'null') {
            console.log('--------------------update query'+req.files);
            product.find({
                "_id": req.body._id
            }).then((usrresult) => {
                if (usrresult.length != 0) {
                    usrresult[0].update({
                        imageTitle: req.body.imageTitle,
                        imageDiscription: req.body.imageDiscription,
                        image: req.files[0].filename || usrresult[0].image,
                        category: req.body.category,
                        itemforSale: req.body.itemforSale,
                        itemPrice: req.body.itemPrice,
                        accept: req.body.accept,
                    }).then((result) => {
                        return res.status(200).json({
                            "status": true,
                            "message": "product Updated Sucessfully"
                        })
                    }).catch((err) => {
                        return res.status(200).json({
                            "status": false,
                            "message": err.message
                        })
                    });
                } else {
                    return res.status(200).json({
                        "status": false,
                        "message": "no record found"
                    })
                }

            }).catch((err) => {
                res.status(200).json({
                    "status": false,
                    "message": err.message
                })
            });

        }
        else {
            console.log('------insert query -----------------');
            console.log(req.files);
            product.create({
                imageTitle: req.body.imageTitle,
                imageDiscription: req.body.imageDiscription,
                image: req.files[0].filename,
                category: req.body.category,
                itemforSale: req.body.itemforSale,
                itemPrice: req.body.itemPrice,
                accept: req.body.accept,
            }).then((result) => {
                return res.status(200).json({
                    "status": true,
                    "message": "product Create Sucessfully............"
                })
            }).catch((err) => {
                return res.status(200).json({
                    "status": false,
                    "message": err.message
                })
            });
        }
    },
    list(req, res) {
        product.aggregate([{
            $match: {
                isdeleted: 0,
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
        ]).then((data) => {
            if (data.length) {
                return res.status(200).send({
                    status: true,
                    "message": "product List",
                    list: data
                });
            }
            else {
                return res.status(200).send({
                    status: false,
                    "message": "No Record Found...",
                });
            }
        })
            .catch((error) => {
                return res.status(400).send({
                    status: false,
                    message: error,
                });
            });
    },
    delete(req, res) {
        product
            .findById(req.body._id)
            .then((data) => {
                if (!data) {
                    return res.status(404).json({
                        status: false,
                        message: "Data Not Found",
                    });
                }
                return data
                    .update({
                        isdeleted: 1,
                    })
                    .then((data1) =>
                        res.status(200).json({
                            status: true,
                            message: "Record deleted SuccessFully",
                        })
                    )
                    .catch((error) => res.status(400).json({
                        status: false,
                        message: error.message
                    }
                    ));
            })
            .catch((error) => res.status(400).json({
                status: false,
                message: error.message
            }
            ));
    },

}
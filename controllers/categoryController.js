const Category = require('../models/Category');
const {errorHandler} = require('../helpers/dberrorHandler');

exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({data})
    })
}

exports.listCategories = (req,res)=>{
    Category.find().exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.removeCategory = (req,res)=>{
    let category = req.category;
    category.remove((err, category)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            msg: "Category successfully deleted"
        });
    })
}


exports.categoryById = (req, res, next, id)=>{
    Category.findById(id).exec((err, category)=>{
        if (err || !category) {
            return res.status(400).json({
                error: "Category was not found"
            });
        }
        req.category = category;
        next();
    })
}

exports.read = (req, res) =>{
    return res.json(req.category)
}

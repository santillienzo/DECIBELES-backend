const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Product = require('../models/Product');
const {errorHandler} = require('../helpers/dberrorHandler')


exports.createProduct = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtension = true;
    form.parse(req, (err, fields, files)=>{
        if (err) {
            return res.status(400).json({
                error: "Image could not be upload"
            })
        }

        const {name, description, price, category, quantity, status} = fields;
        const product = new Product(fields);

        if(files.photo){
            const file = files.photo.type;
            // console.log(files.photo)
            if(file === null){
                return res.status(400).json({
                    error: "No has colocado imagen al producto!"
                })
            }

            if (file !==  "image/png" && file !== "image/jpg" && file !== "image/jpeg"){
                return res.status(400).json({
                    error: "El archivo no es una imagen"
                })
            }
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1MB in size"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result)=>{
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result)
        })
    }) 
}

exports.updateProduct = (req, res)=>{
    return 0;
}

exports.listProducts = (req, res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name';

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .exec((err,product)=>{
            if (err) {
                return res-status(400).json({
                    error: "Product not found"
                })
            }
            res.json(product)
        })
}

exports.removeProduct = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Producto eliminado correctamente"
        })
    })
}

exports.productById = (req, res, next, id)=>{
    Product.findById(id)
        .populate("category")
        .exec((err, product)=>{
            if (err || !product) {
                console.log(product);
                return res.json({
                    error: "Producto no encontrado"
                })
            }
            req.product = product;
            next();
        })
}

exports.photo = (req, res, next)=>{
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

exports.read = (req, res)=>{
    req.product.photo = undefined;
    return res.json(req.product);
}

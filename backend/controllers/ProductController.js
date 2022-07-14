/**
 * Models Modules
 */
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');

/**
 ***************************** GET Requests *****************************
 */

// Get all Products => /api/v1/products
exports.getProducts = async(req, res, next) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products
    })
}


/**
 ***************************** POST Requests *****************************
 */

// Create new Product (The admin can do this only) => /api/v1/admin/product/new
exports.newProduct = async(req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

/**
 ***************************** SHOW Requests *****************************
 */

// Get single product details  => /api/v1/product/:id
exports.getSingleProduct = async(req, res, next) => {

    const ProductId = req.params.id;
    const product = await Product.findById(ProductId);
    if (!product) {
        // return res.status(404).json({
        //     success: true,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })

}

/**
 ***************************** PUT Requests *****************************
 */

// Update Product (The admin can do this only)  => /api/v1/admin/product/edit/:id
exports.updateProduct = async(req, res, next) => {

    const ProductId = req.params.id;
    let product = await Product.findById(ProductId);
    if (!product) {
        return res.status(404).json({
            success: true,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(ProductId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

}

/**
 ***************************** DELETE Requests *****************************
 */

// Delete Product (The admin can do this only)  => /api/v1/admin/product/delete/:id

exports.deleteProduct = async(req, res, next) => {

    const ProductId = req.params.id;
    const product = await Product.findById(ProductId);
    if (!product) {
        return res.status(404).json({
            success: true,
            message: 'Product not found'
        })
    }

    await Product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is Deleted'
    })

}
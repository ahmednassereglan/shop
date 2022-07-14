/**
 * Models Modules
 */
const Product = require('../models/product');


/**
 * GET requests
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
 * POST requests
 */

// Create new Product => /api/v1/product/new
exports.newProduct = async(req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

/**
 * SHOW requests
 */
// Get single product details  => /api/v1/product/:id
exports.getSingleProduct = async(req, res, next) => {

    const ProductId = req.params.id;
    const product = await Product.findById(ProductId);
    // const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: true,
            message: 'Product not found'
        })
    }

    res.status(200).json({
        success: true,
        product
    })


}
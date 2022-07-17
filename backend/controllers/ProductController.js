/**
 * Models Modules
 */
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
    /**
     ***************************** GET Requests *****************************
     */

// Get all Products => /api/v1/products OR /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async(req, res, next) => {

    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    // apiFeatures.pagination(resPerPage)
    // products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})


/**
 ***************************** POST Requests *****************************
 */

// Create new Product (The admin can do this only) => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

/**
 ***************************** SHOW Requests *****************************
 */

// Get single product details  => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {

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

})

/**
 ***************************** PUT Requests *****************************
 */

// Update Product (The admin can do this only)  => /api/v1/admin/product/edit/:id
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {

    const ProductId = req.params.id;
    let product = await Product.findById(ProductId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
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

})

/**
 ***************************** DELETE Requests *****************************
 */

// Delete Product (The admin can do this only)  => /api/v1/admin/product/delete/:id

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {

    const ProductId = req.params.id;
    const product = await Product.findById(ProductId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    await Product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is Deleted'
    })

})
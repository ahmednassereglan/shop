/**
 * Models Modules
 */
const Product = require('../models/product');


/**
 * Middlewares Modules
 */
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


/**
 * Utils Modules
 */
const ErrorHandler = require('../utils/errorHandler');
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

    req.body.user = req.user.id;
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

/**
 ***************************** Review *****************************
 */


// Create new review   =>   /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})



// Get Product Reviews   =>   /api/v1/reviews?id=:id
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


// Delete Product Review   =>   /api/v1/reviews?productId
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    // console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
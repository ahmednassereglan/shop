/**
 * Models Modules
 */
const Order = require('../models/order');
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
// Get single order   =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const OrderId = req.params.id;
    const order = await Order.findById(OrderId).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders - ADMIN  =>   /api/v1/admin/orders/
exports.allOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    let countOrders = orders.length;

    res.status(200).json({
        success: true,
        countOrders,
        totalAmount,
        orders
    })
})



/**
 ***************************** POST Requests *****************************
 */
// Create new Order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async(req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,

    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });
    res.status(201).json({
        success: true,
        message: 'Successfully Order',
        order
    })
})


/**
 ***************************** PUT Requests *****************************
 */
// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        message: 'Successfully Update'
    })
})


async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

/**
 ***************************** DELETE Requests *****************************
 */
// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: 'Order Deleted'
    })
})
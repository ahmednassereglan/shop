const User = require('../models/user');


const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');


const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
/**
 ***************************** POST Requests *****************************
 */

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: 'avatars',
    //     width: 150,
    //     crop: "scale"
    // })

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            "public_id": "products/dsvbpny402gelwugv2le",
            "url": "https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg"
        }
    })

    sendToken(user, 200, res)

})


// Login a user   => /api/v1/login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Password', 401));
    }

    sendToken(user, 200, res)
})

// Logout a user   => /api/v1/logout
exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})
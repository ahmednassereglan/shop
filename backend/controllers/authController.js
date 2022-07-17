const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
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

    // sendToken(user, 200, res)

    res.status(201).json({
        success: true,
        user,

    })

})
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            require: true,
            maxlength:32,
        },
        description:{
            type: String,
            trim: true,
            require: true,
            maxlength:2000,
        },
        price:{
            type:Number,
            trim: true,
            require: true,
        },
        photo:{
            data:Buffer,
            contentType: String,
        },
        status:{
            type: Number,
            trim: true,
            default: 0,
        },
        quantity:{
            type: Number,
            trim: true,
            require: true,
        },
        category:{
            type: ObjectId,
            ref:'Category',
            require:true
        },
        is_banner:{
            type: Boolean,
            default: false
        },
        description_Banner:{
            type: String,
            trim: true,
            maxlength:2000,
            default:""
        },
        is_BestSeller:{
            type: Boolean,
            default: false
        },
        color:{
            type: String,
            require:true,
            default: "#fff"
        }
    },
    {timestamps: true}
)


module.exports = mongoose.model("Product", productSchema);
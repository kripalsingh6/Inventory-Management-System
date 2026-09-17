import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'product name is required'],
        unique: true,
        trim : true
    },
    price: {
        type:Number,
        required : [true,'price required'],
        validate : {
            validator : function(value){
                return (value>0);
            },
            message:"product price must be greater than zero"
        }
    },
     availableStock:{
        type:Number,
        required : [true, 'Available stock cannot be negative'],
        default:0
     },
},
{timestamps:true});

const Product = mongoose.model("Product",productSchema);

export default Product;
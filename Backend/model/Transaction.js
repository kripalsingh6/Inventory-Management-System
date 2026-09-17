import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    productId: {
        type : mongoose.Schema.ObjectId,
        ref:'Product',
        required: [true, 'product id is required'],
    },
    transactionType:{
        type : String,
        enum : {
            values:['purchase','restock'],
            message:'valid transaction type'
        },
        required:[true , 'transaction type is required ']
    },
    quantity:{
        type:Number,
        required: [true, 'quantity is required '],
        validate : {
            validator : function(value){
                return (value>0);
            },
            message:"Quantity must be greater than zero"
        }
    },
    transactionDate:{
        type:Date,
        default:Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
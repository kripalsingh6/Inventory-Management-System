import Product from "../model/product.js";
import Transaction from "../model/Transaction.js";

// post new product 

export const createProduct = async(req ,res)=>{
   try{
    const {name , price , availableStock} = req.body;

    const product = new Product({name , price , availableStock});
    await product.save();

    res.status(201).json({
        message:'Product create successfully',
        product
    })
   }catch(error){
    res.status(400).json({
        error:error.message
    })
   }
};
 // get retrieve list form database
export const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find();
       res.status(200).json(products);
    }catch(error){
        res.status(500).json({
            error:'failed to retrive'
        })
    }
}

// post purchase product

export const purchaseProduct = async(req,res)=>{
    try{
        const {productId , quantity} = req.body;

        if(!productId || quantity <= 0){
            return res.status(400).json({
            error: 'purchase quantity must be greater then zero'
        })
        };

         const product = await Product.findById(productId);

        if(!product){
            return res.status(404).json({
            error: 'product not found '
        })
        }
        if(product.availableStock < quantity){
            return res.status(400).json({
                error: 'insufficient Stock '
            })
        }

        product.availableStock -= quantity;
        await product.save();

        const transaction = new Transaction({
            productId ,
            transactionType: 'purchase',
            quantity
        });
        await transaction.save();

        res.status(200).json({
            message: 'purchase successful' , 
            transaction, 
            product
        })
    }catch(error){
         res.status(400).json({
            error: error.message
        })
    }
}

// POST /products/restock

export const restockProduct = async(req,res)=>{
    try{
         const {productId , quantity} = req.body;

          if(!quantity || quantity <= 0){
            return res.status(400).json({
            error: 'restock quantity must be greater then zero'
        })
        };
          const product = await Product.findById(productId);
            if(!product){
            return res.status(404).json({
            error: 'product not found '
        })
    }
    product.availableStock += quantity;
        await product.save();
 
          const transaction = new Transaction({
            productId ,
            transactionType: 'restock',
            quantity
        });
        await transaction.save();

         res.status(200).json({
            message: 'restock successfully' , 
            transaction, 
            product
        })
    }catch(error){
        res.status(400).json({
            error: error.message
        }) 
    }
}

// GET /products/:product Id/history
export const getProductHistory = async(req,res)=>{
  try{
   const {productId} = req.params;

   const product  = await Product.findById(productId);

   if(!product){
    return res.status(404).json({
        error: 'product not found'
    })
   }
   const transactions = await Transaction.find({productId}).sort({transactionDate: -1});
   res.status(200).json(transactions);
  }catch(error){
   res.status(500).json({
            error: 'failed to retrieve transaction history'
        }) 
  }
}
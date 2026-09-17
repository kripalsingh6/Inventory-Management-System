import express from 'express';
import {
    createProduct,
    getAllProducts,
    purchaseProduct,
    restockProduct,
    getProductHistory
} from '../controllers/productController.js';

const router = express.Router();

router.post('/',createProduct);

router.get('/',getAllProducts);

router.post('/purchase' , purchaseProduct);

router.post('/restock', restockProduct);

router.get('/:productId/history', getProductHistory);

export default router;
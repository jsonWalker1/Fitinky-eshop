import express from 'express';
import { getIndex, getIndexJson, getProducts, getCart, getLogin, getCheckout, getOrders } from '../controllers/indexController.js';

const router = express.Router();

// GET / - vrací index.html jako HTML
router.get('/', getIndex);

// GET /products - vrací products.html jako HTML
router.get('/products', getProducts);

// GET /cart - vrací cart.html jako HTML
router.get('/cart', getCart);

// GET /login - vrací login.html jako HTML
router.get('/login', getLogin);

// GET /checkout - vrací checkout.html jako HTML
router.get('/checkout', getCheckout);

// GET /orders - vrací orders.html jako HTML
router.get('/orders', getOrders);

// GET /api/index - vrací index.html jako JSON
router.get('/api/index', getIndexJson);

export default router;


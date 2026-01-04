import express from 'express';
import { getIndex, getIndexJson, getProducts, getCart, getLogin, getCheckout, getOrders, getCalculators, getSearch, getGrades, getAbout } from '../controllers/indexController.js';

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

// GET /calculators - vrací calculators.html jako HTML
router.get('/calculators', getCalculators);

// GET /search - vrací search.html jako HTML
router.get('/search', getSearch);

// GET /grades - vrací grades.html jako HTML
router.get('/grades', getGrades);

// GET /about - vrací about.html jako HTML
router.get('/about', getAbout);

// GET /api/index - vrací index.html jako JSON
router.get('/api/index', getIndexJson);

export default router;


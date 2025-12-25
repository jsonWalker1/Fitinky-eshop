/**
 * ============================================
 * CHECKOUT CONTROLLER
 * ============================================
 * Controller pro vytváření objednávek
 * ============================================
 */

import * as userAuthService from '../services/userAuthService.js';
import { getCart } from '../services/cartService.js';

/**
 * Vytvoří objednávku z košíku
 * POST /api/checkout
 */
export const createOrder = (req, res) => {
    try {
        const userId = req.userId; // Z auth middleware
        
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: 'Pro dokončení objednávky musíte být přihlášeni',
                requiresAuth: true
            });
        }
        
        // Získat košík uživatele
        const cart = getCart(userId);
        
        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Košík je prázdný'
            });
        }
        
        // Validovat povinná pole
        const { firstName, lastName, email, phone, street, city, postalCode, country, shipping, payment } = req.body;
        
        if (!firstName || !lastName || !email || !phone || !street || !city || !postalCode || !country || !shipping || !payment) {
            return res.status(400).json({
                success: false,
                error: 'Všechna povinná pole musí být vyplněna'
            });
        }
        
        // Validovat firma, pokud je zaškrtnutá
        if (req.body.isCompany) {
            if (!req.body.companyName || !req.body.ico) {
                return res.status(400).json({
                    success: false,
                    error: 'Pro nákup na firmu jsou povinné název firmy a IČO'
                });
            }
        }
        
        // Vytvořit shipping address objekt
        const shippingAddress = {
            street,
            city,
            postalCode,
            country
        };
        
        // Vytvořit objednávku
        const orderData = {
            items: cart.items,
            total: cart.total,
            shippingAddress,
            firstName,
            lastName,
            email,
            phone,
            shipping,
            payment,
            note: req.body.note || '',
            isCompany: req.body.isCompany || false,
            companyName: req.body.companyName || '',
            ico: req.body.ico || '',
            dic: req.body.dic || ''
        };
        
        const result = userAuthService.createOrder(userId, orderData);
        
        if (!result.success) {
            return res.status(400).json({
                success: false,
                error: result.error
            });
        }
        
        res.json({
            success: true,
            order: result.order,
            message: 'Objednávka byla úspěšně vytvořena'
        });
    } catch (error) {
        console.error('Chyba při vytváření objednávky:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při vytváření objednávky'
        });
    }
};



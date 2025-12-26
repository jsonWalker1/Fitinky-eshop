/**
 * ============================================
 * GLOBAL SEARCH CONTROLLER
 * ============================================
 * Controller pro globální vyhledávání napříč všemi entitami
 * ============================================
 */

import * as productsService from '../services/productsService.js';
import * as userAuthService from '../services/userAuthService.js';
import * as userRepo from '../repositories/userRepository.js';
import * as productRepo from '../repositories/productRepository.js';

/**
 * Globální vyhledávání napříč všemi entitami
 * GET /admin/api/search?q=query
 */
export const globalSearch = async (req, res) => {
    try {
        const query = req.query.q || req.query.query || '';
        
        if (!query || query.trim().length < 2) {
            return res.json({
                success: true,
                results: {
                    products: [],
                    orders: [],
                    users: [],
                    categories: []
                }
            });
        }
        
        const searchQuery = query.trim();
        
        // Paralelní vyhledávání ve všech entitách
        const [products, orders, users, categories] = await Promise.all([
            productRepo.getAllProducts(searchQuery).catch(() => []),
            userRepo.getAllOrders(searchQuery).catch(() => []),
            userRepo.getAllUsers(searchQuery).catch(() => []),
            productRepo.getAllCategories(searchQuery).catch(() => [])
        ]);
        
        // Limit výsledků na 10 pro každou kategorii
        const limitedOrders = orders.slice(0, 10);
        const limitedProducts = products.slice(0, 10);
        const limitedUsers = users.slice(0, 10);
        const limitedCategories = categories.slice(0, 10);
        
        // Obohať objednávky o informace o uživateli
        const ordersWithUsers = await Promise.all(
            limitedOrders.map(async (order) => {
                try {
                    const user = await userAuthService.findUserById(order.userId);
                    return {
                        id: order.id,
                        type: 'order',
                        title: `Objednávka #${order.id}`,
                        subtitle: user 
                            ? `${user.firstName} ${user.lastName} (${user.email})`
                            : 'Neznámý uživatel',
                        date: order.createdAt,
                        amount: order.total || order.subtotal || 0,
                        status: order.status,
                        url: `/admin/orders#order-${order.id}`
                    };
                } catch (error) {
                    return {
                        id: order.id,
                        type: 'order',
                        title: `Objednávka #${order.id}`,
                        subtitle: 'Neznámý uživatel',
                        date: order.createdAt,
                        amount: order.total || order.subtotal || 0,
                        status: order.status,
                        url: `/admin/orders`
                    };
                }
            })
        );
        
        // Formátuj produkty
        const productsFormatted = limitedProducts.map(product => ({
            id: product.id,
            type: 'product',
            title: product.name,
            subtitle: product.categoryName || 'Bez kategorie',
            price: product.price || 0,
            image: product.image,
            url: `/admin/products`
        }));
        
        // Formátuj uživatele
        const usersFormatted = limitedUsers.map(user => ({
            id: user.id,
            type: 'user',
            title: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Bez jména',
            subtitle: user.email,
            date: user.createdAt,
            url: `/admin/users`
        }));
        
        // Formátuj kategorie
        const categoriesFormatted = limitedCategories.map(category => ({
            id: category.id,
            type: 'category',
            title: category.name,
            subtitle: category.description || '',
            slug: category.slug,
            url: `/admin/products?category=${category.slug}`
        }));
        
        res.json({
            success: true,
            results: {
                products: productsFormatted,
                orders: ordersWithUsers,
                users: usersFormatted,
                categories: categoriesFormatted
            }
        });
    } catch (error) {
        console.error('Chyba při globálním vyhledávání:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při vyhledávání'
        });
    }
};


import fs from 'fs';
import { paths } from '../config/paths.js';
import path from 'path';
import * as productsService from '../services/productsService.js';

/**
 * Controller pro admin rozhraní
 */

/**
 * Načte admin login stránku
 */
export const getAdminLogin = (req, res) => {
    try {
        const loginPath = path.join(paths.root, 'backend', 'views', 'admin-login.html');
        if (fs.existsSync(loginPath)) {
            const loginContent = fs.readFileSync(loginPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(loginContent);
        } else {
            res.status(404).send('Admin login stránka nenalezena');
        }
    } catch (error) {
        console.error('Chyba při načítání admin login:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte admin dashboard
 */
export const getAdminDashboard = (req, res) => {
    try {
        const dashboardPath = path.join(paths.root, 'backend', 'views', 'admin-dashboard.html');
        if (fs.existsSync(dashboardPath)) {
            const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(dashboardContent);
        } else {
            res.status(404).send('Admin dashboard nenalezen');
        }
    } catch (error) {
        console.error('Chyba při načítání admin dashboard:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte admin users stránku
 */
export const getAdminUsers = (req, res) => {
    try {
        const usersPath = path.join(paths.root, 'backend', 'views', 'admin-users.html');
        if (fs.existsSync(usersPath)) {
            const usersContent = fs.readFileSync(usersPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(usersContent);
        } else {
            res.status(404).send('Admin users stránka nenalezena');
        }
    } catch (error) {
        console.error('Chyba při načítání admin users:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte admin orders stránku
 */
export const getAdminOrders = (req, res) => {
    try {
        const ordersPath = path.join(paths.root, 'backend', 'views', 'admin-orders.html');
        if (fs.existsSync(ordersPath)) {
            const ordersContent = fs.readFileSync(ordersPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(ordersContent);
        } else {
            res.status(404).send('Admin orders stránka nenalezena');
        }
    } catch (error) {
        console.error('Chyba při načítání admin orders:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Login endpoint - PŘESUNUTO do authController.js
 * Použij: POST /admin/api/auth/login
 */

/**
 * Získá všechny produkty
 */
export const getProducts = async (req, res) => {
    try {
        const products = await productsService.getAllProducts();
        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání produktů'
        });
    }
};

/**
 * Přidá nový produkt
 */
export const addProduct = async (req, res) => {
    try {
        const { name, category, price, description, availabilityStatus } = req.body;
        
        if (!name || !category || !price) {
            return res.status(400).json({
                success: false,
                error: 'Název, kategorie a cena jsou povinné'
            });
        }
        
        // Validovat status dostupnosti
        const validStatuses = ['in_stock', 'on_order', 'out_of_stock'];
        const status = availabilityStatus && validStatuses.includes(availabilityStatus) 
            ? availabilityStatus 
            : 'in_stock'; // default
        
        const productData = {
            name,
            category,
            categorySlug: category,
            price: parseFloat(price),
            description: description || '',
            availabilityStatus: status
        };
        
        const newProduct = await productsService.addProduct(productData);
        
        res.json({
            success: true,
            product: newProduct,
            message: 'Produkt úspěšně přidán'
        });
    } catch (error) {
        console.error('Chyba při přidávání produktu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při přidávání produktu'
        });
    }
};

/**
 * Smaže produkt
 */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await productsService.deleteProduct(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Produkt nenalezen'
            });
        }
        
        res.json({
            success: true,
            message: 'Produkt úspěšně smazán'
        });
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při mazání produktu'
        });
    }
};


import fs from 'fs';
import { paths } from '../config/paths.js';
import path from 'path';

const productsFile = path.join(paths.root, 'backend', 'data', 'products.json');

// Zajistit, že data složka existuje
const dataDir = path.dirname(productsFile);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Inicializovat products.json pokud neexistuje
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify({ products: [] }, null, 2));
}

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
export const getProducts = (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        res.json({
            success: true,
            products: data.products || []
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
export const addProduct = (req, res) => {
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
        
        const data = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        const newProduct = {
            id: Date.now().toString(),
            name,
            category,
            price: parseFloat(price),
            description: description || '',
            availabilityStatus: status,
            createdAt: new Date().toISOString()
        };
        
        data.products.push(newProduct);
        fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
        
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
export const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        
        const data = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
        const initialLength = data.products.length;
        data.products = data.products.filter(p => p.id !== id);
        
        if (data.products.length === initialLength) {
            return res.status(404).json({
                success: false,
                error: 'Produkt nenalezen'
            });
        }
        
        fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
        
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


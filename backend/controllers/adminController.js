import fs from 'fs';
import { paths } from '../config/paths.js';
import path from 'path';
import * as productsService from '../services/productsService.js';
import * as userRepo from '../repositories/userRepository.js';

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
 * Načte admin dashboard (homepage s statistikami)
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
 * Načte admin products stránku (správa produktů)
 */
export const getAdminProducts = (req, res) => {
    try {
        const productsPath = path.join(paths.root, 'backend', 'views', 'admin-products.html');
        if (fs.existsSync(productsPath)) {
            const productsContent = fs.readFileSync(productsPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(productsContent);
        } else {
            res.status(404).send('Admin products stránka nenalezena');
        }
    } catch (error) {
        console.error('Chyba při načítání admin products:', error);
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
 * GET /admin/api/products?search=query&categoryId=id&availabilityStatus=status
 */
export const getProducts = async (req, res) => {
    try {
        const filters = {
            search: req.query.search || null,
            categoryId: req.query.categoryId || null,
            availabilityStatus: req.query.availabilityStatus || null
        };
        
        const products = await productsService.getAllProducts(filters);
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
 * Aktualizuje produkt
 * PUT /admin/api/products/:id
 */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, description, availabilityStatus, image } = req.body;
        
        const productData = {};
        if (name !== undefined) productData.name = name;
        if (category !== undefined) {
            productData.categoryId = category;
            productData.categorySlug = category;
        }
        if (price !== undefined) productData.price = parseFloat(price);
        if (description !== undefined) productData.description = description;
        if (image !== undefined) productData.image = image;
        if (availabilityStatus !== undefined) {
            const validStatuses = ['in_stock', 'on_order', 'out_of_stock'];
            if (validStatuses.includes(availabilityStatus)) {
                productData.availabilityStatus = availabilityStatus;
            }
        }
        
        const updatedProduct = await productsService.updateProduct(id, productData);
        
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: 'Produkt nenalezen'
            });
        }
        
        res.json({
            success: true,
            product: updatedProduct,
            message: 'Produkt úspěšně aktualizován'
        });
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při aktualizaci produktu'
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

/**
 * Získá statistiky pro dashboard
 * GET /admin/api/dashboard
 */
export const getDashboardStats = async (req, res) => {
    try {
        // Získat všechny produkty
        const products = await productsService.getAllProducts();
        
        // Získat všechny objednávky
        const orders = await userRepo.getAllOrders();
        const activeOrders = orders.filter(o => 
            o.status === 'pending' || o.status === 'processing'
        );
        
        // Získat všechny uživatele
        const users = await userRepo.getAllUsers();
        
        // Spočítat tržby dnes
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayOrders = orders.filter(o => {
            const orderDate = new Date(o.createdAt);
            orderDate.setHours(0, 0, 0, 0);
            return orderDate.getTime() === today.getTime() && 
                   (o.status === 'delivered' || o.status === 'shipped');
        });
        const todayRevenue = todayOrders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
        
        // Poslední objednávky (5 nejnovějších)
        const recentOrders = orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
        
        // Poslední produkty (5 nejnovějších)
        const recentProducts = products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
        
        res.json({
            success: true,
            stats: {
                products: {
                    total: products.length,
                    change: 0 // TODO: Implementovat změnu oproti předchozímu období
                },
                orders: {
                    active: activeOrders.length,
                    total: orders.length,
                    change: 0
                },
                users: {
                    total: users.length,
                    change: 0
                },
                revenue: {
                    today: todayRevenue,
                    change: 0
                }
            },
            recentOrders,
            recentProducts
        });
    } catch (error) {
        console.error('Chyba při načítání statistik dashboardu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání statistik'
        });
    }
};

/**
 * Načte admin categories stránku
 */
export const getAdminCategories = (req, res) => {
    try {
        const categoriesPath = path.join(paths.root, 'backend', 'views', 'admin-categories.html');
        if (fs.existsSync(categoriesPath)) {
            const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.send(categoriesContent);
        } else {
            res.status(404).send('Admin categories stránka nenalezena');
        }
    } catch (error) {
        console.error('Chyba při načítání admin categories:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Získá všechny kategorie (pro admin API)
 * GET /admin/api/categories?search=query
 */
export const getAdminCategoriesAPI = async (req, res) => {
    try {
        const searchQuery = req.query.search || null;
        const categories = await productsService.getCategoriesWithProductCount(searchQuery);
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání kategorií'
        });
    }
};

/**
 * Vytvoří novou kategorii
 * POST /admin/api/categories
 */
export const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image } = req.body;
        
        if (!name) {
            return res.status(400).json({
                success: false,
                error: 'Název kategorie je povinný'
            });
        }
        
        const categoryData = {
            name,
            slug,
            description: description || null,
            image: image || null
        };
        
        const newCategory = await productsService.addCategory(categoryData);
        
        res.json({
            success: true,
            category: newCategory,
            message: 'Kategorie úspěšně vytvořena'
        });
    } catch (error) {
        console.error('Chyba při vytváření kategorie:', error);
        
        // Kontrola na duplicitní slug
        if (error.code === '23505' || error.message.includes('unique')) {
            return res.status(400).json({
                success: false,
                error: 'Kategorie s tímto slug již existuje'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Chyba při vytváření kategorie'
        });
    }
};

/**
 * Aktualizuje kategorii
 * PUT /admin/api/categories/:id
 */
export const updateAdminCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, image } = req.body;
        
        const categoryData = {};
        if (name !== undefined) categoryData.name = name;
        if (slug !== undefined) categoryData.slug = slug;
        if (description !== undefined) categoryData.description = description;
        if (image !== undefined) categoryData.image = image;
        
        const updatedCategory = await productsService.updateCategory(id, categoryData);
        
        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                error: 'Kategorie nenalezena'
            });
        }
        
        res.json({
            success: true,
            category: updatedCategory,
            message: 'Kategorie úspěšně aktualizována'
        });
    } catch (error) {
        console.error('Chyba při aktualizaci kategorie:', error);
        
        if (error.code === '23505' || error.message.includes('unique')) {
            return res.status(400).json({
                success: false,
                error: 'Kategorie s tímto slug již existuje'
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Chyba při aktualizaci kategorie'
        });
    }
};

/**
 * Smaže kategorii
 * DELETE /admin/api/categories/:id
 */
export const deleteAdminCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await productsService.deleteCategory(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Kategorie nenalezena'
            });
        }
        
        res.json({
            success: true,
            message: 'Kategorie úspěšně smazána'
        });
    } catch (error) {
        console.error('Chyba při mazání kategorie:', error);
        
        // Pokud error obsahuje zprávu o produktech, vrátit ji
        if (error.message && error.message.includes('produkt')) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
        
        res.status(500).json({
            success: false,
            error: 'Chyba při mazání kategorie'
        });
    }
};

/**
 * Získá kategorii podle ID (pro admin API)
 * GET /admin/api/categories/:id
 */
export const getAdminCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await productsService.getCategoryById(id);
        
        if (!category) {
            return res.status(404).json({
                success: false,
                error: 'Kategorie nenalezena'
            });
        }
        
        res.json({
            success: true,
            category
        });
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání kategorie'
        });
    }
};


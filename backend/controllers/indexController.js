import fs from 'fs';
import path from 'path';
import { paths } from '../config/paths.js';

/**
 * Controller pro index stránku
 */

/**
 * Načte a vrátí index.html jako HTML
 */
export const getIndex = (req, res) => {
    try {
        const indexContent = fs.readFileSync(paths.index, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(indexContent);
    } catch (error) {
        console.error('Chyba při načítání index.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte a vrátí index.html jako JSON
 */
export const getIndexJson = (req, res) => {
    try {
        const indexContent = fs.readFileSync(paths.index, 'utf8');
        
        res.json({
            success: true,
            html: indexContent,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Chyba při načítání index.html:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání stránky'
        });
    }
};

/**
 * Načte a vrátí products.html jako HTML
 */
export const getProducts = (req, res) => {
    try {
        const productsPath = path.join(paths.root, 'products.html');
        const productsContent = fs.readFileSync(productsPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(productsContent);
    } catch (error) {
        console.error('Chyba při načítání products.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte a vrátí cart.html jako HTML
 */
export const getCart = (req, res) => {
    try {
        const cartPath = path.join(paths.root, 'cart.html');
        const cartContent = fs.readFileSync(cartPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(cartContent);
    } catch (error) {
        console.error('Chyba při načítání cart.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte a vrátí login.html jako HTML
 */
export const getLogin = (req, res) => {
    try {
        const loginPath = path.join(paths.root, 'login.html');
        const loginContent = fs.readFileSync(loginPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(loginContent);
    } catch (error) {
        console.error('Chyba při načítání login.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte a vrátí checkout.html jako HTML
 */
export const getCheckout = (req, res) => {
    try {
        const checkoutPath = path.join(paths.root, 'checkout.html');
        const checkoutContent = fs.readFileSync(checkoutPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(checkoutContent);
    } catch (error) {
        console.error('Chyba při načítání checkout.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * Načte a vrátí orders.html jako HTML
 */
export const getOrders = (req, res) => {
    try {
        const ordersPath = path.join(paths.root, 'orders.html');
        const ordersContent = fs.readFileSync(ordersPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(ordersContent);
    } catch (error) {
        console.error('Chyba při načítání orders.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

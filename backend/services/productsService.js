/**
 * ============================================
 * PRODUCTS SERVICE
 * ============================================
 * Business logika pro práci s produkty a kategoriemi
 * Podle rules.md: services → business logika
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { paths } from '../config/paths.js';

const productsFile = path.join(paths.root, 'backend', 'data', 'products.json');
const categoriesFile = path.join(paths.root, 'backend', 'data', 'categories.json');

/**
 * Načte všechny kategorie z JSON souboru
 */
export const getAllCategories = () => {
    try {
        const data = fs.readFileSync(categoriesFile, 'utf8');
        const json = JSON.parse(data);
        return json.categories || [];
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        return [];
    }
};

/**
 * Načte kategorii podle slug
 */
export const getCategoryBySlug = (slug) => {
    const categories = getAllCategories();
    return categories.find(cat => cat.slug === slug) || null;
};

/**
 * Načte všechny produkty z JSON souboru
 */
export const getAllProducts = () => {
    try {
        const data = fs.readFileSync(productsFile, 'utf8');
        const json = JSON.parse(data);
        return json.products || [];
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        return [];
    }
};

/**
 * Načte produkty podle kategorie (slug)
 */
export const getProductsByCategory = (categorySlug) => {
    const products = getAllProducts();
    return products.filter(product => product.categorySlug === categorySlug);
};

/**
 * Načte produkt podle ID
 */
export const getProductById = (id) => {
    const products = getAllProducts();
    return products.find(product => product.id === id) || null;
};

/**
 * Načte kategorie s počtem produktů
 */
export const getCategoriesWithProductCount = () => {
    const categories = getAllCategories();
    const products = getAllProducts();
    
    return categories.map(category => {
        const productCount = products.filter(
            product => product.categorySlug === category.slug
        ).length;
        
        return {
            ...category,
            productCount
        };
    });
};


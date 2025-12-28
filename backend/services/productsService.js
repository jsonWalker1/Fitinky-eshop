/**
 * ============================================
 * PRODUCTS SERVICE
 * ============================================
 * Business logika pro práci s produkty a kategoriemi
 * Podle rules.md: services → business logika
 * 
 * Používá SQL repository pro přístup k datům
 * ============================================
 */

import * as productRepo from '../repositories/productRepository.js';

/**
 * Načte všechny kategorie
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování kategorií
 */
export const getAllCategories = async (searchQuery = null) => {
    try {
        return await productRepo.getAllCategories(searchQuery);
    } catch (error) {
        console.error('Chyba při načítání kategorií:', error);
        return [];
    }
};

/**
 * Načte kategorii podle slug
 */
export const getCategoryBySlug = async (slug) => {
    try {
        return await productRepo.getCategoryBySlug(slug);
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        return null;
    }
};

/**
 * Načte všechny produkty
 * @param {object} filters - Objekt s filtry: { search, categoryId, availabilityStatus }
 */
export const getAllProducts = async (filters = {}) => {
    try {
        return await productRepo.getAllProducts(filters);
    } catch (error) {
        console.error('Chyba při načítání produktů:', error);
        return [];
    }
};

/**
 * Načte produkty podle kategorie (slug)
 */
export const getProductsByCategory = async (categorySlug) => {
    try {
        return await productRepo.getProductsByCategory(categorySlug);
    } catch (error) {
        console.error('Chyba při načítání produktů podle kategorie:', error);
        return [];
    }
};

/**
 * Načte produkt podle ID
 */
export const getProductById = async (id) => {
    try {
        return await productRepo.getProductById(id);
    } catch (error) {
        console.error('Chyba při načítání produktu:', error);
        return null;
    }
};

/**
 * Načte kategorie s počtem produktů
 * @param {string} searchQuery - Volitelný vyhledávací dotaz pro filtrování kategorií
 */
export const getCategoriesWithProductCount = async (searchQuery = null) => {
    try {
        return await productRepo.getCategoriesWithProductCount(searchQuery);
    } catch (error) {
        console.error('Chyba při načítání kategorií s počtem produktů:', error);
        return [];
    }
};

/**
 * Vytvoří novou kategorii
 */
export const addCategory = async (categoryData) => {
    try {
        return await productRepo.addCategory(categoryData);
    } catch (error) {
        console.error('Chyba při vytváření kategorie:', error);
        throw error;
    }
};

/**
 * Aktualizuje kategorii
 */
export const updateCategory = async (id, categoryData) => {
    try {
        return await productRepo.updateCategory(id, categoryData);
    } catch (error) {
        console.error('Chyba při aktualizaci kategorie:', error);
        throw error;
    }
};

/**
 * Smaže kategorii
 * @throws {Error} Pokud kategorie obsahuje produkty
 */
export const deleteCategory = async (id) => {
    try {
        return await productRepo.deleteCategory(id);
    } catch (error) {
        console.error('Chyba při mazání kategorie:', error);
        // Propasujeme error dál, aby controller mohl vrátit správnou chybovou hlášku
        throw error;
    }
};

/**
 * Načte kategorii podle ID
 */
export const getCategoryById = async (id) => {
    try {
        return await productRepo.getCategoryById(id);
    } catch (error) {
        console.error('Chyba při načítání kategorie:', error);
        return null;
    }
};

/**
 * Přidá nový produkt
 */
export const addProduct = async (productData) => {
    try {
        return await productRepo.addProduct(productData);
    } catch (error) {
        console.error('Chyba při přidávání produktu:', error);
        throw error;
    }
};

/**
 * Aktualizuje produkt
 */
export const updateProduct = async (id, productData) => {
    try {
        return await productRepo.updateProduct(id, productData);
    } catch (error) {
        console.error('Chyba při aktualizaci produktu:', error);
        throw error;
    }
};

/**
 * Smaže produkt
 */
export const deleteProduct = async (id) => {
    try {
        return await productRepo.deleteProduct(id);
    } catch (error) {
        console.error('Chyba při mazání produktu:', error);
        throw error;
    }
};

/**
 * Načte obrázky produktu
 */
export const getProductImages = async (productId) => {
    try {
        return await productRepo.getProductImages(productId);
    } catch (error) {
        console.error('Chyba při načítání obrázků produktu:', error);
        throw error;
    }
};

/**
 * Přidá obrázek do galerie produktu
 */
export const addProductImage = async (productId, imageUrl, displayOrder = null) => {
    try {
        return await productRepo.addProductImage(productId, imageUrl, displayOrder);
    } catch (error) {
        console.error('Chyba při přidávání obrázku:', error);
        throw error;
    }
};

/**
 * Odstraní obrázek z galerie produktu
 */
export const deleteProductImage = async (imageId) => {
    try {
        return await productRepo.deleteProductImage(imageId);
    } catch (error) {
        console.error('Chyba při mazání obrázku:', error);
        throw error;
    }
};

/**
 * Aktualizuje pořadí obrázků
 */
export const updateProductImageOrder = async (imageId, displayOrder) => {
    try {
        return await productRepo.updateProductImageOrder(imageId, displayOrder);
    } catch (error) {
        console.error('Chyba při aktualizaci pořadí obrázku:', error);
        throw error;
    }
};

/**
 * Odstraní všechny obrázky produktu
 */
export const deleteAllProductImages = async (productId) => {
    try {
        return await productRepo.deleteAllProductImages(productId);
    } catch (error) {
        console.error('Chyba při mazání obrázků produktu:', error);
        throw error;
    }
};


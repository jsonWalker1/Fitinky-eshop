/**
 * ============================================
 * ATTRIBUTE CONTROLLER
 * ============================================
 * Controller pro správu hodnot atributů
 * ============================================
 */

import * as attributeRepo from '../repositories/attributeRepository.js';

/**
 * Načte všechny kategorie atributů s jejich hodnotami
 * GET /admin/api/attributes/categories
 */
export const getAttributeCategories = async (req, res) => {
    try {
        const categories = await attributeRepo.getAttributeCategoriesWithValues();
        
        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Chyba při načítání kategorií atributů:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání kategorií atributů'
        });
    }
};

/**
 * Načte hodnoty atributu podle názvu kategorie
 * GET /admin/api/attributes/values/:categoryName
 */
export const getAttributeValues = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const values = await attributeRepo.getAttributeValuesByCategoryName(categoryName);
        
        res.json({
            success: true,
            values
        });
    } catch (error) {
        console.error('Chyba při načítání hodnot atributů:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při načítání hodnot atributů'
        });
    }
};

/**
 * Vytvoří novou hodnotu atributu
 * POST /admin/api/attributes/values
 */
export const addAttributeValue = async (req, res) => {
    try {
        const { category_id, value, display_name, description, display_order } = req.body;
        
        if (!category_id || !value || !display_name) {
            return res.status(400).json({
                success: false,
                error: 'category_id, value a display_name jsou povinné'
            });
        }
        
        const newValue = await attributeRepo.addAttributeValue({
            category_id,
            value,
            display_name,
            description,
            display_order
        });
        
        res.json({
            success: true,
            value: newValue,
            message: 'Hodnota atributu úspěšně přidána'
        });
    } catch (error) {
        console.error('Chyba při přidávání hodnoty atributu:', error);
        if (error.code === '23505') { // Unique violation
            return res.status(400).json({
                success: false,
                error: 'Hodnota s tímto názvem již existuje v této kategorii'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Chyba při přidávání hodnoty atributu'
        });
    }
};

/**
 * Aktualizuje hodnotu atributu
 * PUT /admin/api/attributes/values/:id
 */
export const updateAttributeValue = async (req, res) => {
    try {
        const { id } = req.params;
        const { value, display_name, description, display_order } = req.body;
        
        const valueData = {};
        if (value !== undefined) valueData.value = value;
        if (display_name !== undefined) valueData.display_name = display_name;
        if (description !== undefined) valueData.description = description;
        if (display_order !== undefined) valueData.display_order = display_order;
        
        const updatedValue = await attributeRepo.updateAttributeValue(id, valueData);
        
        if (!updatedValue) {
            return res.status(404).json({
                success: false,
                error: 'Hodnota atributu nenalezena'
            });
        }
        
        res.json({
            success: true,
            value: updatedValue,
            message: 'Hodnota atributu úspěšně aktualizována'
        });
    } catch (error) {
        console.error('Chyba při aktualizaci hodnoty atributu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při aktualizaci hodnoty atributu'
        });
    }
};

/**
 * Smaže hodnotu atributu
 * DELETE /admin/api/attributes/values/:id
 */
export const deleteAttributeValue = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deleted = await attributeRepo.deleteAttributeValue(id);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                error: 'Hodnota atributu nenalezena'
            });
        }
        
        res.json({
            success: true,
            message: 'Hodnota atributu úspěšně smazána'
        });
    } catch (error) {
        console.error('Chyba při mazání hodnoty atributu:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při mazání hodnoty atributu'
        });
    }
};


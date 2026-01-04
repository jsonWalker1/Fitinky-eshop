/**
 * ============================================
 * ADMIN MESSAGES CONTROLLER
 * ============================================
 * Controller pro správu kontaktních zpráv v admin panelu
 * ============================================
 */

import * as contactRepository from '../repositories/contactRepository.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Zobrazí stránku se seznamem zpráv
 */
export const getAdminMessages = (req, res) => {
    try {
        const messagesPath = path.join(__dirname, '../views/admin-messages.html');
        const messagesContent = fs.readFileSync(messagesPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(messagesContent);
    } catch (error) {
        console.error('Chyba při načítání admin-messages.html:', error);
        res.status(500).send('Chyba při načítání stránky');
    }
};

/**
 * API: Získá všechny kontaktní zprávy
 */
export const getMessages = async (req, res) => {
    try {
        const { status, limit } = req.query;
        
        const filters = {};
        if (status) filters.status = status;
        if (limit) filters.limit = parseInt(limit, 10);
        
        const messages = await contactRepository.getAllContactMessages(filters);
        
        res.json({
            success: true,
            messages: messages
        });
    } catch (error) {
        console.error('Chyba při získávání zpráv:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při získávání zpráv'
        });
    }
};

/**
 * API: Získá počet nepřečtených zpráv
 */
export const getUnreadCount = async (req, res) => {
    try {
        const count = await contactRepository.getUnreadCount();
        
        res.json({
            success: true,
            count: count
        });
    } catch (error) {
        console.error('Chyba při získávání počtu nepřečtených zpráv:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při získávání počtu zpráv'
        });
    }
};

/**
 * API: Označí zprávu jako přečtenou
 */
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        
        const message = await contactRepository.markAsRead(id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                error: 'Zpráva nenalezena'
            });
        }
        
        res.json({
            success: true,
            message: message
        });
    } catch (error) {
        console.error('Chyba při označování zprávy jako přečtené:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při označování zprávy'
        });
    }
};

/**
 * API: Archivuje zprávu
 */
export const archiveMessage = async (req, res) => {
    try {
        const { id } = req.params;
        
        const message = await contactRepository.archiveMessage(id);
        
        if (!message) {
            return res.status(404).json({
                success: false,
                error: 'Zpráva nenalezena'
            });
        }
        
        res.json({
            success: true,
            message: message
        });
    } catch (error) {
        console.error('Chyba při archivování zprávy:', error);
        res.status(500).json({
            success: false,
            error: 'Chyba při archivování zprávy'
        });
    }
};


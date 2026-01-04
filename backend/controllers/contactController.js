/**
 * Controller pro kontaktní formulář
 */

import * as contactRepository from '../repositories/contactRepository.js';

/**
 * Odeslání kontaktního formuláře
 * Ukládá zprávu do databáze
 */
export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // Validace
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                error: 'Prosím vyplňte všechna povinná pole.'
            });
        }
        
        // Validace emailu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Neplatná emailová adresa.'
            });
        }
        
        // Uložení do databáze
        await contactRepository.createContactMessage({
            name,
            email,
            phone,
            subject,
            message
        });
        
        // Logování
        console.log('=== NOVÁ KONTAKTNÍ POPTÁVKA ===');
        console.log('Jméno:', name);
        console.log('Email:', email);
        console.log('Telefon:', phone || 'Neuvedeno');
        console.log('Předmět:', subject);
        console.log('Zpráva:', message);
        console.log('Datum:', new Date().toISOString());
        console.log('================================');
        
        // V produkci by se zde:
        // 1. Odeslal email na info@example.com
        // 2. Odeslal potvrzovací email zákazníkovi
        
        res.json({
            success: true,
            message: 'Vaše zpráva byla úspěšně odeslána. Brzy se vám ozveme.'
        });
    } catch (error) {
        console.error('Chyba při zpracování kontaktního formuláře:', error);
        res.status(500).json({
            success: false,
            error: 'Nastala chyba při odesílání zprávy. Zkuste to prosím znovu.'
        });
    }
};


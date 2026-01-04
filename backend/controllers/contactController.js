/**
 * Controller pro kontaktní formulář
 */

/**
 * Odeslání kontaktního formuláře
 * Pro demo účely pouze loguje data a vrací úspěch
 */
export const submitContact = (req, res) => {
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
        
        // Logování (v produkci by se zde odeslal email nebo uložilo do DB)
        console.log('=== NOVÁ KONTAKTNÍ POPTÁVKA ===');
        console.log('Jméno:', name);
        console.log('Email:', email);
        console.log('Telefon:', phone || 'Neuvedeno');
        console.log('Předmět:', subject);
        console.log('Zpráva:', message);
        console.log('Datum:', new Date().toISOString());
        console.log('================================');
        
        // V produkci by se zde:
        // 1. Uložilo do databáze
        // 2. Odeslal email na info@example.com
        // 3. Odeslal potvrzovací email zákazníkovi
        
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


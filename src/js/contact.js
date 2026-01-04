/**
 * ============================================
 * CONTACT FORM HANDLING
 * ============================================
 * JavaScript pro odeslání kontaktního formuláře
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validace
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Prosím vyplňte všechna povinná pole.');
                return;
            }
            
            // Zobrazit loading stav
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Odesílám...';
            
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    alert('Děkujeme za vaši zprávu! Brzy se vám ozveme.');
                    contactForm.reset();
                } else {
                    alert(result.error || 'Nastala chyba při odesílání zprávy. Zkuste to prosím znovu.');
                }
            } catch (error) {
                console.error('Chyba při odesílání formuláře:', error);
                alert('Nastala chyba při odesílání zprávy. Zkuste to prosím znovu.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
});


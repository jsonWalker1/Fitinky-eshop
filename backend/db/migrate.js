/**
 * ============================================
 * DATABASE MIGRATION SCRIPT
 * ============================================
 * Migruje data z JSON souborů do PostgreSQL databáze
 * 
 * Použití:
 *   node backend/db/migrate.js
 * 
 * Před spuštěním:
 *   1. Nastav DATABASE_URL environment variable
 *   2. Ujisti se, že schema.sql je spuštěno
 *   3. Zálohuj data!
 * ============================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data');

async function migrate() {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        console.log('🔄 Začínám migraci...\n');
        
        // 1. Migrace kategorií
        console.log('📁 Migruji kategorie...');
        const categoriesData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8')
        );
        
        for (const category of categoriesData.categories || []) {
            await client.query(
                `INSERT INTO categories (id, name, slug, description, image)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (id) DO UPDATE
                 SET name = EXCLUDED.name, description = EXCLUDED.description, image = EXCLUDED.image`,
                [category.id, category.name, category.slug, category.description || null, category.image || null]
            );
        }
        console.log(`✅ Migrováno ${categoriesData.categories?.length || 0} kategorií\n`);
        
        // 2. Migrace produktů
        console.log('📦 Migruji produkty...');
        const productsData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'products.json'), 'utf8')
        );
        
        for (const product of productsData.products || []) {
            // Najdi category_id podle categoryId (což je string ID kategorie)
            let categoryId = null;
            if (product.categoryId) {
                const catResult = await client.query(
                    'SELECT id FROM categories WHERE id = $1',
                    [product.categoryId]
                );
                categoryId = catResult.rows[0]?.id || null;
            }
            
            await client.query(
                `INSERT INTO products (id, name, description, price, image, category_id, category_slug, availability_status, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                 ON CONFLICT (id) DO UPDATE
                 SET name = EXCLUDED.name, description = EXCLUDED.description,
                     price = EXCLUDED.price, image = EXCLUDED.image,
                     category_id = EXCLUDED.category_id,
                     category_slug = EXCLUDED.category_slug,
                     availability_status = EXCLUDED.availability_status,
                     updated_at = CURRENT_TIMESTAMP`,
                [
                    product.id,
                    product.name,
                    product.description || null,
                    product.price,
                    product.image || null,
                    categoryId,
                    product.categorySlug || null,
                    product.availabilityStatus || 'in_stock',
                    product.createdAt ? new Date(product.createdAt) : new Date()
                ]
            );
        }
        console.log(`✅ Migrováno ${productsData.products?.length || 0} produktů\n`);
        
        // 3. Migrace uživatelů
        console.log('👥 Migruji uživatele...');
        const usersData = JSON.parse(
            fs.readFileSync(path.join(dataDir, 'users.json'), 'utf8')
        );
        
        for (const user of usersData.users || []) {
            const address = user.address || {};
            
            await client.query(
                `INSERT INTO users (id, email, password, first_name, last_name, phone,
                     address_street, address_city, address_postal_code, address_country, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                 ON CONFLICT (id) DO UPDATE
                 SET first_name = EXCLUDED.first_name,
                     last_name = EXCLUDED.last_name,
                     phone = EXCLUDED.phone,
                     address_street = EXCLUDED.address_street,
                     address_city = EXCLUDED.address_city,
                     address_postal_code = EXCLUDED.address_postal_code,
                     address_country = EXCLUDED.address_country,
                     updated_at = CURRENT_TIMESTAMP`,
                [
                    user.id,
                    user.email,
                    user.password,
                    user.firstName || null,
                    user.lastName || null,
                    user.phone || null,
                    address.street || null,
                    address.city || null,
                    address.postalCode || null,
                    address.country || 'Česká republika',
                    user.createdAt ? new Date(user.createdAt) : new Date()
                ]
            );
            
            // Migrace košíku
            if (user.cart && user.cart.items && user.cart.items.length > 0) {
                // Smazat staré položky košíku
                await client.query('DELETE FROM cart_items WHERE user_id = $1', [user.id]);
                
                // Přidat nové položky
                for (const item of user.cart.items) {
                    await client.query(
                        `INSERT INTO cart_items (user_id, product_id, quantity)
                         VALUES ($1, $2, $3)
                         ON CONFLICT (user_id, product_id) DO UPDATE
                         SET quantity = EXCLUDED.quantity, updated_at = CURRENT_TIMESTAMP`,
                        [user.id, item.productId, item.quantity]
                    );
                }
                console.log(`  ✓ Košík uživatele ${user.email}: ${user.cart.items.length} položek`);
            }
        }
        console.log(`✅ Migrováno ${usersData.users?.length || 0} uživatelů\n`);
        
        // 4. Migrace objednávek (jsou v users.json pod klíčem "orders")
        console.log('📦 Migruji objednávky...');
        const ordersData = usersData.orders || [];
        
        for (const order of ordersData) {
            // Převést company na JSONB (buď null nebo objekt)
            const companyJson = order.company ? JSON.stringify(order.company) : null;
            
            await client.query(
                `INSERT INTO orders (id, user_id, subtotal, shipping_price, total_price, status,
                     shipping_address, contact_info, shipping_method, payment_method, note, company, created_at, updated_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                 ON CONFLICT (id) DO UPDATE
                 SET status = EXCLUDED.status,
                     subtotal = EXCLUDED.subtotal,
                     shipping_price = EXCLUDED.shipping_price,
                     total_price = EXCLUDED.total_price,
                     shipping_address = EXCLUDED.shipping_address,
                     contact_info = EXCLUDED.contact_info,
                     shipping_method = EXCLUDED.shipping_method,
                     payment_method = EXCLUDED.payment_method,
                     note = EXCLUDED.note,
                     company = EXCLUDED.company,
                     updated_at = EXCLUDED.updated_at`,
                [
                    order.id,
                    order.userId,
                    order.subtotal || 0,
                    order.shippingPrice || 0,
                    order.total || 0,
                    order.status || 'pending',
                    JSON.stringify(order.shippingAddress || {}),
                    JSON.stringify(order.contactInfo || {}),
                    order.shipping || null,
                    order.payment || null,
                    order.note || null,
                    companyJson,
                    order.createdAt ? new Date(order.createdAt) : new Date(),
                    order.updatedAt ? new Date(order.updatedAt) : new Date()
                ]
            );
            
            // Migrace položek objednávky
            if (order.items && order.items.length > 0) {
                // Smazat staré položky objednávky
                await client.query('DELETE FROM order_items WHERE order_id = $1', [order.id]);
                
                for (const item of order.items) {
                    await client.query(
                        `INSERT INTO order_items (order_id, product_id, product_name, product_price, product_image, quantity)
                         VALUES ($1, $2, $3, $4, $5, $6)`,
                        [
                            order.id,
                            item.productId || null,
                            item.name,
                            item.price,
                            item.image || null,
                            item.quantity
                        ]
                    );
                }
            }
        }
        console.log(`✅ Migrováno ${ordersData.length} objednávek\n`);
        
        await client.query('COMMIT');
        console.log('✅ Migrace úspěšně dokončena!\n');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Chyba při migraci:', error);
        console.error('Detail:', error.message);
        if (error.detail) {
            console.error('SQL Detail:', error.detail);
        }
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Spustit migraci
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    migrate().catch((error) => {
        console.error('❌ Migrace selhala:', error);
        process.exit(1);
    });
}

export default migrate;

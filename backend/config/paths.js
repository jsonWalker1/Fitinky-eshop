import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root adresář projektu (o úroveň výš než backend/)
const rootDir = path.join(__dirname, '../..');

export const paths = {
    root: rootDir,
    index: path.join(rootDir, 'index.html'),
    sass: path.join(rootDir, 'sass'),
    assets: path.join(rootDir, 'assets'),
    src: path.join(rootDir, 'src'),
};


import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = [64, 192, 512];
const inputFile = 'public/app-icon.svg';

async function generateIcons() {
  try {
    // Créer le buffer de l'image source
    const inputBuffer = await fs.readFile(inputFile);

    // Générer les icônes standard
    for (const size of sizes) {
      await sharp(inputBuffer)
        .resize(size, size)
        .toFile(`public/pwa-${size}x${size}.png`);
      
      console.log(`✓ Généré pwa-${size}x${size}.png`);
    }

    // Générer l'icône maskable (avec padding pour la zone sûre)
    await sharp(inputBuffer)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 74, g: 103, b: 65, alpha: 1 }, // #4a6741
        position: 'center'
      })
      .toFile('public/maskable-icon-512x512.png');
    
    console.log('✓ Généré maskable-icon-512x512.png');

    // Générer l'icône Apple
    await sharp(inputBuffer)
      .resize(180, 180)
      .toFile('public/apple-touch-icon.png');
    
    console.log('✓ Généré apple-touch-icon.png');

    // Générer le favicon
    await sharp(inputBuffer)
      .resize(32, 32)
      .toFile('public/favicon.ico');
    
    console.log('✓ Généré favicon.ico');

  } catch (error) {
    console.error('Erreur lors de la génération des icônes:', error);
  }
}

generateIcons(); 
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Ensure the output directories exist
const outputDirs = [
    'images/favicons',
    'images/icons'
];

outputDirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// PWA icon sizes
const iconSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' }
];

// Generate PNG icons
async function generateIcons() {
    const sourceSvg = path.join('images', 'favicons', 'favicon.svg');
    
    for (const icon of iconSizes) {
        const outputPath = path.join('images', 'icons', icon.name);
        
        try {
            await sharp(sourceSvg)
                .resize(icon.size, icon.size)
                .png()
                .toFile(outputPath);
            
            console.log(`Generated ${icon.name}`);
        } catch (error) {
            console.error(`Error generating ${icon.name}:`, error);
        }
    }
}

// Generate favicon.ico (16x16, 32x32)
async function generateFaviconIco() {
    const sourceSvg = path.join('images', 'favicons', 'favicon.svg');
    const outputPath = path.join('images', 'favicons', 'favicon.ico');
    
    try {
        const png16 = await sharp(sourceSvg)
            .resize(16, 16)
            .png()
            .toBuffer();
            
        const png32 = await sharp(sourceSvg)
            .resize(32, 32)
            .png()
            .toBuffer();
            
        // Combine the PNGs into an ICO file
        await sharp(png32)
            .joinChannel(png16)
            .toFile(outputPath);
            
        console.log('Generated favicon.ico');
    } catch (error) {
        console.error('Error generating favicon.ico:', error);
    }
}

// Generate Apple Touch Icon
async function generateAppleTouchIcon() {
    const sourceSvg = path.join('images', 'favicons', 'favicon.svg');
    const outputPath = path.join('images', 'icons', 'apple-touch-icon.png');
    
    try {
        await sharp(sourceSvg)
            .resize(180, 180)
            .png()
            .toFile(outputPath);
            
        console.log('Generated apple-touch-icon.png');
    } catch (error) {
        console.error('Error generating apple-touch-icon.png:', error);
    }
}

// Generate manifest icons
async function generateManifestIcons() {
    const sourceSvg = path.join('images', 'favicons', 'favicon.svg');
    const manifestIcons = [
        { size: 192, purpose: 'any' },
        { size: 512, purpose: 'any' },
        { size: 192, purpose: 'maskable' },
        { size: 512, purpose: 'maskable' }
    ];
    
    for (const icon of manifestIcons) {
        const outputPath = path.join('images', 'icons', `icon-${icon.size}x${icon.size}-${icon.purpose}.png`);
        
        try {
            await sharp(sourceSvg)
                .resize(icon.size, icon.size)
                .png()
                .toFile(outputPath);
                
            console.log(`Generated icon-${icon.size}x${icon.size}-${icon.purpose}.png`);
        } catch (error) {
            console.error(`Error generating icon-${icon.size}x${icon.size}-${icon.purpose}.png:`, error);
        }
    }
}

// Run all generation functions
async function generateAll() {
    console.log('Starting favicon generation...');
    
    await generateIcons();
    await generateFaviconIco();
    await generateAppleTouchIcon();
    await generateManifestIcons();
    
    console.log('Favicon generation complete!');
}

generateAll().catch(console.error); 
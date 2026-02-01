const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'sequence');
const backupDir = path.join(__dirname, 'public', 'sequence_backup');

// 1. Create Backup
if (!fs.existsSync(backupDir)) {
    console.log('Creating backup ...');
    fs.mkdirSync(backupDir);
    fs.cpSync(inputDir, backupDir, { recursive: true });
} else {
    console.log('Backup already exists, skipping backup step.');
}

// 2. Optimization Loop
async function optimize() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
    console.log(`Found ${files.length} PNG files. optimizing to WebP...`);

    let count = 0;
    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputFilename = file.replace('.png', '.webp');
        const outputPath = path.join(inputDir, outputFilename);

        await sharp(inputPath)
            .webp({ quality: 80 }) // 80% Quality is standard/high
            .resize(1920) // Resize if 4K to 1080p for web
            .toFile(outputPath);

        // Delete original PNG to save space? User asked for backup, so we have backup.
        // Let's delete original PNG from the sequence folder to keep it clean.
        fs.unlinkSync(inputPath);

        count++;
        if (count % 10 === 0) console.log(`Processed ${count}/${files.length}`);
    }
    console.log('Optimization Complete!');
}

optimize().catch(err => console.error(err));

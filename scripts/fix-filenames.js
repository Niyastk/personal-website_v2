const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'sequence');

console.log(`Working in: ${targetDir}`);

const files = fs.readdirSync(targetDir).filter(f => f.endsWith('.png') && f.includes('delay'));

console.log(`Found ${files.length} files to rename.`);

files.forEach(file => {
    // Expected: frame_000_delay-0.042s.png
    // We want: frame_000.png

    // Split by underscore, take first two parts? frame, 000
    const parts = file.split('_');
    if (parts.length >= 2) {
        const prefix = parts[0]; // frame
        const number = parts[1]; // 000

        const newName = `${prefix}_${number}.png`;
        const oldPath = path.join(targetDir, file);
        const newPath = path.join(targetDir, newName);

        try {
            fs.renameSync(oldPath, newPath);
            // console.log(`Renamed ${file} -> ${newName}`);
        } catch (e) {
            console.error(`Error renaming ${file}:`, e.message);
        }
    }
});

console.log('Done.');

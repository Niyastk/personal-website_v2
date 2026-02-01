const fs = require('fs');
const path = require('path');

// Target directory
const dir = path.join(__dirname, 'public', 'sequence');

console.log(`Target Directory: ${dir}`);

if (!fs.existsSync(dir)) {
    console.error("Directory not found!");
    process.exit(1);
}

// Read and filter PNG files
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

if (files.length === 0) {
    console.log("No PNG files found.");
    process.exit(0);
}

console.log(`Found ${files.length} files.`);

// Sort files to ensure correct sequence order
// Using localeCompare with numeric option handles _1, _2, _10 correctly
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

let count = 0;
files.forEach((file, index) => {
    const oldPath = path.join(dir, file);

    // New pattern: frame_000.png
    // padStart(3, '0') ensures 000, 001, ... 010 ... 100
    const newName = `frame_${String(index).padStart(3, '0')}.png`;
    const newPath = path.join(dir, newName);

    if (file !== newName) {
        try {
            fs.renameSync(oldPath, newPath);
            // console.log(`${file} -> ${newName}`);
            count++;
        } catch (e) {
            console.error(`Error renaming ${file}: ${e.message}`);
        }
    }
});

console.log(`\n✅ Successfully normalized ${count} files to 'frame_XXX.png' format.`);
console.log(`Total sequence length: ${files.length} frames.`);

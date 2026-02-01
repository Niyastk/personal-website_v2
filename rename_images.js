const fs = require('fs');
const path = require('path');

// Path to your images
const dir = path.join(__dirname, 'public', 'sequence');

console.log(`Checking directory: ${dir}`);

if (!fs.existsSync(dir)) {
    console.error("Directory not found! Make sure you are in the 'portfolio' folder.");
    process.exit(1);
}

const files = fs.readdirSync(dir);
let count = 0;

files.forEach(file => {
    // Look for files like: frame_000_delay-0.042s.png
    if (file.includes('_delay') && file.endsWith('.png')) {
        // Extract the frame number part (e.g. "frame_000")
        // We split by "_delay" and take the first part
        const newName = file.split('_delay')[0] + '.png';

        fs.renameSync(path.join(dir, file), path.join(dir, newName));
        console.log(`Renamed: ${file} -> ${newName}`);
        count++;
    }
});

console.log(`\n🎉 Success! Renamed ${count} files.`);
console.log("You can now refresh your browser.");

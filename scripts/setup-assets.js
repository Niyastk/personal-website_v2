const fs = require('fs');
const path = require('path');

// Target directory is where the files are NOW (public/sequence)
const targetDir = path.join(__dirname, '..', 'public', 'sequence');

console.log(`Scanning directory: ${targetDir}`);

if (!fs.existsSync(targetDir)) {
    console.error('Directory does not exist!');
    process.exit(1);
}

// Find all frame files
try {
    // Get all PNGs
    const files = fs.readdirSync(targetDir).filter(file => file.endsWith('.png') && file.startsWith('frame_'));
    console.log(`Found ${files.length} frame files.`);

    if (files.length === 0) {
        console.log("No files found to rename.");
    }

    // Sort natural/logically to ensure order (frame_0 vs frame_10)
    // The default sort might be okay if they have leading zeros, which they seem to have (frame_000...).
    files.sort();

    let renamedCount = 0;
    files.forEach((file, index) => {
        // Current file full path
        const oldPath = path.join(targetDir, file);

        // Desired name: frame_000.png
        const newName = `frame_${String(index).padStart(3, '0')}.png`;
        const newPath = path.join(targetDir, newName);

        // Only rename if name is different
        if (file !== newName) {
            // Handle case where target name already exists (e.g. partial run)
            // Since we are mapping index to name, and input is sorted, it *should* be fine unless we have gaps or collision.
            // We will rename.
            try {
                fs.renameSync(oldPath, newPath);
                renamedCount++;
            } catch (e) {
                console.error(`Failed to rename ${file} to ${newName}:`, e.message);
            }
        }
    });
    console.log(`Renamed ${renamedCount} files.`);
    console.log('Asset normalization complete.');
} catch (error) {
    console.error('Error processing files:', error);
}

const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

// Path to resume provided by user
const resumePath = path.join('..', '..', 'Niyas T K - Resume.pdf');

console.log(`Reading resume from: ${resumePath}`);

if (!fs.existsSync(resumePath)) {
    console.error("Resume file not found!");
    process.exit(1);
}

const dataBuffer = fs.readFileSync(resumePath);

pdf(dataBuffer).then(function (data) {
    // console.log(data.text);
    fs.writeFileSync('resume_content.txt', data.text);
    console.log("Successfully extracted text to resume_content.txt");
}).catch(err => {
    console.error("Error parsing PDF:", err);
});

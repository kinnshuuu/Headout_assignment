const fs = require('fs');
const path = require('path');

const generateRandomString = (sizeInBytes, chunkSize) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const lines = [];

    while (sizeInBytes > 0) {
        const currentChunkSize = Math.min(sizeInBytes, chunkSize);
        const randomLine = Array(currentChunkSize)
            .fill(null)
            .map(() => characters[Math.floor(Math.random() * characters.length)])
            .join('');

        lines.push(randomLine);
        sizeInBytes -= currentChunkSize;
    }

    return lines.join('\n');
};

const generateFile = (filePath, fileSizeInBytes) => {
    const chunkSize = 1024; // 1 KB chunks
    const randomContent = generateRandomString(fileSizeInBytes, chunkSize);
    fs.writeFileSync(filePath, randomContent, 'utf-8');
};

const main = () => {
    const outputDirectory = 'tmp/data';

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory);
    }

    const numberOfFiles = 15;
    const fileSizeInBytes = 100 * 1024 * 1024;

    for (let i = 1; i <= numberOfFiles; i++) {
        const fileName = `${i}.txt`;
        const filePath = path.join(outputDirectory, fileName);

        console.log(`Generating file: ${filePath}`);

        generateFile(filePath, fileSizeInBytes);
    }

    console.log('Files generation completed.');
};

main();

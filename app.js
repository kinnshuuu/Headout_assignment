const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    // console.log('hello world');
    return res.status(200).send("Server is running");
})

app.get('/data', async (req, res) => {
    const n = req.query.n;
    const m = req.query.m;

    if (!n) {
        return res.status(400).send("Error: 'n' parameter is required");
    }

    const filePath = `./tmp/data/${n}.txt`;

    if (m) {
        try {
            const lineNumber = parseInt(m);
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\n');

            if (lineNumber >= 1 && lineNumber <= lines.length) {
                res.send(lines[lineNumber - 1]);
            } else {
                res.status(400).send("Error: Invalid 'm' parameter");
            }
        } catch (error) {
            res.status(400).send("Error: Invalid 'm' parameter");
        }
    } else {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            res.send(content);
        } catch (error) {
            res.status(404).send("Error: File not found");
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

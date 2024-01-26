const express = require('express');
const fs = require('fs/promises');
const url = require('url');
const app = express();
const PORT = process.env.PORT || 8080;

async function readFileContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        throw new Error("Error: File not found");
    }
}

app.get('/', async (req, res) => {
    return res.status(200).send("Server is running");
});

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
            const content = await readFileContent(filePath);
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
        if (req.query.showAll) {
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                res.send(content);
            } catch (error) {
                res.status(404).send("Error: File not found");
            }
        } else {
            try {
                const page = parseInt(req.query.page) || 1;
                const pageSize = parseInt(req.query.pageSize) || 10; // Adjust as needed

                const [content, totalLines] = await Promise.all([
                    readFileContent(filePath),
                    fs.readFile(filePath, 'utf-8').then(content => content.split('\n').length)
                ]);

                const totalPages = Math.ceil(totalLines / pageSize);

                const start = (page - 1) * pageSize;
                const end = start + pageSize;

                const pagedLines = content.split('\n').slice(start, end);

                const prevPage = page > 1 ? url.format({
                    pathname: '/data',
                    query: { n: n, page: page - 1 }
                }) : null;

                const nextPage = page < totalPages ? url.format({
                    pathname: '/data',
                    query: { n: n, page: page + 1 }
                }) : null;

                const response = {
                    content: pagedLines.join('\n'),
                    prevPage: prevPage ? `<a href=${prevPage}>Previous Page</a>` : null,
                    nextPage: nextPage ? `<a href=${nextPage}>Next Page</a>` : null,
                };

                res.send(JSON.stringify(response));
            } catch (error) {
                res.status(404).send(error.message);
            }
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

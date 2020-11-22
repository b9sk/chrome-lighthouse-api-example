const express = require('express');
const cors = require('cors');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { run } = require('lighthouse/lighthouse-core/runner');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/avaliar', async (req, res) => {
    const { url_site } = req.query;
    console.log('Site: ' + url_site);

    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'info', 
        output: 'html',
        onlyCategories: ['performance'],
        port: chrome.port,
    };
    const runnerResult = await lighthouse(url_site, options);
    await chrome.kill();

    return res.json(runnerResult.lhr);
});

app.get('/api', (req, res) => {
    res.send('Utilize a rota /api/avaliar com o parâmetro url_site');
});

app.listen(3000);

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'info', 
        output: 'html',
        onlyCategories: ['performance'],
        port: chrome.port,
    };
    const runnerResult = await lighthouse('http://criacon.com.br', options);

    console.log(runnerResult.lhr.finalUrl);
    console.log(runnerResult.lhr.categories.performance.score * 100);
    console.log(runnerResult.lhr);

    await chrome.kill();
})();

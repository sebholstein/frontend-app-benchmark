import fs from 'fs';
import open from 'open';
import puppeteer from 'puppeteer';
const { startFlow } = require('lighthouse/lighthouse-core/fraggle-rock/api.js');

async function captureReport() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 940, height: 1350 });

  const flow = await startFlow(page, { name: 'Hacker News' });
  await flow.navigate('https://qwik-hackernews.ryansolid.workers.dev/', {
    name: 'Cold navigation',
  });
  await flow.navigate(
    'https://qwik-hackernews.ryansolid.workers.dev/stories/31903076',
    {
      stepName: 'Warm Navigation to Detailspage',
      configContext: {
        settingsOverrides: { disableStorageReset: true },
      },
    }
  );

  await flow.startTimespan({ stepName: 'Minify the comments' });
  await page.click(
    'story > div > .item-view-comments > ul > comment:nth-child(2) > li > div:nth-child(3) > div > a'
  );
  await flow.endTimespan();

  await browser.close();

  const resultPlain = await flow.createFlowResult();

  const report = await flow.generateReport();
  fs.writeFileSync('flow.result.txt', JSON.stringify(resultPlain));
  fs.writeFileSync('flow.report.html', report);

  open('flow.report.html', { wait: false });
}

captureReport();

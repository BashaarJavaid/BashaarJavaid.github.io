import { chromium } from 'playwright';

const base = 'http://localhost:3001';
const out = 'screenshots';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1512, height: 900 } });

// Home – wait for loader + textures
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(4000);
await page.screenshot({ path: `${out}/home.png` });

// Simulate a drag on the grid, capture mid-drag and after release
await page.mouse.move(756, 450);
await page.mouse.down();
await page.mouse.move(400, 300, { steps: 12 });
await page.screenshot({ path: `${out}/home-drag.png` });
await page.mouse.move(200, 200, { steps: 8 });
await page.mouse.up();
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}/home-after-drag.png` });

// Index view
await page.click('text=Index');
await page.waitForTimeout(800);
await page.screenshot({ path: `${out}/home-index.png` });

// Project page
await page.goto(base + '/work/prodrescue/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${out}/project.png`, fullPage: true });

// About
await page.goto(base + '/about/', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.screenshot({ path: `${out}/about.png` });

await browser.close();
console.log('done');

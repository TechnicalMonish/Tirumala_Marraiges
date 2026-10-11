/*
 * Headless smoke test — verifies the preview build at http://127.0.0.1:5177/
 * at two breakpoints (1280x720 desktop, 390x844 mobile):
 *   - no page/console errors, no network 404s
 *   - hero image renders
 *   - at least one <h1> and no horizontal overflow
 *   - nav/mobile menu/gallery lightbox work
 */
const { chromium } = require('playwright-core');

const URL = 'http://127.0.0.1:5177/';

function recordLogs(page, failures) {
  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error' || type === 'warning') {
      failures.console.push(`[${type}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => failures.console.push(`[pageerror] ${err.message}`));
  page.on('requestfailed', (req) => failures.network.push(`${req.failure()?.errorText || 'fail'} ${req.url()}`));
  page.on('response', (resp) => {
    if (resp.status() >= 400) failures.network.push(`${resp.status()} ${resp.url()}`);
  });
}

async function viewportCheck(browser, label, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const failures = { console: [], network: [] };
  recordLogs(page, failures);
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForSelector('h1', { timeout: 10000 });

  const h1Count = await page.locator('h1').count();
  const heroImgSrc = await page.locator('section#top img').first().getAttribute('src');
  const bodyOverflow = await page.evaluate(() => {
    return { scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth };
  });
  const horizontalOverflow = bodyOverflow.scrollWidth > bodyOverflow.innerWidth + 1;
  const heroVisible = await page.locator('section#top img').first().isVisible();

  const report = {
    viewport: label,
    size: `${w}x${h}`,
    h1Count,
    heroImgSrc,
    heroVisible,
    bodyScrollWidth: bodyOverflow.scrollWidth,
    innerWidth: bodyOverflow.innerWidth,
    horizontalOverflow,
    consoleErrors: failures.console,
    networkFailures: failures.network,
  };

  await ctx.close();
  return report;
}

async function interactiveCheck(browser) {
  const results = {};

  // ─── Mobile pass ───────────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const page = await ctx.newPage();
    const failures = { console: [], network: [] };
    recordLogs(page, failures);
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForSelector('h1');

    const yBefore = await page.evaluate(() => window.scrollY);
    await page.locator('#mobile-menu-btn').click();
    await page.waitForTimeout(400);
    const menuShown = await page.locator('#mobile-menu').evaluate((el) => !el.classList.contains('translate-x-full'));
    await page.locator('#mobile-menu a[href="#about"]').click();
    await page.waitForTimeout(1500);
    const yAfter = await page.evaluate(() => window.scrollY);
    const hashAfter = await page.evaluate(() => window.location.hash);
    const aboutTop = await page.locator('#about').evaluate((el) => el.getBoundingClientRect().top);
    const menuClosed = await page.locator('#mobile-menu').evaluate((el) => el.classList.contains('translate-x-full'));

    // Services sheet (mobile only)
    await page.goto(URL + '#booking', { waitUntil: 'load' });
    await page.waitForSelector('#services-trigger');
    await page.locator('#services-trigger').click();
    await page.waitForTimeout(400);
    const sheetOpenState = await page.locator('#services-bottom-sheet').evaluate((el) => el.classList.contains('open'));
    // tick first service, Done
    await page.locator('#services-bottom-sheet input[type="checkbox"]').first().click();
    await page.locator('#services-bottom-sheet button:has-text("Done")').click();
    await page.waitForTimeout(400);
    const triggerLabel = await page.locator('#services-trigger-text').innerText();

    // Lightbox
    await page.goto(URL + '#gallery', { waitUntil: 'load' });
    await page.waitForSelector('#gallery button');
    await page.locator('#gallery button').first().click();
    await page.waitForTimeout(300);
    const lightboxOpen = await page.locator('#lightbox').evaluate((el) => el.classList.contains('active'));
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const lightboxClosed = await page.locator('#lightbox').evaluate((el) => !el.classList.contains('active'));

    await ctx.close();
    results.mobile = {
      menuShown,
      menuClosedAfterLinkClick: menuClosed,
      navAnchorScrolled: yAfter > yBefore + 50,
      yAfter,
      hashAfter,
      aboutTopAfterNav: aboutTop,
      sheetOpened: sheetOpenState,
      triggerLabelAfterDone: triggerLabel,
      lightboxOpen,
      lightboxClosedByEscape: lightboxClosed,
      consoleErrors: failures.console,
      networkFailures: failures.network,
    };
  }

  // ─── Desktop pass ──────────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await ctx.newPage();
    const failures = { console: [], network: [] };
    recordLogs(page, failures);
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForSelector('h1');
    // click Services nav link
    await page.locator('#nav-links a[href="#services"]').click();
    await page.waitForTimeout(1200);
    const servicesTop = await page.locator('#services').evaluate((el) => el.getBoundingClientRect().top);
    // Checkbox toggle on desktop
    const checkbox = page.locator('#servicesCheckboxes input').first();
    await page.locator('#booking').scrollIntoViewIfNeeded();
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.click();
    const checked = await checkbox.isChecked();
    await ctx.close();
    results.desktop = {
      servicesLinkScrollsIntoView: Math.abs(servicesTop) < 5,
      servicesTopAfterNav: servicesTop,
      desktopCheckboxToggle: checked,
      consoleErrors: failures.console,
      networkFailures: failures.network,
    };
  }

  return results;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const desktop = await viewportCheck(browser, 'desktop', 1280, 720);
    const mobile = await viewportCheck(browser, 'mobile', 390, 844);
    const inter = await interactiveCheck(browser);
    const result = { desktop, mobile, interactions: inter };
    console.log(JSON.stringify(result, null, 2));
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error('fatal:', e);
  process.exit(1);
});

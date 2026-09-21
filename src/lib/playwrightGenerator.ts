import { AgentStep } from "@/types/agent";

export function generatePlaywrightTypeScript(steps: AgentStep[], targetUrl: string): string {
  const stepsCode = steps.map((s, idx) => {
    const comment = `  // Step ${idx + 1}: ${s.title}`;
    let action = "";

    switch (s.actionType) {
      case "navigate":
        action = `  console.log('Navigating to ${s.target || targetUrl}...');\n  await page.goto('${s.target || targetUrl}', { waitUntil: 'networkidle' });`;
        break;
      case "click":
        if (s.selector) {
          action = `  console.log('Clicking ${s.selector}...');\n  await page.locator('${s.selector}').click();`;
        } else if (s.coordinates) {
          action = `  console.log('Clicking at [${s.coordinates.x}, ${s.coordinates.y}]...');\n  await page.mouse.click(${s.coordinates.x}, ${s.coordinates.y});`;
        } else {
          action = `  await page.waitForTimeout(500);`;
        }
        break;
      case "type":
        if (s.selector) {
          action = `  console.log('Typing into ${s.selector}...');\n  await page.locator('${s.selector}').fill('${s.inputData || ""}');`;
        } else if (s.coordinates) {
          action = `  await page.mouse.click(${s.coordinates.x}, ${s.coordinates.y});\n  await page.keyboard.type('${s.inputData || ""}', { delay: 40 });`;
        }
        break;
      case "scroll":
        action = `  console.log('Scrolling viewport...');\n  await page.evaluate(() => window.scrollBy(0, 600));\n  await page.waitForTimeout(800);`;
        break;
      case "wait":
        action = `  console.log('Waiting for stability...');\n  await page.waitForTimeout(1500);`;
        break;
      case "screenshot":
        action = `  console.log('Capturing screenshot...');\n  await page.screenshot({ path: 'oneshot-step-${idx + 1}.png', fullPage: true });`;
        break;
      case "extract":
        action = `  console.log('Extracting page elements...');\n  const extractedData = await page.evaluate(() => {\n    return Array.from(document.querySelectorAll('${s.selector || ".data-row"}')).map(el => el.textContent?.trim());\n  });\n  console.log('Extracted items:', extractedData.length);`;
        break;
      default:
        action = `  await page.waitForTimeout(500);`;
    }

    return `${comment}\n${action}`;
  }).join("\n\n");

  return `import { chromium } from 'playwright';

/**
 * OneShot AI — Playwright Browser Automation Script
 * Generated automatically by OneShot AI Studio
 * Target: ${targetUrl}
 */
async function runOneShotAgent() {
  console.log('🚀 Initializing OneShot Chromium agent...');
  const browser = await chromium.launch({
    headless: false, // Set to true for background execution
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    locale: 'ar-SA,en-US',
  });

  const page = await context.newPage();

  try {
${stepsCode}

    console.log('✅ OneShot Agent finished workflow execution successfully.');
  } catch (error) {
    console.error('❌ Automation failed:', error);
    await page.screenshot({ path: 'oneshot-error.png' });
  } finally {
    await browser.close();
  }
}

runOneShotAgent();
`;
}

export function generatePlaywrightPython(steps: AgentStep[], targetUrl: string): string {
  const stepsCode = steps.map((s, idx) => {
    const comment = `    # Step ${idx + 1}: ${s.title}`;
    let action = "";

    switch (s.actionType) {
      case "navigate":
        action = `    print("Navigating to ${s.target || targetUrl}...")\n    page.goto("${s.target || targetUrl}", wait_until="networkidle")`;
        break;
      case "click":
        if (s.selector) {
          action = `    print("Clicking ${s.selector}...")\n    page.locator("${s.selector}").click()`;
        } else if (s.coordinates) {
          action = `    page.mouse.click(${s.coordinates.x}, ${s.coordinates.y})`;
        } else {
          action = `    page.wait_for_timeout(500)`;
        }
        break;
      case "type":
        if (s.selector) {
          action = `    print("Typing into ${s.selector}...")\n    page.locator("${s.selector}").fill("${s.inputData || ""}")`;
        } else if (s.coordinates) {
          action = `    page.mouse.click(${s.coordinates.x}, ${s.coordinates.y})\n    page.keyboard.type("${s.inputData || ""}", delay=40)`;
        }
        break;
      case "scroll":
        action = `    page.evaluate("window.scrollBy(0, 600)")\n    page.wait_for_timeout(800)`;
        break;
      case "wait":
        action = `    page.wait_for_timeout(1500)`;
        break;
      case "screenshot":
        action = `    page.screenshot(path="oneshot_step_${idx + 1}.png", full_page=True)`;
        break;
      case "extract":
        action = `    extracted = page.eval_on_selector_all("${s.selector || '.data-row'}", "els => els.map(e => e.innerText)")\n    print(f"Extracted {len(extracted)} items")`;
        break;
      default:
        action = `    page.wait_for_timeout(500)`;
    }

    return `${comment}\n${action}`;
  }).join("\n\n");

  return `import asyncio
from playwright.sync_api import sync_playwright

"""
OneShot AI — Python Playwright Automation Script
Generated by OneShot AI Platform
Target: ${targetUrl}
"""

def run_oneshot_agent():
    print("🚀 Initializing OneShot Chromium Agent...")
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=False,
            args=["--disable-blink-features=AutomationControlled"]
        )
        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        )
        page = context.new_page()

        try:
${stepsCode}
            print("✅ OneShot execution completed successfully!")
        except Exception as e:
            print(f"❌ Automation encountered error: {e}")
            page.screenshot(path="error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run_oneshot_agent()
`;
}

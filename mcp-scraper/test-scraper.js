#!/usr/bin/env node

import puppeteer from "puppeteer";
import fs from 'fs';

async function scrapeGammaApp() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('Navigating to Gamma.app create page...');
    try {
      await page.goto('https://gamma.app/create', { 
        waitUntil: "domcontentloaded",
        timeout: 30000 
      });
    } catch (error) {
      console.log('Primary navigation failed, trying alternative approach...');
      await page.goto('https://gamma.app', { 
        waitUntil: "domcontentloaded",
        timeout: 30000 
      });
      // Try to find and click create button
      try {
        await page.waitForSelector('a[href*="create"], button[data-testid*="create"], [class*="create"]', { timeout: 10000 });
        await page.click('a[href*="create"], button[data-testid*="create"], [class*="create"]');
      } catch (e) {
        console.log('Could not find create button, proceeding with main page...');
      }
    }

    // Wait for potential dynamic content to load
    await page.waitForTimeout(5000);

    // Extract comprehensive page content
    const content = await page.evaluate(() => {
      // Helper function to get element info
      const getElementInfo = (element) => {
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
        
        return {
          tagName: element.tagName.toLowerCase(),
          className: element.className,
          id: element.id,
          textContent: element.textContent?.trim(),
          innerHTML: element.innerHTML.length > 500 ? element.innerHTML.substring(0, 500) + '...' : element.innerHTML,
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          visible: rect.width > 0 && rect.height > 0,
          styles: {
            display: styles.display,
            position: styles.position,
            backgroundColor: styles.backgroundColor,
            color: styles.color,
            fontSize: styles.fontSize,
            fontFamily: styles.fontFamily,
            padding: styles.padding,
            margin: styles.margin,
            border: styles.border
          },
          attributes: Array.from(element.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {})
        };
      };

      return {
        title: document.title,
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        
        // Extract main content areas
        mainContent: Array.from(document.querySelectorAll('main, [role="main"], .main-content, .content')).map(getElementInfo),
        
        // Extract forms and input elements
        forms: Array.from(document.querySelectorAll('form')).map(getElementInfo),
        inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(getElementInfo),
        
        // Extract buttons and interactive elements
        buttons: Array.from(document.querySelectorAll('button, .btn, [role="button"], input[type="button"], input[type="submit"]')).map(getElementInfo),
        
        // Extract navigation elements
        navigation: Array.from(document.querySelectorAll('nav, .nav, .navigation')).map(getElementInfo),
        
        // Extract sections and containers
        sections: Array.from(document.querySelectorAll('section, article, .section, div[class*="container"], div[class*="wrapper"]')).map(getElementInfo),
        
        // Extract headings for structure
        headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          level: h.tagName.toLowerCase(),
          text: h.textContent.trim(),
          id: h.id,
          className: h.className
        })),
        
        // Extract all links
        links: Array.from(document.links).map(link => ({
          text: link.textContent.trim(),
          href: link.href,
          title: link.title,
          className: link.className
        })),
        
        // Extract elements with specific keywords related to AI/creation
        aiElements: Array.from(document.querySelectorAll('[class*="ai"], [class*="create"], [class*="generate"], [class*="wizard"], [class*="step"], [class*="form"], [class*="input"], [class*="preview"], [class*="template"]')).map(getElementInfo),
        
        // Extract modal or popup elements
        modals: Array.from(document.querySelectorAll('[class*="modal"], [class*="popup"], [class*="dialog"], [role="dialog"]')).map(getElementInfo),
        
        // Extract all text content for analysis
        bodyText: document.body.innerText,
        
        // Extract meta information
        meta: Array.from(document.querySelectorAll('meta')).map(meta => ({
          name: meta.name,
          content: meta.content,
          property: meta.property
        }))
      };
    });

    // Save the extracted content to a file
    fs.writeFileSync('/Users/michaelkraft/pitch-deck-builder/mcp-scraper/gamma-scrape-results.json', JSON.stringify(content, null, 2));
    
    console.log('Scraping completed successfully!');
    console.log('Results saved to gamma-scrape-results.json');
    
    return content;
  } catch (error) {
    console.error('Error scraping Gamma.app:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

scrapeGammaApp().catch(console.error);
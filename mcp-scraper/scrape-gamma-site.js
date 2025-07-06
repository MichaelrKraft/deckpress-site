#!/usr/bin/env node

import puppeteer from "puppeteer";
import fs from 'fs';

async function scrapeGammaSite() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('Navigating to Gamma nocode investor decks site...');
    await page.goto('https://nocode-investor-decks-leri4o0.gamma.site/', { 
      waitUntil: "domcontentloaded",
      timeout: 30000 
    });

    // Wait for potential dynamic content to load
    await page.waitForTimeout(5000);

    // Extract comprehensive page content with focus on design structure
    const content = await page.evaluate(() => {
      // Helper function to get element info with design details
      const getElementInfo = (element) => {
        const rect = element.getBoundingClientRect();
        const styles = window.getComputedStyle(element);
        
        return {
          tagName: element.tagName.toLowerCase(),
          className: element.className,
          id: element.id,
          textContent: element.textContent?.trim(),
          innerHTML: element.innerHTML.length > 1000 ? element.innerHTML.substring(0, 1000) + '...' : element.innerHTML,
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
            fontWeight: styles.fontWeight,
            lineHeight: styles.lineHeight,
            padding: styles.padding,
            margin: styles.margin,
            border: styles.border,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
            textAlign: styles.textAlign,
            maxWidth: styles.maxWidth,
            minHeight: styles.minHeight,
            backgroundImage: styles.backgroundImage,
            backgroundSize: styles.backgroundSize,
            backgroundPosition: styles.backgroundPosition,
            zIndex: styles.zIndex,
            transform: styles.transform,
            opacity: styles.opacity,
            overflow: styles.overflow,
            flexDirection: styles.flexDirection,
            justifyContent: styles.justifyContent,
            alignItems: styles.alignItems,
            gap: styles.gap,
            gridTemplateColumns: styles.gridTemplateColumns,
            gridTemplateRows: styles.gridTemplateRows
          },
          attributes: Array.from(element.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {})
        };
      };

      // Extract color scheme from CSS variables and styles
      const extractColorScheme = () => {
        const root = document.documentElement;
        const rootStyles = window.getComputedStyle(root);
        const colors = {};
        
        // Check for CSS custom properties
        for (let i = 0; i < rootStyles.length; i++) {
          const prop = rootStyles[i];
          if (prop.includes('color') || prop.includes('background')) {
            colors[prop] = rootStyles.getPropertyValue(prop);
          }
        }
        
        // Extract colors from all stylesheets
        const stylesheets = Array.from(document.styleSheets);
        const cssColors = new Set();
        
        try {
          stylesheets.forEach(sheet => {
            if (sheet.cssRules) {
              Array.from(sheet.cssRules).forEach(rule => {
                if (rule.style) {
                  ['color', 'background-color', 'border-color', 'background'].forEach(prop => {
                    const value = rule.style[prop];
                    if (value) cssColors.add(value);
                  });
                }
              });
            }
          });
        } catch (e) {
          console.log('Could not access some stylesheets due to CORS');
        }
        
        return {
          cssVariables: colors,
          extractedColors: Array.from(cssColors)
        };
      };

      return {
        title: document.title,
        url: window.location.href,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        
        // Complete HTML structure
        htmlStructure: {
          head: document.head.innerHTML,
          bodyClasses: document.body.className,
          bodyStyles: window.getComputedStyle(document.body)
        },
        
        // Color scheme and design tokens
        colorScheme: extractColorScheme(),
        
        // Hero section - typically the first main section or prominent area
        heroSection: Array.from(document.querySelectorAll('section:first-of-type, .hero, .banner, .main-banner, div[class*="hero"], div[class*="banner"], main > div:first-child, body > div:first-child > div:first-child')).map(getElementInfo),
        
        // All sections for hierarchy
        sections: Array.from(document.querySelectorAll('section, article, .section, div[class*="section"], div[class*="container"], div[class*="wrapper"], main > div, body > div > div')).map(getElementInfo),
        
        // Navigation elements
        navigation: Array.from(document.querySelectorAll('nav, .nav, .navigation, header, .header, div[class*="nav"], div[class*="header"]')).map(getElementInfo),
        
        // Footer elements
        footer: Array.from(document.querySelectorAll('footer, .footer, div[class*="footer"]')).map(getElementInfo),
        
        // Buttons with detailed styling
        buttons: Array.from(document.querySelectorAll('button, .btn, [role="button"], input[type="button"], input[type="submit"], a[class*="button"], a[class*="btn"], div[class*="button"], div[class*="btn"]')).map(getElementInfo),
        
        // CTAs (Call to Action elements)
        ctas: Array.from(document.querySelectorAll('.cta, [class*="cta"], .call-to-action, [class*="call-to-action"], .signup, .get-started, .try-now, .learn-more')).map(getElementInfo),
        
        // Headings for content hierarchy
        headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          level: h.tagName.toLowerCase(),
          text: h.textContent.trim(),
          id: h.id,
          className: h.className,
          styles: {
            fontSize: window.getComputedStyle(h).fontSize,
            fontWeight: window.getComputedStyle(h).fontWeight,
            fontFamily: window.getComputedStyle(h).fontFamily,
            color: window.getComputedStyle(h).color,
            lineHeight: window.getComputedStyle(h).lineHeight,
            marginTop: window.getComputedStyle(h).marginTop,
            marginBottom: window.getComputedStyle(h).marginBottom
          }
        })),
        
        // Feature sections
        features: Array.from(document.querySelectorAll('.feature, [class*="feature"], .benefit, [class*="benefit"], .card, [class*="card"], .service, [class*="service"]')).map(getElementInfo),
        
        // Typography samples
        typography: {
          paragraphs: Array.from(document.querySelectorAll('p')).slice(0, 10).map(p => ({
            text: p.textContent.trim().substring(0, 100),
            styles: {
              fontSize: window.getComputedStyle(p).fontSize,
              fontFamily: window.getComputedStyle(p).fontFamily,
              lineHeight: window.getComputedStyle(p).lineHeight,
              color: window.getComputedStyle(p).color,
              fontWeight: window.getComputedStyle(p).fontWeight
            }
          })),
          links: Array.from(document.querySelectorAll('a')).slice(0, 10).map(a => ({
            text: a.textContent.trim(),
            href: a.href,
            styles: {
              color: window.getComputedStyle(a).color,
              textDecoration: window.getComputedStyle(a).textDecoration,
              fontSize: window.getComputedStyle(a).fontSize,
              fontWeight: window.getComputedStyle(a).fontWeight
            }
          }))
        },
        
        // Layout containers
        containers: Array.from(document.querySelectorAll('div, section, article, main, aside')).filter(el => {
          const styles = window.getComputedStyle(el);
          return styles.display === 'flex' || styles.display === 'grid' || styles.display === 'block';
        }).slice(0, 20).map(getElementInfo),
        
        // Forms and inputs
        forms: Array.from(document.querySelectorAll('form')).map(getElementInfo),
        inputs: Array.from(document.querySelectorAll('input, textarea, select')).map(getElementInfo),
        
        // Images and media
        images: Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          className: img.className,
          styles: {
            width: window.getComputedStyle(img).width,
            height: window.getComputedStyle(img).height,
            objectFit: window.getComputedStyle(img).objectFit,
            borderRadius: window.getComputedStyle(img).borderRadius
          }
        })),
        
        // Unique design patterns - elements with interesting classes or data attributes
        designPatterns: Array.from(document.querySelectorAll('*')).filter(el => {
          const className = el.className;
          const hasInterestingClass = className && (
            className.includes('gradient') ||
            className.includes('shadow') ||
            className.includes('card') ||
            className.includes('modal') ||
            className.includes('overlay') ||
            className.includes('animation') ||
            className.includes('hover') ||
            className.includes('transition')
          );
          return hasInterestingClass;
        }).slice(0, 15).map(getElementInfo),
        
        // Extract all text content for analysis
        bodyText: document.body.innerText,
        
        // Meta information
        meta: Array.from(document.querySelectorAll('meta')).map(meta => ({
          name: meta.name,
          content: meta.content,
          property: meta.property
        }))
      };
    });

    // Save the extracted content to a file
    fs.writeFileSync('/Users/michaelkraft/pitch-deck-builder/mcp-scraper/gamma-site-analysis.json', JSON.stringify(content, null, 2));
    
    console.log('Scraping completed successfully!');
    console.log('Results saved to gamma-site-analysis.json');
    
    return content;
  } catch (error) {
    console.error('Error scraping Gamma site:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

scrapeGammaSite().catch(console.error);
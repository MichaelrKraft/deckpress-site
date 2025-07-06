#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

class WebScraperServer {
  constructor() {
    this.server = new Server(
      {
        name: "web-scraper",
        version: "0.1.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error("[MCP Error]", error);
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "scrape_page",
          description: "Scrape a web page and extract content, structure, and metadata",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "The URL to scrape",
              },
              waitFor: {
                type: "string",
                description: "CSS selector to wait for before scraping (optional)",
              },
              fullPage: {
                type: "boolean",
                description: "Whether to capture full page screenshot (optional)",
              },
            },
            required: ["url"],
          },
        },
        {
          name: "extract_structure",
          description: "Extract the structural elements and layout of a page",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "The URL to analyze",
              },
            },
            required: ["url"],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case "scrape_page":
          return await this.scrapePage(args.url, args.waitFor, args.fullPage);
        case "extract_structure":
          return await this.extractStructure(args.url);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async scrapePage(url, waitFor, fullPage = false) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      console.error(`[MCP] Navigating to: ${url}`);
      await page.goto(url, { waitUntil: "networkidle2" });

      if (waitFor) {
        await page.waitForSelector(waitFor, { timeout: 10000 });
      }

      // Extract page content
      const content = await page.evaluate(() => {
        return {
          title: document.title,
          url: window.location.href,
          html: document.documentElement.outerHTML,
          text: document.body.innerText,
          links: Array.from(document.links).map(link => ({
            text: link.textContent.trim(),
            href: link.href,
            title: link.title
          })),
          images: Array.from(document.images).map(img => ({
            src: img.src,
            alt: img.alt,
            title: img.title
          })),
          headings: Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
            level: h.tagName.toLowerCase(),
            text: h.textContent.trim(),
            id: h.id
          })),
          sections: Array.from(document.querySelectorAll('section, article, div[class*="section"]')).map(section => ({
            tagName: section.tagName.toLowerCase(),
            className: section.className,
            id: section.id,
            text: section.textContent.trim().substring(0, 200) + '...'
          }))
        };
      });

      // Take screenshot if requested
      let screenshot = null;
      if (fullPage) {
        screenshot = await page.screenshot({ 
          fullPage: true,
          encoding: 'base64'
        });
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              ...content,
              screenshot: screenshot ? `data:image/png;base64,${screenshot}` : null
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(`[MCP] Error scraping ${url}:`, error);
      return {
        content: [
          {
            type: "text",
            text: `Error scraping ${url}: ${error.message}`,
          },
        ],
        isError: true,
      };
    } finally {
      await browser.close();
    }
  }

  async extractStructure(url) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      console.error(`[MCP] Analyzing structure of: ${url}`);
      await page.goto(url, { waitUntil: "networkidle2" });

      // Extract detailed structure
      const structure = await page.evaluate(() => {
        const getElementInfo = (element) => {
          const rect = element.getBoundingClientRect();
          const styles = window.getComputedStyle(element);
          
          return {
            tagName: element.tagName.toLowerCase(),
            className: element.className,
            id: element.id,
            textContent: element.textContent?.trim().substring(0, 100) + '...',
            position: {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            },
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
          layout: {
            header: Array.from(document.querySelectorAll('header, nav, [role="banner"]')).map(getElementInfo),
            main: Array.from(document.querySelectorAll('main, [role="main"], .main-content')).map(getElementInfo),
            sections: Array.from(document.querySelectorAll('section, article, .section')).map(getElementInfo),
            footer: Array.from(document.querySelectorAll('footer, [role="contentinfo"]')).map(getElementInfo)
          },
          buttons: Array.from(document.querySelectorAll('button, .btn, [role="button"], input[type="button"], input[type="submit"]')).map(getElementInfo),
          forms: Array.from(document.querySelectorAll('form')).map(getElementInfo),
          navigation: Array.from(document.querySelectorAll('nav, .nav, .navigation')).map(getElementInfo)
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(structure, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error(`[MCP] Error extracting structure from ${url}:`, error);
      return {
        content: [
          {
            type: "text",
            text: `Error extracting structure from ${url}: ${error.message}`,
          },
        ],
        isError: true,
      };
    } finally {
      await browser.close();
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Web Scraper MCP server running on stdio");
  }
}

const server = new WebScraperServer();
server.run().catch(console.error);
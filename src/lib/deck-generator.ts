import { SlideContent, StartupContext } from './openai'

export interface DeckTheme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
    surface: string
  }
  fonts: {
    heading: string
    body: string
  }
  styles: {
    borderRadius: string
    shadow: string
    gradient?: string
  }
}

export const DECK_THEMES: Record<string, DeckTheme> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#f8fafc'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '8px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
    }
  },
  vibrant: {
    id: 'vibrant',
    name: 'Vibrant',
    colors: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#f97316',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#fef2f2'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '12px',
      shadow: '0 8px 25px -1px rgba(220, 38, 38, 0.2)',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    colors: {
      primary: '#374151',
      secondary: '#1f2937',
      accent: '#6b7280',
      text: '#111827',
      background: '#ffffff',
      surface: '#f9fafb'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '4px',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    }
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate',
    colors: {
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#3730a3',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#f1f5f9'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '6px',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)'
    }
  },
  startup: {
    id: 'startup',
    name: 'Startup',
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#a855f7',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#faf5ff'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '10px',
      shadow: '0 10px 15px -3px rgba(124, 58, 237, 0.1)',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
    }
  },
  investor: {
    id: 'investor',
    name: 'Investor',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      text: '#1f2937',
      background: '#ffffff',
      surface: '#f0fdf4'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '8px',
      shadow: '0 4px 6px -1px rgba(5, 150, 105, 0.1)',
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
    }
  },
  // NEW 21st DEV THEMES
  neonCyberpunk: {
    id: 'neonCyberpunk',
    name: 'Neon Cyberpunk',
    colors: {
      primary: '#00f5ff',
      secondary: '#ff0080',
      accent: '#39ff14',
      text: '#ffffff',
      background: '#0a0a0f',
      surface: 'rgba(15, 15, 25, 0.8)'
    },
    fonts: {
      heading: 'JetBrains Mono, monospace',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '0px',
      shadow: '0 0 20px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(255, 0, 128, 0.1)',
      gradient: 'linear-gradient(135deg, #00f5ff 0%, #ff0080 50%, #39ff14 100%)'
    }
  },
  glassMorphism: {
    id: 'glassMorphism',
    name: 'Glass Morphism',
    colors: {
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#f59e0b',
      text: '#1f2937',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      surface: 'rgba(255, 255, 255, 0.1)'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '20px',
      shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
    }
  },
  gradientMesh: {
    id: 'gradientMesh',
    name: 'Gradient Mesh',
    colors: {
      primary: '#f093fb',
      secondary: '#f5576c',
      accent: '#4facfe',
      text: '#2d3748',
      background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #f093fb 100%)',
      surface: 'rgba(255, 255, 255, 0.95)'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    styles: {
      borderRadius: '24px',
      shadow: '0 20px 40px rgba(240, 147, 251, 0.4)',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)'
    }
  },
  retroTerminal: {
    id: 'retroTerminal',
    name: 'Retro Terminal',
    colors: {
      primary: '#00ff00',
      secondary: '#ffff00',
      accent: '#ff8c00',
      text: '#00ff00',
      background: '#000000',
      surface: '#001100'
    },
    fonts: {
      heading: 'Courier New, monospace',
      body: 'Courier New, monospace'
    },
    styles: {
      borderRadius: '0px',
      shadow: '0 0 10px rgba(0, 255, 0, 0.5), inset 0 0 10px rgba(0, 255, 0, 0.1)',
      gradient: 'linear-gradient(90deg, #00ff00 0%, #ffff00 50%, #ff8c00 100%)'
    }
  },
  brutalistModern: {
    id: 'brutalistModern',
    name: 'Brutalist Modern',
    colors: {
      primary: '#ff6b6b',
      secondary: '#000000',
      accent: '#ffd93d',
      text: '#000000',
      background: '#ffffff',
      surface: '#f8f9fa'
    },
    fonts: {
      heading: 'Arial Black, sans-serif',
      body: 'Helvetica, sans-serif'
    },
    styles: {
      borderRadius: '0px',
      shadow: '8px 8px 0px #000000',
      gradient: 'linear-gradient(45deg, #ff6b6b 0%, #ffd93d 100%)'
    }
  }
}

export interface GeneratedDeck {
  id: string
  title: string
  theme: string
  createdAt: string
  slides: SlideContent[]
  context: StartupContext
}

export class DeckGenerator {
  generateDeckHTML(deck: GeneratedDeck): string {
    const theme = DECK_THEMES[deck.theme] || DECK_THEMES.modern
    
    const slides = deck.slides.map((slide, index) => 
      this.generateSlideHTML(slide, theme, index + 1, deck.slides.length)
    ).join('')

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${deck.title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${theme.fonts.body};
            background: ${theme.colors.background};
            color: ${theme.colors.text};
            line-height: 1.6;
        }
        
        .deck-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .slide {
            background: ${theme.colors.surface};
            border-radius: ${theme.styles.borderRadius};
            box-shadow: ${theme.styles.shadow};
            padding: 3rem;
            margin-bottom: 2rem;
            min-height: 600px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            page-break-after: always;
        }
        
        .slide-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid ${theme.colors.primary};
        }
        
        .slide-number {
            background: ${theme.colors.primary};
            color: white;
            padding: 0.5rem 1rem;
            border-radius: ${theme.styles.borderRadius};
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .slide-title {
            font-family: ${theme.fonts.heading};
            font-size: 2.5rem;
            font-weight: 700;
            color: ${theme.colors.primary};
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .slide-subtitle {
            font-size: 1.25rem;
            color: ${theme.colors.secondary};
            margin-bottom: 2rem;
            font-weight: 500;
        }
        
        .slide-content {
            flex: 1;
        }
        
        .bullets {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .bullets li {
            padding: 0.75rem 0;
            padding-left: 2rem;
            position: relative;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .bullets li::before {
            content: "▶";
            color: ${theme.colors.accent};
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .metric {
            background: ${theme.colors.background};
            padding: 1.5rem;
            border-radius: ${theme.styles.borderRadius};
            border-left: 4px solid ${theme.colors.accent};
            text-align: center;
        }
        
        .metric-value {
            font-size: 2rem;
            font-weight: 700;
            color: ${theme.colors.primary};
            margin-bottom: 0.5rem;
        }
        
        .metric-label {
            font-size: 0.9rem;
            color: ${theme.colors.secondary};
            font-weight: 500;
        }
        
        .callout {
            background: ${theme.colors.primary};
            color: white;
            padding: 1.5rem;
            border-radius: ${theme.styles.borderRadius};
            margin: 2rem 0;
            font-size: 1.1rem;
            font-weight: 500;
            text-align: center;
        }
        
        .next-steps {
            background: ${theme.colors.surface};
            padding: 1.5rem;
            border-radius: ${theme.styles.borderRadius};
            border: 1px solid ${theme.colors.accent};
            margin-top: 2rem;
        }
        
        .next-steps h4 {
            color: ${theme.colors.primary};
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .next-steps ul {
            list-style: none;
        }
        
        .next-steps li {
            padding: 0.5rem 0;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .next-steps li::before {
            content: "✓";
            color: ${theme.colors.accent};
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        @media print {
            .deck-container {
                padding: 0;
            }
            
            .slide {
                margin-bottom: 0;
                box-shadow: none;
                border: 1px solid #ddd;
            }
        }
        
        @media (max-width: 768px) {
            .slide {
                padding: 2rem;
                margin-bottom: 1rem;
            }
            
            .slide-title {
                font-size: 2rem;
            }
            
            .metrics {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="deck-container">
        ${slides}
    </div>
</body>
</html>`
  }

  private generateSlideHTML(slide: SlideContent, theme: DeckTheme, slideNumber: number, totalSlides: number): string {
    const { content } = slide
    
    const metricsHTML = content.metrics && content.metrics.length > 0 
      ? `<div class="metrics">
          ${content.metrics.map(metric => `
            <div class="metric">
              <div class="metric-value">${metric.value}</div>
              <div class="metric-label">${metric.label}</div>
              ${metric.context ? `<div class="metric-context">${metric.context}</div>` : ''}
            </div>
          `).join('')}
        </div>`
      : ''

    const bulletsHTML = content.bullets && content.bullets.length > 0
      ? `<ul class="bullets">
          ${content.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>`
      : ''

    const calloutHTML = content.callout 
      ? `<div class="callout">${content.callout}</div>`
      : ''

    const nextStepsHTML = content.nextSteps && content.nextSteps.length > 0
      ? `<div class="next-steps">
          <h4>Key Takeaways</h4>
          <ul>
            ${content.nextSteps.map(step => `<li>${step}</li>`).join('')}
          </ul>
        </div>`
      : ''

    return `
      <div class="slide">
        <div class="slide-header">
          <div class="slide-number">${slideNumber} / ${totalSlides}</div>
        </div>
        
        <div class="slide-content">
          <h1 class="slide-title">${slide.title}</h1>
          ${content.subheadline ? `<h2 class="slide-subtitle">${content.subheadline}</h2>` : ''}
          
          <div class="main-content">
            ${bulletsHTML}
            ${metricsHTML}
            ${calloutHTML}
            ${nextStepsHTML}
          </div>
        </div>
      </div>`
  }

  generatePreviewData(deck: GeneratedDeck) {
    return {
      id: deck.id,
      title: deck.title,
      theme: deck.theme,
      slideCount: deck.slides.length,
      slides: deck.slides.map((slide, index) => ({
        id: slide.id,
        number: index + 1,
        title: slide.title,
        type: slide.type,
        summary: slide.content.headline,
        hasMetrics: !!(slide.content.metrics && slide.content.metrics.length > 0),
        hasCallout: !!slide.content.callout
      }))
    }
  }
}

export const deckGenerator = new DeckGenerator()
export default deckGenerator
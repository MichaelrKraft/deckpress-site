# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server (default port 3000)
npm run dev -- --port 4007  # Start on alternative port (avoid 3000s range)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Docker Development
```bash
docker-compose up --build    # Build and run with Docker
docker build -t deckpress . # Build Docker image
```

### Testing AI Integration
The application works in demo mode without real OpenAI API keys. Set `OPENAI_API_KEY=demo_key_for_testing` in `.env.local` to use fallback content generation.

## ⚠️ Local Development Setup

### CRITICAL: Static Export Configuration Issue

**This project uses Next.js with API routes for AI deck generation. Before running locally, you MUST check the configuration:**

#### 1. Check `next.config.js` Configuration
```javascript
// FOR DEVELOPMENT - These lines MUST be commented out:
// output: 'export',
// trailingSlash: true,

// FOR PRODUCTION DEPLOYMENT - Uncomment if deploying as static site
```

#### 2. Why This Matters
- **Static export** (`output: 'export'`) **BREAKS API routes** (`/api/generate-outline`, `/api/generate-deck`, etc.)
- **Development server fails** with "site can't be reached" errors
- **AI functionality won't work** without API route support

#### 3. Port Conflicts with Multiple Projects
If running multiple Claude Code projects simultaneously:
```bash
# Default port (may conflict)
npm run dev

# Use alternative port to avoid conflicts
npm run dev -- --port 3001
npm run dev -- --port 4000
```

### Common Local Development Issues

#### ❌ "Site can't be reached" / "Connection refused"
**Cause**: Static export is enabled in `next.config.js`
**Solution**: 
1. Comment out `output: 'export'` and `trailingSlash: true` in `next.config.js`
2. Restart development server
3. Alternative: Use `npx serve out -p 3001` to serve static build

#### ❌ "initializeSessionControls is not a function"
**Cause**: Port conflict with another project (usually autonomous_vibe_interface on port 3000)
**Solution**: Use different port: `npm run dev -- --port 3001`

#### ❌ "Failed to execute 'json' on 'Response': Unexpected end of JSON input"
**Cause**: API routes not working due to static export configuration
**Solution**: Disable static export in `next.config.js` for development

### Development vs Production Configuration

| Environment | Static Export | API Routes | Use Case |
|-------------|---------------|------------|----------|
| **Development** | ❌ Disabled | ✅ Working | Local testing with AI features |
| **Production** | ⚠️ Optional | ❌ Limited | Static hosting (Vercel handles this automatically) |

### Quick Start Checklist
1. ✅ Check `next.config.js` - static export commented out
2. ✅ Verify port availability (avoid 3000 if running other projects)
3. ✅ Run `npm run dev` or `npm run dev -- --port 3001`
4. ✅ Test API endpoints work (try generating a deck)
5. ✅ Set `OPENAI_API_KEY=demo_key_for_testing` for demo mode

## Architecture Overview

### Application Structure
DeckPress is an AI-powered pitch deck generator built with Next.js 14, inspired by Gamma.app's creation flow. The application follows a 5-step AI-guided process: Mode Selection → Business Input → AI Outline Generation → Theme Selection → Full Deck Generation.

### Core Data Flow
1. **User Input**: Business description, industry, audience, slide count
2. **AI Processing**: OpenAI generates structured outline and slide content
3. **Theme Application**: Professional visual design applied to content
4. **Export Generation**: HTML-to-PDF conversion for download

### Key Architectural Components

#### Inline Editing System (NEW)
DeckPress now features Gamma-style inline editing across all slide templates:
- **EditableText Component** (`src/components/ui/EditableText.tsx`): ContentEditable-based rich text editor with formatting toolbar
- **EditableList Component** (`src/components/ui/EditableList.tsx`): Drag-and-drop list management with individual item editing
- **Slide Template Integration**: All slide templates (Title, Problem, Solution, Market, Default, QAChat) support inline editing
- **Rich Formatting**: Bold, italic, underline, alignment, lists, hyperlinks with keyboard shortcuts
- **AI Enhancement**: Per-element AI improvement with sparkle icons
- **Real-time Updates**: Direct slide content modification through onUpdateSlide callbacks

#### AI Generation Pipeline (`src/lib/openai.ts`)
- **OpenAIService**: Manages AI interactions with sophisticated prompt engineering for GPT-4
- **Fallback System**: Demo content generation when API unavailable or in demo mode
- **Content Types**: Structured slide generation with headlines, bullets, metrics, callouts, and next steps
- **Industry Customization**: Context-aware content for different startup types and audiences
- **Slide Enhancement**: Individual slide improvement with user natural language prompts
- **Sequential Generation**: Builds context from previous slides for coherent narrative

#### Deck Generation Engine (`src/lib/deck-generator.ts`)
- **Theme System**: 6 professional themes (Modern, Vibrant, Minimal, Corporate, Startup, Investor)
- **HTML Generation**: Converts structured content to styled HTML
- **Responsive Design**: Print-ready layouts with consistent styling
- **Component Architecture**: Reusable slide templates

#### Export System (`src/lib/pdf-export.ts`)
- **PDF Generation**: HTML2Canvas + jsPDF for high-quality exports
- **Browser Rendering**: Temporary DOM manipulation for accurate conversion
- **File Download**: Automatic PDF download with custom naming

#### API Routes (`src/app/api/`)
- `/api/generate-outline`: Creates slide structure from business input
- `/api/generate-deck`: Generates complete deck with all slide content
- `/api/improve-content`: AI-powered content improvement suggestions
- `/api/improve-slide-content`: Individual slide enhancement with user prompts

### UI Architecture

#### Builder Flow (`src/app/builder/page.tsx`)
State-driven 5-step wizard with Gamma-inspired UX:
- **Mode Selection**: Generate/Paste/Import options with animated cards
- **Topic Input**: Business description with validation and contextual prompts
- **Outline Review**: AI-generated slide structure with 21st dev styling, glassmorphism cards, and per-slide AI Revise functionality
- **Theme Selection**: Visual design picker with gradient previews
- **Generation**: Loading states with progress indicators and automatic PDF export

#### Deck Viewer (`src/components/deck/DeckViewer.tsx`)
Full-featured presentation interface:
- **Slide Navigation**: Left sidebar with thumbnails and slide type indicators
- **Content Display**: Theme-applied slide rendering with inline editing capabilities
- **AI Enhancement**: Per-slide AI improvement with chat interface (legacy modal system)
- **Export Controls**: PDF download and sharing
- **Responsive Layout**: Mobile and desktop optimized
- **Overview Mode**: Continuous scrolling presentation view

#### Slide Template System (`src/components/slides/`)
All slide templates follow consistent patterns:
- **Template Props**: Include `onUpdateSlide` and `onAiImprove` for inline editing
- **Content Updates**: Use `updateSlideContent` helper for field-specific updates
- **Title Updates**: Use `handleTitleChange` for slide title modifications
- **Editable Integration**: Replace static text with `EditableText` and `EditableList` components
- **Template Types**: TitleSlideTemplate, ProblemSlideTemplate, SolutionSlideTemplate, MarketSlideTemplate, DefaultSlideTemplate, QAChatSlideTemplate

#### Component System (`src/components/`)
- **UI Components**: Reusable Button, Card, Input, Badge components with consistent styling
- **Editing Components**: EditableText and EditableList for inline content modification
- **Layout System**: Container, Section, Grid components for responsive design
- **Animation**: Framer Motion integration throughout with glassmorphism effects
- **Form Components**: Multi-step wizard controls with validation
- **Modal System**: AI chat interfaces and improvement dialogs
- **Icon Integration**: Lucide React icons with slide type mappings and gradient fills
- **Advanced UI**: Rainbow buttons with animated borders, animated infinity backgrounds, gradient text effects

### Environment Configuration

#### Required Environment Variables
```bash
OPENAI_API_KEY=your_api_key_here  # Set to "demo_key_for_testing" for fallback mode
NODE_ENV=development              # Environment setting
```

#### Demo Mode Operation
When `OPENAI_API_KEY` is unset or set to `demo_key_for_testing`, the system:
- Uses predefined slide structures with realistic content
- Generates contextual demo content based on prompt analysis
- Maintains full functionality without API calls to OpenAI
- Provides realistic sample output for development and testing
- Falls back gracefully from real AI to demo content on API failures

### Design System Integration

#### Modern Design Implementation
The application implements cutting-edge design patterns:
- **Color Palette**: Silver gradients, purple-blue combinations, and rainbow animations
- **Typography**: Inter font family with gradient text effects and animated counters
- **Component Patterns**: Card-based layouts with hover effects, glassmorphism, and 21st dev styling
- **Messaging**: "Build No-Code Investor Web Decks Instantly"
- **Advanced Animations**: Rainbow borders, animated infinity backgrounds, gradient text, and particle effects
- **Visual Hierarchy**: Professional silver elements replacing red accents for premium feel

#### Theme Architecture
Each theme defines:
- **Color System**: Primary, secondary, accent, text, background, surface
- **Typography**: Heading and body font specifications  
- **Styling**: Border radius, shadows, gradients
- **Responsive**: Mobile-first approach with breakpoints

### Data Models

#### Core Types (`src/lib/openai.ts`)
```typescript
interface SlideContent {
  id: number
  title: string
  type: SlideType
  content: {
    headline: string
    subheadline?: string
    bullets: string[]
    metrics?: MetricData[]
    callout?: string
    nextSteps?: string[]
  }
}

interface GeneratedDeck {
  id: string
  title: string
  theme: string
  slides: SlideContent[]
  context: StartupContext
}
```

### Performance Considerations

#### Build Optimization
- Static generation for landing pages
- Dynamic API routes for generation
- Optimized bundle splitting
- Font optimization with Next.js

#### PDF Generation
- Temporary DOM manipulation
- Canvas-based rendering
- Memory cleanup after export
- Error handling for large decks

### Development Workflow

#### React State Management Patterns
- **Component State**: Local state for UI interactions and form inputs
- **Prop Drilling**: AI chat state and editing handlers passed down to SlideRenderer components
- **Event Handling**: Direct state control instead of DOM manipulation
- **Animation State**: Framer Motion integration with React state
- **Inline Editing State**: EditableText and EditableList manage local editing state with callbacks

#### Build and Development Process
- **Hot Reload**: Next.js dev server with instant updates
- **TypeScript**: Strict typing throughout the application
- **ESLint**: Code quality enforcement with Next.js configuration (escape quotes with &apos; &ldquo; &rdquo;)
- **Build Optimization**: Static generation where possible, dynamic routes for AI endpoints

#### Page Version Strategy
The codebase maintains multiple page versions for development:
- `page.tsx`: Current AI-integrated builder with enhanced UI
- `page-old.tsx`: Previous form-based version
- `page-backup.tsx`: Original landing page
- `page-gamma-inspired.tsx`: Gamma design studies

#### MCP Integration
The `mcp-scraper/` directory contains Model Context Protocol tools used for design research and competitive analysis of Gamma.app's structure.

### Production Deployment

#### Docker Configuration
Multi-stage build optimized for production:
- Node.js 18 Alpine base
- Dependency caching
- Production optimization
- Security-hardened user permissions

#### Environment Setup
Production requires:
- Valid OpenAI API key for full functionality (GPT-4 access recommended)
- Environment variables properly configured
- Build-time optimization enabled
- Static asset optimization

## Critical Development Notes

### Inline Editing Implementation Patterns
- **Never use DOM manipulation** for React state management (use props and state instead)
- **Pass editing handlers** (`onUpdateSlide`, `onAiImprove`) through slide template props
- **Use ContentEditable carefully** with proper event handling and state synchronization
- **Implement keyboard shortcuts** (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Enter, Escape) for professional UX
- **Provide visual feedback** with hover states, editing indicators, and formatting toolbars

### AI Integration Patterns
- **Always provide fallback content** when OpenAI API is unavailable
- **Validate API responses** and handle JSON parsing errors gracefully
- **Pass AI state through props** rather than searching DOM elements
- **Support field-specific AI improvement** for targeted content enhancement

### Slide Enhancement System
The AI improvement system uses a two-layer approach:
1. **Individual slide improvement** via `/api/improve-slide-content`
2. **Contextual enhancement** that considers previous slides for narrative flow
3. **User prompt processing** with natural language instructions
4. **Field-specific improvement** for targeted content areas (title, headline, bullets, etc.)

### Component Communication
- **SlideRenderer receives editing handlers** as props from DeckViewer parent
- **Modal state management** handled at the DeckViewer level (legacy AI chat system)
- **Inline editing state** managed locally in EditableText/EditableList with update callbacks
- **Toast notifications and error handling** integrated throughout the UI
- **Framer Motion animations** coordinated with React state changes

### Testing and Quality Assurance
- Run `npm run build` to verify TypeScript compilation and catch build errors
- Use `npm run lint` to enforce code quality standards
- Test both demo mode and real OpenAI API integration
- Verify PDF export functionality across different browsers
- Test inline editing functionality across all slide templates
- Verify keyboard shortcuts and formatting toolbar functionality

## Advanced UI Components

### EditableText Component (`src/components/ui/EditableText.tsx`)
- **ContentEditable-based** rich text editing with HTML content preservation
- **Formatting Toolbar**: Bold, italic, underline, alignment, lists, with keyboard shortcuts
- **AI Integration**: Sparkle button for content improvement
- **Variant Support**: h1, h2, h3, p, span with proper semantic markup
- **State Management**: Local editing state with onChange callbacks
- **Keyboard Navigation**: Enter to save, Escape to cancel, Ctrl+shortcuts for formatting

### EditableList Component (`src/components/ui/EditableList.tsx`)
- **Drag-and-drop reordering** with visual feedback and smooth animations
- **Individual item editing** using EditableText for each list item
- **List variants**: bullet, number, check with appropriate iconography
- **Add/remove functionality** with validation and maximum item limits
- **AI bulk improvement** for entire list content optimization
- **Visual management**: Hover states, grip handles, delete buttons

### Rainbow Button Component (`src/components/ui/rainbow-button.tsx`)
- **Animated rainbow borders** that cycle through 5 vibrant colors continuously
- **Gradient text support** with purple-blue color combinations
- **Blur glow effects** positioned beneath buttons for depth
- **CSS custom properties** for color definitions (--color-1 through --color-5)
- **TypeScript interface** extending HTML button attributes
- **Integration**: Replace standard purple buttons for premium CTAs

### Animated Infinity Background (`src/components/ui/animated-infinity-background.tsx`)
- **SVG path animation** creating infinity-shaped flowing lines
- **Configurable styles**: glass, gradient, solid, glow background effects
- **Letter-by-letter text animation** with spring physics and staggered reveals
- **Floating particle system** with continuous movement
- **Full-screen layouts** with centered content and overlay support
- **Integration**: Used in final CTA sections for dramatic impact

### Design System Extensions
- **CSS Color Variables**: Rainbow color system defined in globals.css
- **Animation Keyframes**: Rainbow animation with background-position shifts
- **Tailwind Config**: Extended with custom color mappings and animation utilities
- **Gradient Text Patterns**: Consistent purple-blue gradients for premium feel
- **Silver Accent System**: Metallic gradients replacing red elements for sophistication

### Landing Page Architecture

#### Section Structure
1. **Hero Section**: Animated gradient background with rainbow CTA buttons
2. **Problem/Solution**: Silver-highlighted statistics with comparative pricing cards
3. **Features Grid**: Icon-based feature cards with gradient backgrounds
4. **AI Demo**: Interactive mockup showing real-time deck generation
5. **How it Works**: Three-step process with animated icons and rainbow CTA
6. **Process Section**: Detailed workflow explanation with step indicators
7. **Final CTA**: Animated infinity background with overlaid call-to-action

#### Animation Patterns
- **Viewport-triggered animations** using Framer Motion's `whileInView`
- **Staggered reveals** with sequential delays for list items
- **Hover interactions** with scale transforms and glow effects
- **Background animations** including gradient orbs and particle systems
- **Text animations** with letter-by-letter reveals and gradient effects
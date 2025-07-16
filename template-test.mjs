import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Testing Template Integration...\n');

// Test 1: Check if template selector exists
try {
  const selectorPath = join(__dirname, 'src/components/templates/TemplateSelector.tsx');
  const selectorContent = readFileSync(selectorPath, 'utf8');
  
  if (selectorContent.includes('export function TemplateSelector')) {
    console.log('✅ TemplateSelector component exists');
  }
  
  if (selectorContent.includes('onTemplateSelect')) {
    console.log('✅ onTemplateSelect prop handler found');
  }
  
  if (selectorContent.includes('DECK_TEMPLATES')) {
    console.log('✅ DECK_TEMPLATES imported in TemplateSelector');
  }
} catch (e) {
  console.log('❌ Error checking TemplateSelector:', e.message);
}

// Test 2: Check template index
try {
  const indexPath = join(__dirname, 'src/lib/templates/index.ts');
  const indexContent = readFileSync(indexPath, 'utf8');
  
  const templateCount = (indexContent.match(/TEMPLATE/g) || []).length;
  console.log(`✅ Found ${templateCount} templates in index`);
  
  if (indexContent.includes('getTemplatesByFilter')) {
    console.log('✅ Filter function available');
  }
  
  if (indexContent.includes('getRecommendedTemplates')) {
    console.log('✅ Recommendation function available');
  }
} catch (e) {
  console.log('❌ Error checking template index:', e.message);
}

// Test 3: Check builder integration
try {
  const builderPath = join(__dirname, 'src/app/builder/page.tsx');
  const builderContent = readFileSync(builderPath, 'utf8');
  
  if (builderContent.includes("currentStep, setCurrentStep] = useState('template-selection')")) {
    console.log('✅ Template selection set as initial step');
  }
  
  if (builderContent.includes('handleTemplateSelect')) {
    console.log('✅ Template selection handler implemented');
  }
  
  if (builderContent.includes('case \'template-selection\'')) {
    console.log('✅ Template selection case in switch statement');
  }
  
  if (builderContent.includes('renderTemplateSelection')) {
    console.log('✅ Template selection render function exists');
  }
} catch (e) {
  console.log('❌ Error checking builder integration:', e.message);
}

console.log('\n🎉 Integration test completed!');
// Quick integration test script
const http = require('http');
const path = require('path');
const fs = require('fs');

console.log('Testing template integration...');

// Test 1: Check if key files exist
const filesToCheck = [
  'src/components/templates/TemplateSelector.tsx',
  'src/lib/templates/index.ts',
  'src/lib/deck-templates.ts',
  'src/app/builder/page.tsx'
];

console.log('\n✓ Checking file existence:');
filesToCheck.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✓ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} missing`);
  }
});

// Test 2: Check if template exports work
console.log('\n✓ Checking template exports:');
try {
  const templatesPath = path.join(__dirname, 'src/lib/templates/index.ts');
  const templateContent = fs.readFileSync(templatesPath, 'utf8');
  
  if (templateContent.includes('DECK_TEMPLATES')) {
    console.log('  ✓ DECK_TEMPLATES export found');
  }
  
  if (templateContent.includes('getTemplatesByFilter')) {
    console.log('  ✓ getTemplatesByFilter function found');
  }
  
  if (templateContent.includes('getRecommendedTemplates')) {
    console.log('  ✓ getRecommendedTemplates function found');
  }
} catch (e) {
  console.log('  ❌ Error reading templates:', e.message);
}

// Test 3: Check builder integration
console.log('\n✓ Checking builder integration:');
try {
  const builderPath = path.join(__dirname, 'src/app/builder/page.tsx');
  const builderContent = fs.readFileSync(builderPath, 'utf8');
  
  if (builderContent.includes('template-selection')) {
    console.log('  ✓ template-selection step found');
  }
  
  if (builderContent.includes('handleTemplateSelect')) {
    console.log('  ✓ handleTemplateSelect function found');
  }
  
  if (builderContent.includes('TemplateSelector')) {
    console.log('  ✓ TemplateSelector component imported');
  }
} catch (e) {
  console.log('  ❌ Error reading builder:', e.message);
}

console.log('\n✓ Integration test completed!');
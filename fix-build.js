// Build fix script to identify and resolve common issues
const fs = require('fs');
const path = require('path');

console.log('🔧 Diagnosing build issues...\n');

// Check 1: Verify all template files exist
const templateFiles = [
  'src/lib/templates/yc-standard.ts',
  'src/lib/templates/sequoia-capital.ts',
  'src/lib/templates/b2b-saas.ts',
  'src/lib/templates/product-launch.ts',
  'src/lib/templates/marketplace.ts',
  'src/lib/templates/ai-ml-startup.ts',
  'src/lib/templates/hardware-iot.ts',
  'src/lib/templates/social-impact.ts'
];

console.log('✅ Checking template files:');
templateFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} MISSING`);
  }
});

// Check 2: Verify exports in template files
console.log('\n✅ Checking template exports:');
templateFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const filename = path.basename(file, '.ts');
    const expectedExport = filename.toUpperCase().replace(/-/g, '_') + '_TEMPLATE';
    
    if (content.includes(`export const ${expectedExport}`)) {
      console.log(`  ✅ ${file} exports ${expectedExport}`);
    } else {
      console.log(`  ❌ ${file} missing export ${expectedExport}`);
    }
  }
});

// Check 3: Verify main template index
console.log('\n✅ Checking template index:');
const indexFile = 'src/lib/templates/index.ts';
if (fs.existsSync(indexFile)) {
  const content = fs.readFileSync(indexFile, 'utf8');
  console.log(`  ✅ ${indexFile} exists`);
  
  if (content.includes('DECK_TEMPLATES')) {
    console.log('  ✅ DECK_TEMPLATES export found');
  } else {
    console.log('  ❌ DECK_TEMPLATES export missing');
  }
} else {
  console.log(`  ❌ ${indexFile} MISSING`);
}

// Check 4: Verify TemplateSelector component
console.log('\n✅ Checking TemplateSelector component:');
const selectorFile = 'src/components/templates/TemplateSelector.tsx';
if (fs.existsSync(selectorFile)) {
  const content = fs.readFileSync(selectorFile, 'utf8');
  console.log(`  ✅ ${selectorFile} exists`);
  
  if (content.includes('export function TemplateSelector')) {
    console.log('  ✅ TemplateSelector export found');
  } else {
    console.log('  ❌ TemplateSelector export missing');
  }
} else {
  console.log(`  ❌ ${selectorFile} MISSING`);
}

console.log('\n🎉 Diagnosis complete! Check output above for issues.');
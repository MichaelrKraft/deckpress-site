// Test script to verify template system TypeScript compilation
import { DECK_TEMPLATES } from './src/lib/templates/index'
import { DeckTemplate } from './src/lib/deck-templates'

console.log('Testing template system...')

// Test 1: Check if all templates are loaded
const templateIds = Object.keys(DECK_TEMPLATES)
console.log(`Found ${templateIds.length} templates:`, templateIds)

// Test 2: Check if each template is valid
templateIds.forEach(id => {
  const template = DECK_TEMPLATES[id]
  if (!template) {
    console.error(`❌ Template ${id} is undefined`)
    return
  }
  
  console.log(`✅ Template ${id}: ${template.name}`)
  console.log(`   - ${template.slides.length} slides`)
  console.log(`   - Industries: ${template.industry.join(', ')}`)
  console.log(`   - Funding stages: ${template.fundingStage.join(', ')}`)
})

console.log('✅ Template system test completed!')
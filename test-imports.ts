// Test imports that might be causing build failures
try {
  // Test 1: DeckTemplate type
  console.log('Testing DeckTemplate import...')
  const { DeckTemplate } = require('./src/lib/deck-templates')
  console.log('✅ DeckTemplate imported successfully')
  
  // Test 2: Templates import
  console.log('Testing templates import...')
  const { DECK_TEMPLATES } = require('./src/lib/templates/index')
  console.log('✅ DECK_TEMPLATES imported successfully')
  console.log(`Found ${Object.keys(DECK_TEMPLATES).length} templates`)
  
  // Test 3: Check if template structure is valid
  console.log('Testing template structure...')
  const firstTemplate = Object.values(DECK_TEMPLATES)[0]
  console.log(`First template: ${firstTemplate.name}`)
  console.log(`Slides: ${firstTemplate.slides.length}`)
  console.log('✅ Template structure valid')
  
  console.log('🎉 All imports successful!')
} catch (error) {
  console.error('❌ Import error:', error.message)
  console.error('Stack:', error.stack)
}
"use client"

import React from 'react'
import { Layout, Container } from '@/components/layout/Layout'
import { TemplateSelector } from '@/components/templates/TemplateSelector'
import { DeckTemplate } from '@/lib/deck-templates'

export default function TemplateTestPage() {
  const handleTemplateSelect = (template: DeckTemplate) => {
    console.log('Selected template:', template)
    alert(`Selected template: ${template.name}`)
  }

  return (
    <Layout showHeader={true}>
      <Container className="py-12">
        <TemplateSelector
          onTemplateSelect={handleTemplateSelect}
          userContext={{
            industry: 'Technology',
            fundingStage: 'seed',
            experience: 'beginner'
          }}
        />
      </Container>
    </Layout>
  )
}
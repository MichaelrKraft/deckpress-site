"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Container, Section, Grid } from '@/components/layout/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

// This will be the new Gamma-inspired landing page
// We'll update this once we get the exact content from the Gamma site

export default function GammaInspiredHome() {
  return (
    <Layout showHeader={true}>
      {/* Hero Section - To be updated with Gamma content */}
      <Section className="relative overflow-hidden">
        <Container>
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Badge variant="success" className="mb-6">
              🚀 AI-Powered Creation
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="text-white">Coming Soon:</span>
              <br />
              <GradientText variant="primary">
                Gamma-Inspired Design
              </GradientText>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto">
              We&apos;re analyzing the Gamma site structure to create the perfect pitch deck builder experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Building Your Deck
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                View our Actual Web Deck
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Placeholder for Gamma-inspired sections */}
      <Section className="py-24">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Replicating Gamma&apos;s Proven Design
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Once we extract the Gamma site structure, this page will be updated 
              to match their exact layout, messaging, and conversion flow.
            </p>
          </div>
        </Container>
      </Section>
    </Layout>
  )
}
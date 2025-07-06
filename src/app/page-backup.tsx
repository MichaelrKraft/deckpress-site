"use client"

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Layout, Container, Section, Grid } from '@/components/layout/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { 
  Sparkles, 
  Brain, 
  Users, 
  Zap, 
  Shield, 
  Rocket,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Layout showHeader={true}>
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-32 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gold-400/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <Container className="relative z-10">
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Pre-heading Badge */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="success" className="px-4 py-2 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Pitch Creation
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white">Pitch Decks are Soo 80&apos;s, How about an AI Web Deck?</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Create investor-ready pitch decks in minutes, not weeks. 
              <br className="hidden md:block" />
              AI-powered insights, smart validation, and professional templates.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300" 
                onClick={() => window.location.href = '/builder'}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/20 hover:bg-white/10">
                <Star className="w-5 h-5 mr-2" />
                View our Actual Web Deck
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <AnimatedCounter from={0} to={1200} suffix="+" className="text-2xl font-bold text-gold-400" />
                <span>Decks Created</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <AnimatedCounter from={0} to={45} suffix="M+" prefix="$" className="text-2xl font-bold text-green-400" />
                <span>Funding Raised</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              <div className="flex items-center gap-2">
                <AnimatedCounter from={0} to={89} suffix="%" className="text-2xl font-bold text-blue-400" />
                <span>Success Rate</span>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="py-24">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="default" className="mb-4">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need to 
              <GradientText variant="primary" className="block mt-2">
                raise funding
              </GradientText>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Stop wasting time on pitch deck mistakes. Our AI ensures your presentation hits every investor requirement.
            </p>
          </motion.div>

          <Grid cols={3} gap="lg" className="mb-20">
            {[
              {
                icon: Shield,
                title: "Smart Validation",
                description: "AI identifies and prevents the 10 most common pitch deck mistakes that turn off investors",
                color: "from-red-500 to-pink-600"
              },
              {
                icon: Users,
                title: "Real-time Collaboration",
                description: "Work with your team and get instant feedback from investors in real-time",
                color: "from-blue-500 to-purple-600"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Create professional pitch decks in minutes using AI-powered templates and suggestions",
                color: "from-yellow-500 to-orange-600"
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description: "AI-powered market analysis and competitive intelligence built into every slide",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Brain,
                title: "AI Content Generation",
                description: "Generate compelling content suggestions based on successful funding rounds",
                color: "from-purple-500 to-violet-600"
              },
              {
                icon: Clock,
                title: "Instant Export",
                description: "Export to PDF, PowerPoint, or present directly from the platform",
                color: "from-indigo-500 to-blue-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover padding="lg" className="h-full border-white/10 hover:border-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-white/70 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Process Section */}
      <Section className="py-24 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        <Container>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              From idea to 
              <GradientText variant="gold" className="block mt-2">
                funded startup
              </GradientText>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our proven 3-step process has helped founders raise over $45M in funding.
            </p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:space-x-16">
            {[
              {
                step: "01",
                title: "AI-Guided Input",
                description: "Answer smart questions powered by successful pitch deck analysis",
                icon: Brain
              },
              {
                step: "02", 
                title: "Smart Validation",
                description: "AI analyzes your content and suggests improvements based on investor preferences",
                icon: Shield
              },
              {
                step: "03",
                title: "Professional Output",
                description: "Generate beautiful, investor-ready presentations in multiple formats",
                icon: Rocket
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center max-w-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <span className="text-slate-900 font-bold text-sm">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden lg:block absolute top-10 left-full w-16 h-px bg-gradient-to-r from-purple-500/50 to-transparent transform translate-x-8" />
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section className="py-24">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card padding="lg" className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30">
              <CardContent className="py-16">
                <Badge variant="success" className="mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Free to Start
                </Badge>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to build your 
                  <GradientText variant="primary" className="block mt-2">
                    game-changing pitch?
                  </GradientText>
                </h3>
                <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                  Join 1,200+ founders who&apos;ve already created winning pitch decks with DeckPress
                </p>
                <Button 
                  size="lg" 
                  className="text-xl px-12 py-6 bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-slate-900 font-bold shadow-xl hover:shadow-gold-500/25 transition-all duration-300"
                  onClick={() => window.location.href = '/builder'}
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Building Now - It&apos;s Free
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
                <p className="text-sm text-white/60 mt-6">
                  No credit card required • Export unlimited decks • AI-powered suggestions
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </Layout>
  )
}

"use client"

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Layout, Container, Section, Grid } from '@/components/layout/Layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { GradientText } from '@/components/ui/GradientText'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { BackgroundPaths } from '@/components/ui/animated-infinity-background'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { GradientButton } from '@/components/ui/gradient-button'
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
            className="text-center py-8"
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
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-white">Instantly Create Interactive Web Decks</span>
              <br />
              <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                with AI That Captivate Investors
              </span>
              <br />
              <span className="text-white">and Drive Funding Success!</span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-white/70 mb-8 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              PowerPoint is Soo 90&apos;s. Create stunning, interactive decks that blow investors away.
              <br className="hidden md:block" />
              <span className="text-purple-300 font-semibold">AI-powered, web-native, and built for the modern founder.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GradientButton 
                className="text-lg px-12 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.location.href = '/builder'}
              >
                <Brain className="w-6 h-6 mr-3" />
                Create Your Web Deck
                <ArrowRight className="w-5 h-5 ml-2" />
              </GradientButton>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-300 transition-all duration-300"
                onClick={() => window.location.href = '/examples'}
              >
                <Sparkles className="w-5 h-5 mr-2" />
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

      {/* Gamma-inspired Problem/Solution Section */}
      <Section className="py-12 bg-gradient-to-b from-slate-900/80 to-slate-800/60">
        <Container>
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Problem Statement */}
            <div className="text-center mb-12">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-slate-300 via-white to-slate-300 bg-clip-text text-transparent font-bold">95% of startups</span> struggle with pitch decks
              </motion.h2>
              <motion.p
                className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Most founders spend <span className="text-purple-300 font-semibold">weeks struggling with PowerPoint</span>, 
                hire expensive designers, or build mediocre decks that fail to convert investors.
              </motion.p>
            </div>

            {/* The New Way - Simplified */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge variant="success" className="mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  The Modern Way
                </Badge>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto">
                  Create stunning web decks in 
                  <GradientText variant="primary" className="block">
                    5 minutes, not 5 weeks
                  </GradientText>
                </h3>
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Skip the expensive designers and endless PowerPoint struggles. 
                  Our AI creates professional, interactive pitch decks that investors actually want to see.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GradientButton 
                variant="variant"
                className="text-lg px-10 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.location.href = '/builder'}
              >
                <Brain className="w-6 h-6 mr-3" />
                Try it Free - Create Your Web Deck Now
                <ArrowRight className="w-5 h-5 ml-3" />
              </GradientButton>
              <p className="text-white/60 mt-4">No credit card required • 2 minute setup</p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* How it Works Section */}
      <Section className="py-16 bg-gradient-to-b from-slate-800/30 to-slate-900/50">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="default" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              How it Works
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <GradientText variant="primary" className="block">
                Three Steps to Success
              </GradientText>
            </h2>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto">
              Our AI-powered platform makes creating professional pitch decks effortless
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Describe Your Business", 
                description: "Simply tell our AI about your startup, industry, and target audience",
                icon: Brain,
                color: "from-purple-500 to-blue-500"
              },
              {
                step: "02",
                title: "AI Generates Content",
                description: "Our AI creates a complete deck structure with compelling, investor-focused content",
                icon: Sparkles,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "03",
                title: "Customize & Present",
                description: "Fine-tune your deck with our AI assistant and present directly or export to PDF",
                icon: Rocket,
                color: "from-cyan-500 to-green-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-xl mb-4 relative`}>
                    <item.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-slate-900 font-bold text-sm">{item.step}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-lg text-white/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA for How it Works */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <GradientButton 
              variant="variant"
              className="text-lg px-10 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105" 
              onClick={() => window.location.href = '/builder'}
            >
              <Brain className="w-6 h-6 mr-3" />
              Start Creating Your Deck
              <ArrowRight className="w-5 h-5 ml-3" />
            </GradientButton>
            <p className="text-white/60 mt-4">Takes less than 5 minutes to get started</p>
          </motion.div>
        </Container>
      </Section>

      {/* Features Section */}
      <Section className="py-16">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="default" className="mb-4">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Everything you need to 
              <GradientText variant="primary" className="block mt-2">
                raise funding
              </GradientText>
            </h2>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto">
              Stop wasting time on pitch deck mistakes. Our AI ensures your presentation hits every investor requirement.
            </p>
          </motion.div>

          <Grid cols={3} gap="lg" className="mb-20">
            {[
              {
                icon: Shield,
                title: "Smart Validation",
                description: "AI identifies and prevents the 10 most common pitch deck mistakes that turn off investors",
                color: "from-slate-300 via-white to-slate-400"
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
                    <CardTitle className="text-3xl mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-lg text-white/70 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Interactive AI Demo Section */}
      <Section className="py-16 bg-gradient-to-b from-slate-800/50 to-purple-900/20">
        <Container>
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <Badge variant="default" className="mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                See AI in Action
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Watch AI create your 
                <GradientText variant="primary" className="block">
                  pitch deck in real-time
                </GradientText>
              </h2>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Just describe your startup, and watch our AI generate professional slides that convert investors.
              </p>
            </div>

            {/* Interactive Demo */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Input Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-purple-900/20 border-purple-400/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg mb-4">
                      <Brain className="w-5 h-5 mr-2 inline" />
                      Tell AI about your startup
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-sm text-white/60 mb-2">Business Description</p>
                        <p className="text-white">
                          &quot;We&apos;re building an AI-powered platform that helps wealth managers 
                          connect with qualified investors through automated matching and 
                          compliance verification.&quot;
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-sm text-white/60 mb-1">Industry</p>
                          <p className="text-white text-sm">FinTech</p>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-sm text-white/60 mb-1">Audience</p>
                          <p className="text-white text-sm">Investors</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Output Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 bg-gradient-to-br from-slate-900/80 to-blue-900/20 border-blue-400/30">
                  <CardHeader>
                    <CardTitle className="text-white text-lg mb-4">
                      <Zap className="w-5 h-5 mr-2 inline" />
                      AI generates your deck
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "Market Opportunity", desc: "AI-Driven Investment Matching", status: "completed" },
                        { title: "Problem Statement", desc: "$2.3T wealth management inefficiency", status: "completed" },
                        { title: "Solution Overview", desc: "Automated investor-advisor matching", status: "generating" },
                        { title: "Business Model", desc: "SaaS + transaction fees", status: "pending" },
                        { title: "Traction & Metrics", desc: "Early adoption insights", status: "pending" }
                      ].map((slide, index) => (
                        <motion.div
                          key={index}
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            slide.status === 'completed' 
                              ? 'bg-green-500/10 border-green-500/30' 
                              : slide.status === 'generating'
                              ? 'bg-blue-500/10 border-blue-500/30'
                              : 'bg-white/5 border-white/10'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          <div>
                            <p className="text-white text-sm font-medium">{slide.title}</p>
                            <p className="text-white/60 text-xs">{slide.desc}</p>
                          </div>
                          {slide.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {slide.status === 'generating' && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Live Demo CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <GradientButton 
                className="text-lg px-12 py-6 shadow-2xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.location.href = '/builder'}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Try This Live Demo
                <ArrowRight className="w-5 h-5 ml-3" />
              </GradientButton>
              <p className="text-white/60 mt-4">See your own startup&apos;s deck generated in minutes</p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>


      {/* Process Section */}
      <Section className="py-16 bg-gradient-to-b from-slate-900/50 to-slate-800/50">
        <Container>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-gold-400 via-yellow-400 to-gold-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                From idea to funded startup
              </span>
            </h2>
            <p className="text-2xl text-white/70 max-w-3xl mx-auto">
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
                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-lg text-white/70 leading-relaxed">
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

      {/* Final CTA Section with 21st Dev Animated Background */}
      <div className="relative">
        <BackgroundPaths 
          title="Start Building Now"
          subtitle="Join 1,200+ founders creating winning decks with AI"
          titleBackground={true}
          backgroundStyle="glow"
          showGradientOrb={true}
        />
        
        {/* Overlay CTA Button */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <GradientButton 
              className="text-xl px-12 py-6 shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = '/builder'}
            >
              <Rocket className="w-6 h-6 mr-3" />
              Start Building Now - It&apos;s Free
              <ArrowRight className="w-6 h-6 ml-3" />
            </GradientButton>
            <p className="text-sm text-white/60 mt-4">
              No credit card required • Export unlimited decks • AI-powered suggestions
            </p>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}

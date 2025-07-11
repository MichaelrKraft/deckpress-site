"use client"

import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface IndustryTemplate {
  industry: string
  icon: string
  examples: {
    title: string
    description: string
    stage: string
    keyMetrics: string[]
  }[]
}

interface IndustryTemplatesProps {
  onTemplateSelect: (template: IndustryTemplate['examples'][0] & { industry: string }) => void
}

const IndustryTemplates: React.FC<IndustryTemplatesProps> = ({ onTemplateSelect }) => {
  const industryTemplates: IndustryTemplate[] = [
    {
      industry: "FinTech",
      icon: "💳",
      examples: [
        {
          title: "SMB Lending Platform",
          description: "AI-powered lending platform that provides working capital to small businesses in 24 hours through automated underwriting of 500+ data points.",
          stage: "series-a",
          keyMetrics: ["$2M ARR", "45% MoM growth", "3% default rate", "500+ businesses funded"]
        },
        {
          title: "Investment Management API",
          description: "White-label investment infrastructure that enables banks and fintechs to launch investment products in weeks instead of years.",
          stage: "seed",
          keyMetrics: ["15 enterprise clients", "$500K ARR", "99.9% uptime", "50M+ API calls/month"]
        }
      ]
    },
    {
      industry: "SaaS",
      icon: "💻",
      examples: [
        {
          title: "Customer Success Automation",
          description: "AI-powered platform that reduces SaaS churn by 40% through predictive analytics and automated intervention workflows.",
          stage: "seed",
          keyMetrics: ["120+ SaaS clients", "$1.2M ARR", "40% churn reduction", "15 NPS improvement"]
        },
        {
          title: "Sales Intelligence Platform",
          description: "Real-time B2B contact enrichment and sales intelligence that increases sales team productivity by 3x.",
          stage: "series-a",
          keyMetrics: ["$5M ARR", "150% net revenue retention", "2000+ sales reps", "85% accuracy rate"]
        }
      ]
    },
    {
      industry: "HealthTech",
      icon: "🏥",
      examples: [
        {
          title: "Remote Patient Monitoring",
          description: "AI-powered RPM platform that reduces hospital readmissions by 60% through continuous health monitoring and early intervention.",
          stage: "series-a",
          keyMetrics: ["50+ health systems", "10K+ patients monitored", "60% readmission reduction", "$3M ARR"]
        },
        {
          title: "Medical Imaging AI",
          description: "Deep learning platform that helps radiologists detect abnormalities 40% faster with 95% accuracy in medical imaging.",
          stage: "series-b",
          keyMetrics: ["200+ hospitals", "1M+ scans analyzed", "95% accuracy", "$15M ARR"]
        }
      ]
    },
    {
      industry: "EdTech",
      icon: "🎓",
      examples: [
        {
          title: "Personalized Learning Platform",
          description: "AI-powered adaptive learning platform that improves student outcomes by 35% through personalized curriculum paths.",
          stage: "seed",
          keyMetrics: ["500+ schools", "50K+ students", "35% improvement", "$800K ARR"]
        },
        {
          title: "Corporate Training Platform",
          description: "VR-based training platform that reduces corporate training costs by 50% while improving retention rates by 80%.",
          stage: "series-a",
          keyMetrics: ["100+ enterprises", "80% retention improvement", "50% cost reduction", "$4M ARR"]
        }
      ]
    },
    {
      industry: "ClimaTech",
      icon: "🌱",
      examples: [
        {
          title: "Carbon Management Platform",
          description: "Enterprise platform that helps companies reduce carbon emissions by 30% through automated tracking and optimization.",
          stage: "series-a",
          keyMetrics: ["25+ Fortune 500 clients", "30% emission reduction", "$2.5M ARR", "1M+ tons CO2 saved"]
        },
        {
          title: "Smart Grid Technology",
          description: "IoT-powered energy optimization platform that reduces commercial building energy consumption by 25%.",
          stage: "seed",
          keyMetrics: ["1000+ buildings", "25% energy savings", "$1.5M ARR", "50MW managed"]
        }
      ]
    },
    {
      industry: "E-commerce",
      icon: "🛒",
      examples: [
        {
          title: "D2C Brand Platform",
          description: "All-in-one platform that helps D2C brands increase conversion rates by 45% through AI-powered personalization.",
          stage: "series-a",
          keyMetrics: ["200+ D2C brands", "45% conversion increase", "$3M ARR", "$50M GMV"]
        },
        {
          title: "Supply Chain Optimization",
          description: "AI-powered supply chain platform that reduces inventory costs by 30% while improving fulfillment speed by 50%.",
          stage: "series-b",
          keyMetrics: ["50+ retailers", "30% cost reduction", "$10M ARR", "99.5% accuracy"]
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Industry-Specific Templates</h3>
        <p className="text-gray-400">Get started quickly with proven examples from your industry</p>
      </div>

      <div className="grid gap-6">
        {industryTemplates.map((industry, idx) => (
          <Card key={idx} className="p-6 bg-slate-800/50 border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{industry.icon}</span>
              <h4 className="text-lg font-semibold text-white">{industry.industry}</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {industry.examples.map((example, exampleIdx) => (
                <Card key={exampleIdx} className="p-4 bg-slate-700/50 border border-gray-600 hover:border-purple-500/50 transition-all group">
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white group-hover:text-purple-200 transition-colors">
                        {example.title}
                      </h5>
                      <span className="text-xs bg-gray-600 px-2 py-1 rounded text-gray-300">
                        {example.stage}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed mb-3">
                      {example.description}
                    </p>
                    
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-medium text-gray-400">Key Metrics:</p>
                      <div className="flex flex-wrap gap-1">
                        {example.keyMetrics.map((metric, metricIdx) => (
                          <span key={metricIdx} className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => onTemplateSelect({
                      ...example,
                      industry: industry.industry
                    })}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-purple-600/30 hover:border-purple-500 hover:bg-purple-600/20 transition-all"
                  >
                    Use this template
                  </Button>
                </Card>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default IndustryTemplates
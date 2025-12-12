import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Rocket, Target, LineChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const benefits = [
  "Clear roadmap for sustainable business growth",
  "Financial modeling and scenario planning",
  "Scaling strategies tailored to your industry",
  "Investment readiness and funding preparation",
  "Team structure and hiring strategy",
  "Market expansion and diversification planning"
];

const features = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "We work with you to define clear goals, milestones, and the financial foundations needed to achieve them."
  },
  {
    icon: LineChart,
    title: "Financial Modeling",
    description: "Detailed projections and scenario planning so you can make decisions with confidence."
  },
  {
    icon: Rocket,
    title: "Scaling Support",
    description: "From operations to hiring to systems, we help you build the infrastructure for sustainable growth."
  },
  {
    icon: Users,
    title: "Team Development",
    description: "Attract, retain, and develop the talent you need to execute your growth strategy."
  }
];

export default function GrowthStrategy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Growth & Scale Strategy
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Take your business from surviving to thriving. We help you identify growth opportunities, structure scaling strategies, and plan financially for expansion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-emerald font-body font-semibold px-8 py-6 text-lg">
                Book a Consultation
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-body px-8 py-6 text-lg">
                Take Free Assessment
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Banner */}
      <section className="py-12 bg-primary">
        <div className="container">
          <blockquote className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-primary-foreground italic mb-4">
              "Patric helps organizations increase their social and environmental footprint."
            </p>
            <footer className="font-body text-primary-foreground/80">
              — Marcia Asare, Executive Director at The Walcot Foundation
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What You'll Gain
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Growth without a plan is chaos. We help you scale intentionally and sustainably.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3 p-6 bg-card rounded-lg border border-border"
              >
                <CheckCircle className="w-6 h-6 text-emerald flex-shrink-0 mt-0.5" />
                <span className="font-body text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Strategy that's grounded in financial reality and aligned with your mission.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Scale Your Impact?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's build a growth strategy that works for your business and your mission.
            </p>
            <Button className="bg-emerald hover:bg-emerald/90 text-emerald-foreground font-body font-semibold px-10 py-6 text-lg">
              Book Your Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

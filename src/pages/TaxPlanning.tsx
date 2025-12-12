import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, PiggyBank, TrendingUp, Shield, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const benefits = [
  "Reduce your tax liability legally and ethically",
  "Structure your business for maximum tax efficiency",
  "Reinvest savings back into your mission and growth",
  "Stay ahead of regulatory changes and new opportunities",
  "Optimize employee compensation and benefits packages",
  "Plan for long-term wealth preservation"
];

const features = [
  {
    icon: PiggyBank,
    title: "Strategic Tax Planning",
    description: "We analyze your entire financial picture to identify opportunities for tax savings that align with your business goals."
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused Optimization",
    description: "Structure your taxes to support reinvestment, expansion, and sustainable growth over time."
  },
  {
    icon: Shield,
    title: "Compliance Assurance",
    description: "All our strategies are fully compliant with current legislation. No grey areas, no risks."
  },
  {
    icon: Calculator,
    title: "Ongoing Review & Adjustment",
    description: "Tax law changes constantly. We keep your strategy current and optimized year after year."
  }
];

export default function TaxPlanning() {
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
              Tax Planning & Optimization
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Maximize what you reinvest in your mission. We structure your taxes strategically so you keep more, give more, and grow more.
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
              "We effectively tax planned to reinvest as much in our impact as possible."
            </p>
            <footer className="font-body text-primary-foreground/80">
              — Jacob Hill, Managing Director at Offploy Group
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
              Strategic tax planning isn't about cutting corners — it's about making smarter decisions that benefit your business and your mission.
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
              We combine deep expertise with a genuine understanding of your goals to create tax strategies that work for you.
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
              Ready to Optimize Your Tax Strategy?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Book a free consultation and discover how much you could be saving — and reinvesting in your mission.
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

import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, FileCheck, Clock, Eye, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const benefits = [
  "Stay fully compliant with all regulatory requirements",
  "Real-time visibility into your financial position",
  "Cloud-based systems accessible from anywhere",
  "Automated reporting that saves hours every month",
  "Peace of mind knowing everything is in order",
  "Expert guidance through audits and filings"
];

const features = [
  {
    icon: FileCheck,
    title: "Full Regulatory Compliance",
    description: "We handle all your statutory filings, tax returns, and regulatory submissions — on time, every time."
  },
  {
    icon: Cloud,
    title: "Cloud-Based Systems",
    description: "Access your financial data from anywhere with our modern, secure cloud accounting infrastructure."
  },
  {
    icon: Eye,
    title: "Real-Time Visibility",
    description: "Dashboards and reports that give you instant insight into cash flow, profit, and financial health."
  },
  {
    icon: Clock,
    title: "Time-Saving Automation",
    description: "We automate repetitive tasks so you spend less time on admin and more on growing your business."
  }
];

export default function FinancialCompliance() {
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
              Financial Compliance & Reporting
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Navigate regulatory requirements with confidence. Our cloud-based systems keep you compliant while giving you real-time visibility into your finances.
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
              "Removes worry, saves time, ensures accuracy."
            </p>
            <footer className="font-body text-primary-foreground/80">
              — A Pow Consulting Client
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
              Compliance shouldn't be a headache. We make it seamless so you can focus on what matters most.
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
              Modern, efficient, and stress-free compliance management.
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
              Ready for Stress-Free Compliance?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let us handle the complexity while you focus on growing your business.
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

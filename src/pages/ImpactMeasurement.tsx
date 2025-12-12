import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Heart, BarChart3, Users, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const benefits = [
  "Quantify your social and environmental impact",
  "Create compelling impact reports for stakeholders",
  "Attract mission-aligned investors and funders",
  "Motivate your team with visible impact metrics",
  "Guide strategy with data-driven insights",
  "Meet ESG and sustainability reporting requirements"
];

const features = [
  {
    icon: BarChart3,
    title: "Impact Metrics Design",
    description: "We help you identify and track the metrics that truly reflect your organization's impact."
  },
  {
    icon: Users,
    title: "Stakeholder Reporting",
    description: "Beautiful, compelling reports that communicate your impact to funders, boards, and the public."
  },
  {
    icon: Heart,
    title: "Social Impact Assessment",
    description: "Measure the human outcomes of your work — from beneficiaries served to lives transformed."
  },
  {
    icon: Leaf,
    title: "Environmental Footprint",
    description: "Track and report on your environmental impact, from carbon reduction to sustainability initiatives."
  }
];

export default function ImpactMeasurement() {
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
              Impact Measurement & Reporting
            </h1>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Prove your worth. We help you quantify and communicate your social and environmental impact to stakeholders, funders, and your team.
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
              "Attracts investors, motivates staff, guides strategy."
            </p>
            <footer className="font-body text-primary-foreground/80">
              — The Power of Impact Measurement
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
              Impact measurement isn't just about numbers — it's about telling your story with evidence.
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
              We make impact tangible, measurable, and communicable.
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
              Ready to Measure Your Impact?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's build a measurement framework that tells your story and guides your growth.
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

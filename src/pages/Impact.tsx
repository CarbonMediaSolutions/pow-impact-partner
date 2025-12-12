import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Users, Leaf, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { caseStudies } from '@/data/caseStudies';

const impactStats = [
  { value: '80+', label: 'Businesses Helped', icon: Users },
  { value: '£5M+', label: 'Tax Savings Achieved', icon: TrendingUp },
  { value: '200+', label: 'Impact Initiatives Supported', icon: Leaf },
];

export default function Impact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Impact in Action
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              Real results from mission-driven businesses we've helped transform. Every number represents a step toward a better future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-10 h-10 text-primary-foreground/80 mx-auto mb-4" />
                <p className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="font-body text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
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
              Client Success Stories
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how we've helped organizations like yours achieve remarkable results.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <Link to={`/case-studies/${study.id}`} className="block h-full">
                  <div className="h-full bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={study.image}
                        alt={study.company}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge className="absolute bottom-4 left-4 bg-background/90 text-foreground font-body">
                        {study.type}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {study.company}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mb-4">
                        {study.challenge}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {study.metrics.slice(0, 2).map((metric, i) => (
                          <div
                            key={i}
                            className={`p-3 rounded-lg text-center ${
                              study.color === 'primary'
                                ? 'bg-primary/10'
                                : study.color === 'emerald'
                                ? 'bg-emerald/10'
                                : 'bg-secondary/20'
                            }`}
                          >
                            <p
                              className={`font-serif text-xl font-bold ${
                                study.color === 'primary'
                                  ? 'text-primary'
                                  : study.color === 'emerald'
                                  ? 'text-emerald'
                                  : 'text-secondary'
                              }`}
                            >
                              {metric.value}
                            </p>
                            <p className="font-body text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Quote Preview */}
                      <div className="relative mb-4">
                        <Quote className="absolute -top-1 -left-1 w-4 h-4 text-secondary/40" />
                        <p className="pl-4 font-body text-sm italic text-foreground/80 line-clamp-2">
                          "{study.quote}"
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 font-body font-semibold text-primary group-hover:gap-3 transition-all">
                        Read Full Story
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3Ps Philosophy */}
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
              The 3Ps That Drive Our Impact
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Every engagement is guided by our commitment to People, Planet, and Profit working in harmony.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card p-8 rounded-2xl border border-border text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">People</h3>
              <p className="font-body text-muted-foreground">
                We believe the best companies invest in their teams. Our strategies help you attract, retain, and reward talent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Planet</h3>
              <p className="font-body text-muted-foreground">
                Environmental responsibility isn't a nice-to-have. We help you measure and amplify your positive impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-8 rounded-2xl border border-border text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">Profit</h3>
              <p className="font-body text-muted-foreground">
                Sustainable profit funds everything else. Our financial strategies ensure your business thrives long-term.
              </p>
            </motion.div>
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
              Ready to Create Your Impact Story?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join the growing community of mission-driven businesses achieving remarkable results.
            </p>
            <Link to="/contact">
              <Button className="bg-emerald hover:bg-emerald/90 text-emerald-foreground font-body font-semibold px-10 py-6 text-lg">
                Book Your Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

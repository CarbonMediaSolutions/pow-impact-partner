import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { solutions } from '@/data/solutions';

export default function Solutions() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8">
              Perspective Solutions
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Each engagement begins with a perspective—a way of seeing your challenge that reveals new paths forward. Our solutions are designed to meet organisations at every stage of their journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-8 flex flex-col"
              >
                <div className="mb-6">
                  <h2 className="font-serif text-xl font-medium text-foreground mb-2">
                    {solution.title}
                  </h2>
                  <p className="font-body text-sm text-teal italic">
                    "{solution.perspective}"
                  </p>
                </div>
                
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  {solution.description}
                </p>

                <div className="space-y-2 mb-6 flex-grow">
                  {solution.services.slice(0, 4).map((service, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{service}</span>
                    </div>
                  ))}
                  {solution.services.length > 4 && (
                    <p className="font-body text-xs text-muted-foreground/70 pl-6">
                      + {solution.services.length - 4} more services
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-6 mt-auto">
                  <p className="font-serif text-lg font-medium text-foreground mb-1">
                    {solution.price}
                  </p>
                  {solution.priceNote && (
                    <p className="font-body text-xs text-muted-foreground mb-4">
                      {solution.priceNote}
                    </p>
                  )}
                  <Button asChild variant="outline" className="w-full font-body">
                    <Link to={`/book?solution=${solution.id}`}>
                      Enquire
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Partner Support */}
      <section className="pb-24">
        <div className="container max-w-3xl">
          <div className="section-divider" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-medium text-foreground mb-6">
              Dedicated Partner Support
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              We are committed to providing exceptional service to our clients. Each engagement includes a dedicated Partner Success Manager who will keep you fully informed and answer any questions you may have.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Our team of professionals—including bookkeeping, payroll, taxation, and compliance specialists led by a qualified chartered accountant—ensures that all of your regulatory compliance needs are met with the highest level of care and attention.
            </p>
            <Button asChild className="btn-emerald font-body">
              <Link to="/book">
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

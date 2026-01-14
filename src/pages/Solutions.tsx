import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { solutions } from '@/data/solutions';

const supportFeatures = [
  {
    icon: MessageSquare,
    title: 'Direct Partner Access',
    description: 'Work directly with senior advisors throughout your engagement.',
  },
  {
    icon: Clock,
    title: 'Response Expectations',
    description: 'Clear communication timelines and regular progress updates.',
  },
  {
    icon: Users,
    title: 'Specialists as Needed',
    description: 'Access to domain specialists engaged for specific requirements.',
  },
];

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
              Engagement Models
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
                  <p className="font-body text-sm text-primary italic">
                    "{solution.perspective}"
                  </p>
                </div>
                
                <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                  {solution.description}
                </p>

                <div className="space-y-2 mb-6 flex-grow">
                  {solution.services.slice(0, 4).map((service, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
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
                  <p className="font-serif text-base font-medium text-foreground mb-1">
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

      {/* Partner Support */}
      <section className="pb-24">
        <div className="container max-w-4xl">
          <div className="section-divider" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-2xl font-medium text-foreground mb-8">
              How We Work With You
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {supportFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-body text-sm font-medium text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
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

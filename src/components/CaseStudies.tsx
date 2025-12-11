import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';

const caseStudies = [
  {
    company: 'Offploy Group',
    type: 'Social Enterprise',
    challenge: 'Navigate cost-of-living crisis while maintaining mission',
    metric: '£500k+',
    metricLabel: 'Reinvested in impact',
    quote: 'Patric has transformed the way we scale our impact. His strategic approach to tax planning means we can reinvest more into what matters.',
    author: 'Jacob Hill',
    role: 'Managing Director',
    color: 'primary',
  },
  {
    company: 'City & Guilds Group',
    type: 'Education Organisation',
    challenge: 'Scaling from startup to established organization',
    metric: '10x',
    metricLabel: 'Growth achieved',
    quote: 'He is a very passionate and driven individual who genuinely cares about helping businesses succeed.',
    author: 'Kirstie Donnelly',
    role: 'CEO',
    color: 'secondary',
  },
  {
    company: 'The Walcot Foundation',
    type: 'Not-for-Profit',
    challenge: 'Measuring and amplifying social impact',
    metric: '200%',
    metricLabel: 'Increase in footprint',
    quote: 'Focused on making a positive difference in the world. Patric helps organizations increase their social and environmental footprint.',
    author: 'Marcia Asare',
    role: 'Executive Director',
    color: 'emerald',
  },
];

export const CaseStudies = () => {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Impact in Action</h2>
          <p className="section-subtitle mx-auto">
            See how we've helped mission-driven businesses transform their financial health and amplify their impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full bg-background border border-border rounded-2xl overflow-hidden card-hover">
                {/* Header */}
                <div
                  className={`p-6 ${
                    study.color === 'primary'
                      ? 'bg-primary/10'
                      : study.color === 'emerald'
                      ? 'bg-emerald/10'
                      : 'bg-secondary/20'
                  }`}
                >
                  <span className="inline-block px-3 py-1 bg-background/80 rounded-full font-body text-xs font-medium text-muted-foreground mb-3">
                    {study.type}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-primary">
                    {study.company}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">The challenge:</span>{' '}
                    {study.challenge}
                  </p>

                  {/* Metric */}
                  <div className="mb-6 p-4 bg-muted/50 rounded-xl">
                    <p
                      className={`font-serif text-3xl font-bold ${
                        study.color === 'primary'
                          ? 'text-primary'
                          : study.color === 'emerald'
                          ? 'text-emerald'
                          : 'text-secondary'
                      }`}
                    >
                      {study.metric}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">{study.metricLabel}</p>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-1 w-6 h-6 text-secondary/30" />
                    <blockquote className="pl-6">
                      <p className="font-body text-sm italic text-foreground/80 mb-3">
                        "{study.quote}"
                      </p>
                      <footer className="font-body text-xs">
                        <strong className="text-foreground">{study.author}</strong>
                        <span className="text-muted-foreground">, {study.role}</span>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6">
                  <button className="inline-flex items-center font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link">
                    View full story
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';

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
            Real results from mission-driven businesses we've helped transform.
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
              <Link to={`/case-studies/${study.id}`} className="block h-full">
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
                    <span className="inline-block px-3 py-1 bg-background/80 rounded-full font-body text-xs font-semibold text-muted-foreground mb-3">
                      {study.type}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {study.company}
                    </h3>
                  </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-body text-sm text-muted-foreground mb-5">
                    <span className="font-semibold text-foreground">The challenge:</span>{' '}
                    {study.challenge}
                  </p>

                  {/* Metrics - Made Bold and Prominent */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {study.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl text-center ${
                          study.color === 'primary'
                            ? 'bg-primary/5'
                            : study.color === 'emerald'
                            ? 'bg-emerald/5'
                            : 'bg-secondary/10'
                        }`}
                      >
                        <p
                          className={`font-serif text-2xl font-bold ${
                            study.color === 'primary'
                              ? 'text-primary'
                              : study.color === 'emerald'
                              ? 'text-emerald'
                              : 'text-secondary'
                          }`}
                        >
                          {metric.value}
                        </p>
                        <p className="font-body text-xs text-muted-foreground mt-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-1 -left-1 w-5 h-5 text-secondary/40" />
                    <blockquote className="pl-5">
                      <p className="font-body text-sm italic text-foreground/80 mb-3 leading-relaxed">
                        "{study.quote}"
                      </p>
                      <footer className="font-body text-xs">
                        <strong className="text-foreground">{study.author}</strong>
                        <span className="text-muted-foreground">, {study.role}</span>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="px-6 pb-6">
                  <span className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-muted/50 font-body text-sm font-semibold text-primary group-hover:bg-primary/10 transition-colors">
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

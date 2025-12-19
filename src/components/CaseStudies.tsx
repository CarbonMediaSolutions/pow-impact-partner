import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies } from '@/data/caseStudies';

export const CaseStudies = () => {
  return (
    <section id="impact" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Client Work
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            Impact in Practice
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-px bg-border/50">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/case-studies/${study.id}`} 
                className="group block h-full p-8 lg:p-10 bg-background hover:bg-muted/30 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {study.type}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="font-serif text-lg font-medium text-foreground mb-4">
                  {study.company}
                </h3>
                
                <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">
                  {study.challenge}
                </p>

                <div className="space-y-2">
                  {study.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex items-baseline gap-3">
                      <span className="font-serif text-xl font-medium text-primary">
                        {metric.value}
                      </span>
                      <span className="font-body text-xs text-muted-foreground">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

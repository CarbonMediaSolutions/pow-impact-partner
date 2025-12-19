import { motion } from 'framer-motion';
import capabilityStrategy from '@/assets/capability-strategy.jpg';
import capabilityOrganisation from '@/assets/capability-organisation.jpg';
import capabilityFinancial from '@/assets/capability-financial.jpg';

const domains = [
  {
    title: 'Growth & Transformation',
    description: 'Enterprise growth strategy and transformation mandates.',
    image: capabilityStrategy,
  },
  {
    title: 'Governance & Operations',
    description: 'Governance frameworks, operational architecture, and decision systems.',
    image: capabilityOrganisation,
  },
  {
    title: 'Capital & Performance',
    description: 'Financial strategy, performance management, and capital structuring.',
    image: capabilityFinancial,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-32 lg:py-40 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Where We Advise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted mb-6">
                <img
                  src={domain.image}
                  alt=""
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                {domain.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {domain.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

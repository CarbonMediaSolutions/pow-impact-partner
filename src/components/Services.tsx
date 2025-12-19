import { motion } from 'framer-motion';
import capabilityStrategy from '@/assets/capability-strategy.jpg';
import capabilityOrganisation from '@/assets/capability-organisation.jpg';
import capabilityFinancial from '@/assets/capability-financial.jpg';

const domains = [
  {
    title: 'Growth & Transformation',
    description: 'Strategic expansion, institutional transition, and organisational change in complex operating environments.',
    image: capabilityStrategy,
  },
  {
    title: 'Governance & Operations',
    description: 'Board effectiveness, executive decision systems, and operational architecture across regulatory contexts.',
    image: capabilityOrganisation,
  },
  {
    title: 'Capital & Performance',
    description: 'Capital allocation, financial discipline, and performance frameworks aligned with long-term institutional objectives.',
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
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            We advise organisations operating in complex environments where strategic decisions carry financial, regulatory, and societal implications.
          </p>
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

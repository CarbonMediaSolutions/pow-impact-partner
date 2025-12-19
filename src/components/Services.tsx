import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    title: 'Strategy & Growth Advisory',
    description: 'We work with leadership teams to define strategic direction, identify growth opportunities, and build the capabilities required to execute. Our approach combines rigorous analysis with practical implementation.',
    href: '/services/growth-strategy',
  },
  {
    title: 'Organisational & Operational Enablement',
    description: "From governance structures to operational processes, we help organisations build the systems and capabilities that enable sustainable scale. We focus on what works, not what's fashionable.",
    href: '/services/impact-measurement',
  },
  {
    title: 'Financial Intelligence & Performance',
    description: 'Strategic finance goes beyond compliance. We transform financial data into decision-ready intelligence, enabling leaders to allocate resources, measure progress, and optimise for long-term value.',
    href: '/services/tax-planning',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            How We Partner With Clients
          </h2>
        </motion.div>

        <div className="space-y-0 divide-y divide-border/50">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={capability.href}
                className="group block py-10 lg:py-12"
              >
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-4">
                    <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
                      {capability.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                  <div className="lg:col-span-1 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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

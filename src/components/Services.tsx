import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import capabilityStrategy from '@/assets/capability-strategy.jpg';
import capabilityOrganisation from '@/assets/capability-organisation.jpg';
import capabilityFinancial from '@/assets/capability-financial.jpg';

const capabilities = [
  {
    title: 'Strategy & Growth Advisory',
    description: 'We work with leadership teams to define strategic direction, identify growth opportunities, and build the capabilities required to execute.',
    href: '/services/growth-strategy',
    image: capabilityStrategy,
  },
  {
    title: 'Organisational & Operational Enablement',
    description: "From governance structures to operational processes, we help organisations build systems and capabilities that enable sustainable scale.",
    href: '/services/impact-measurement',
    image: capabilityOrganisation,
  },
  {
    title: 'Financial Intelligence & Performance',
    description: 'Strategic finance goes beyond compliance. We transform financial data into decision-ready intelligence for long-term value.',
    href: '/services/tax-planning',
    image: capabilityFinancial,
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            How We Partner With Clients
          </h2>
        </motion.div>

        {/* Visual Tile Grid - McKinsey Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="group block h-full"
              >
                <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                  {/* Background Image */}
                  <img 
                    src={capability.image} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                  
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors mb-4">
                      {capability.title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                      {capability.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Explore this capability</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
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

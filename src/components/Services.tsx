import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const capabilities = [
  {
    title: 'Strategy & Growth Advisory',
    description: 'We work with leadership teams to define strategic direction, identify growth opportunities, and build the capabilities required to execute.',
    href: '/services/growth-strategy',
    icon: TrendingUp,
    gradient: 'from-primary/10 via-primary/5 to-transparent',
    pattern: 'radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
  },
  {
    title: 'Organisational & Operational Enablement',
    description: "From governance structures to operational processes, we help organisations build systems and capabilities that enable sustainable scale.",
    href: '/services/impact-measurement',
    icon: Users,
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    pattern: 'radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.12) 0%, transparent 50%)',
  },
  {
    title: 'Financial Intelligence & Performance',
    description: 'Strategic finance goes beyond compliance. We transform financial data into decision-ready intelligence for long-term value.',
    href: '/services/tax-planning',
    icon: BarChart3,
    gradient: 'from-teal-500/10 via-teal-500/5 to-transparent',
    pattern: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.1) 0%, transparent 60%)',
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
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
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
                  <div className={`relative h-full min-h-[320px] rounded-lg overflow-hidden bg-gradient-to-br ${capability.gradient} border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg`}>
                    {/* Abstract Background */}
                    <div 
                      className="absolute inset-0 opacity-60"
                      style={{ background: capability.pattern }}
                    />
                    
                    {/* Decorative Lines */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                        <line x1="20" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                        <line x1="40" y1="100" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                      </svg>
                    </div>
                    
                    <div className="relative h-full p-8 flex flex-col">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-primary transition-colors mb-4">
                          {capability.title}
                        </h3>
                        <p className="font-body text-muted-foreground text-sm leading-relaxed">
                          {capability.description}
                        </p>
                      </div>
                      
                      {/* CTA */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                        <span>Explore this capability</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

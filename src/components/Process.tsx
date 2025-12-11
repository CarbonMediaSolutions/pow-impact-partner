import { motion } from 'framer-motion';
import { Headphones, Search, Map, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: Headphones,
    title: 'Listen',
    description: 'We understand your business, challenges, and vision.',
    color: 'primary',
  },
  {
    icon: Search,
    title: 'Assess',
    description: 'We analyze your current financial position and opportunities.',
    color: 'secondary',
  },
  {
    icon: Map,
    title: 'Plan',
    description: 'We create a tailored strategy aligned with your mission and goals.',
    color: 'primary',
  },
  {
    icon: Rocket,
    title: 'Execute',
    description: 'We implement changes and keep you informed every step.',
    color: 'secondary',
  },
  {
    icon: BarChart3,
    title: 'Measure',
    description: 'We track impact and continuously optimize.',
    color: 'emerald',
  },
];

export const Process = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Our Approach</h2>
          <p className="section-subtitle mx-auto">
            A clear, collaborative process that puts your success at the center.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Icon Circle */}
                  <div
                    className={`relative z-10 w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      step.color === 'primary'
                        ? 'bg-primary/10 border-2 border-primary/30'
                        : step.color === 'emerald'
                        ? 'bg-emerald/10 border-2 border-emerald/30'
                        : 'bg-secondary/20 border-2 border-secondary/40'
                    }`}
                  >
                    <Icon
                      className={`w-12 h-12 ${
                        step.color === 'primary'
                          ? 'text-primary'
                          : step.color === 'emerald'
                          ? 'text-emerald'
                          : 'text-secondary-foreground'
                      }`}
                    />
                  </div>

                  {/* Step Number */}
                  <div
                    className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-body text-sm font-bold z-20 ${
                      step.color === 'primary'
                        ? 'bg-primary text-primary-foreground'
                        : step.color === 'emerald'
                        ? 'bg-emerald text-emerald-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6"
              >
                {/* Left - Icon */}
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      step.color === 'primary'
                        ? 'bg-primary/10 border-2 border-primary/30'
                        : step.color === 'emerald'
                        ? 'bg-emerald/10 border-2 border-emerald/30'
                        : 'bg-secondary/20 border-2 border-secondary/40'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        step.color === 'primary'
                          ? 'text-primary'
                          : step.color === 'emerald'
                          ? 'text-emerald'
                          : 'text-secondary-foreground'
                      }`}
                    />
                  </div>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-0.5 h-8 bg-border -translate-x-1/2" />
                  )}
                </div>

                {/* Right - Content */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-body text-xs font-bold ${
                        step.color === 'primary'
                          ? 'bg-primary text-primary-foreground'
                          : step.color === 'emerald'
                          ? 'bg-emerald text-emerald-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

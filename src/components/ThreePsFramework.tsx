import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Leaf, TrendingUp } from 'lucide-react';

const pillars = [
  {
    id: 'people',
    icon: Users,
    title: 'People',
    description: 'We believe the best companies invest in their teams.',
    detail: 'From salary planning to compliance, we help you attract and retain talent.',
    quote: 'Patric helped us give all colleagues a salary increase to cope with the cost of living crisis.',
    author: 'Jacob Hill',
    role: 'Managing Director at Offploy Group',
    color: 'primary',
  },
  {
    id: 'planet',
    icon: Leaf,
    title: 'Planet',
    description: "Environmental responsibility isn't a nice-to-have—it's part of building lasting value.",
    detail: 'We help not-for-profits and social enterprises measure and amplify their impact.',
    quote: 'Focused on making a positive difference in the world.',
    author: 'Marcia Asare',
    role: 'Executive Director at The Walcot Foundation',
    color: 'emerald',
  },
  {
    id: 'profit',
    icon: TrendingUp,
    title: 'Profit',
    description: 'Sustainable profit funds everything else: growth, reinvestment, and purpose.',
    detail: 'Our tax and financial strategy ensures your business thrives long-term.',
    quote: "We've tax planned to reinvest as much in our impact as possible.",
    author: 'Jacob Hill',
    role: 'Offploy Group',
    color: 'secondary',
  },
];

export const ThreePsFramework = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  return (
    <section id="framework" className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">How We Work: The 3Ps Framework</h2>
          <p className="section-subtitle mx-auto">
            Our unique approach balances what matters most—creating value for people, planet, and profit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const isActive = activePillar === pillar.id;
            
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div
                  className={`group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? pillar.color === 'primary'
                        ? 'border-primary bg-primary/5'
                        : pillar.color === 'emerald'
                        ? 'border-emerald bg-emerald/5'
                        : 'border-secondary bg-secondary/10'
                      : 'border-border bg-background hover:border-primary/50 hover:shadow-card'
                  }`}
                  onClick={() => setActivePillar(isActive ? null : pillar.id)}
                >
                  {/* Icon Circle */}
                  <div
                    className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      pillar.color === 'primary'
                        ? 'bg-primary/10 border-2 border-primary/30 group-hover:scale-105'
                        : pillar.color === 'emerald'
                        ? 'bg-emerald/10 border-2 border-emerald/30 group-hover:scale-105'
                        : 'bg-secondary/20 border-2 border-secondary/40 group-hover:scale-105'
                    }`}
                  >
                    <Icon
                      className={`w-10 h-10 ${
                        pillar.color === 'primary'
                          ? 'text-primary'
                          : pillar.color === 'emerald'
                          ? 'text-emerald'
                          : 'text-secondary-foreground'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-semibold text-primary text-center mb-4">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-muted-foreground text-center mb-4">
                    {pillar.description}
                  </p>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-body text-sm text-foreground mb-4">
                            {pillar.detail}
                          </p>
                          <blockquote className="relative pl-4 border-l-2 border-secondary">
                            <p className="font-body text-sm italic text-muted-foreground mb-2">
                              "{pillar.quote}"
                            </p>
                            <footer className="font-body text-xs">
                              <strong className="text-foreground">{pillar.author}</strong>
                              <span className="text-muted-foreground">, {pillar.role}</span>
                            </footer>
                          </blockquote>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Click indicator */}
                  <p className="font-body text-xs text-muted-foreground text-center mt-4">
                    {isActive ? 'Click to collapse' : 'Click to learn more'}
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

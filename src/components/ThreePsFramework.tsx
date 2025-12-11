import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Leaf, TrendingUp, Lightbulb } from 'lucide-react';

const pillars = [
  {
    id: 'people',
    icon: Users,
    title: 'People',
    tagline: 'Why it matters',
    description: 'The best companies invest in their teams.',
    detail: 'We help you attract and retain talent through smart salary planning and compliance.',
    quote: 'Patric helped us give all colleagues a salary increase to cope with the cost of living crisis.',
    author: 'Jacob Hill',
    role: 'MD, Offploy Group',
    color: 'primary',
  },
  {
    id: 'planet',
    icon: Leaf,
    title: 'Planet',
    tagline: 'Why it matters',
    description: 'Environmental responsibility builds lasting value.',
    detail: 'We help not-for-profits and social enterprises measure and amplify their impact.',
    quote: 'Focused on making a positive difference in the world.',
    author: 'Marcia Asare',
    role: 'ED, The Walcot Foundation',
    color: 'emerald',
  },
  {
    id: 'profit',
    icon: TrendingUp,
    title: 'Profit',
    tagline: 'Why it matters',
    description: 'Sustainable profit fuels growth and purpose.',
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
          <h2 className="section-title mb-4">The 3Ps Framework</h2>
          <p className="section-subtitle mx-auto">
            Creating value for people, planet, and profit.
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
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : pillar.color === 'emerald'
                        ? 'border-emerald bg-emerald/5 shadow-lg'
                        : 'border-secondary bg-secondary/10 shadow-lg'
                      : 'border-border bg-background hover:border-primary/50 hover:shadow-card'
                  }`}
                  onClick={() => setActivePillar(isActive ? null : pillar.id)}
                >
                  {/* Icon Circle - Made Larger */}
                  <div
                    className={`w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      pillar.color === 'primary'
                        ? 'bg-primary/10 border-2 border-primary/30 group-hover:scale-110'
                        : pillar.color === 'emerald'
                        ? 'bg-emerald/10 border-2 border-emerald/30 group-hover:scale-110'
                        : 'bg-secondary/20 border-2 border-secondary/40 group-hover:scale-110'
                    }`}
                  >
                    <Icon
                      className={`w-14 h-14 ${
                        pillar.color === 'primary'
                          ? 'text-primary'
                          : pillar.color === 'emerald'
                          ? 'text-emerald'
                          : 'text-secondary-foreground'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-primary text-center mb-2">
                    {pillar.title}
                  </h3>

                  {/* Tagline */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Lightbulb className="w-4 h-4 text-secondary" />
                    <span className="font-body text-xs font-semibold text-secondary uppercase tracking-wide">
                      {pillar.tagline}
                    </span>
                  </div>

                  {/* Description - Shortened */}
                  <p className="font-body text-muted-foreground text-center">
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
                        <div className="pt-4 mt-4 border-t border-border/50">
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

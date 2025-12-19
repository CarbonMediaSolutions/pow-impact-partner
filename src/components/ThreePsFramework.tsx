import { motion } from 'framer-motion';

const pillars = [
  {
    title: 'People',
    description: 'Align leadership, teams, and incentives for collective performance.',
  },
  {
    title: 'Process',
    description: 'Build scalable, decision-ready systems that enable growth.',
  },
  {
    title: 'Performance',
    description: 'Measure what truly drives impact and long-term value creation.',
  },
];

export const ThreePsFramework = () => {
  return (
    <section id="framework" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Our Framework
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            The Three Pillars of Sustainable Growth
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-body text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-2xl font-medium text-foreground">
                  {pillar.title}
                </h3>
              </div>
              <p className="font-body text-muted-foreground leading-relaxed pl-8">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

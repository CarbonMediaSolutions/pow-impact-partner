import { motion } from 'framer-motion';

const themes = [
  {
    title: 'Growth & Transformation',
    description: 'Strategic direction and organisational change at scale.',
  },
  {
    title: 'Organisational Architecture',
    description: 'Structure, governance, and systems that enable performance.',
  },
  {
    title: 'Capital & Performance',
    description: 'Financial strategy and value creation over time.',
  },
];

export const InsightLed = () => {
  return (
    <section className="py-32 lg:py-40 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Strategic Themes
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border/30">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 lg:p-12 bg-background"
            >
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-4">
                {theme.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {theme.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

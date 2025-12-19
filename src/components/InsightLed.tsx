import { motion } from 'framer-motion';

const themes = [
  {
    title: 'Growth & Transformation',
    description: 'Scaling organisations while preserving strategic coherence, operational discipline, and institutional trust.',
  },
  {
    title: 'Organisational Architecture',
    description: 'Designing governance, incentives, and decision systems that reinforce long-term performance.',
  },
  {
    title: 'Capital & Performance',
    description: 'Aligning financial strategy, capital allocation, and impact measurement with institutional objectives.',
  },
];

export const InsightLed = () => {
  return (
    <section className="py-32 lg:py-40">
      <div className="container">
        <div className="section-divider" />
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

        <div className="grid md:grid-cols-3 gap-6">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 lg:p-12 bg-tile rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-border/20 transition-colors duration-300"
            >
              <h3 className="font-serif text-xl lg:text-2xl font-medium text-foreground mb-4 group-hover:text-teal transition-colors">
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

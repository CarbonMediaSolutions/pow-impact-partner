import { motion } from 'framer-motion';

const engagements = [
  {
    sector: 'Technology Organisation',
    situation: 'Strategic repositioning during transition from growth-stage to institutional scale.',
    outcome: 'Revenue trajectory realigned. Operating model restructured.',
  },
  {
    sector: 'Professional Services Firm',
    situation: 'Financial architecture and reporting capability during rapid expansion.',
    outcome: 'Governance systems redesigned. Growth capital secured.',
  },
  {
    sector: 'National Social Enterprise',
    situation: 'Impact measurement frameworks and stakeholder alignment in regulated funding.',
    outcome: 'Institutional credibility strengthened. New funding realised.',
  },
];

export const CaseStudies = () => {
  return (
    <section id="impact" className="py-20 lg:py-24">
      <div className="container">
        <div className="section-divider" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Selected Engagements
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            Advisory engagements illustrating the scope and complexity of our work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.sector}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 lg:p-8 bg-tile rounded-lg border border-border/20"
            >
              {/* Sector label */}
              <span className="inline-block font-body text-xs font-medium text-primary uppercase tracking-wider mb-4">
                {engagement.sector}
              </span>
              
              {/* Situation */}
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                {engagement.situation}
              </p>

              {/* Outcome - punchy and bold */}
              <div className="pt-4 border-t border-border/30">
                <p className="font-serif text-foreground font-medium leading-relaxed">
                  {engagement.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

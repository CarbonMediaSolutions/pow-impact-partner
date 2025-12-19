import { motion } from 'framer-motion';

const engagements = [
  {
    type: 'Technology Organisation',
    challenge: 'Advising executive leadership on strategic repositioning during transition from growth-stage to institutional scale.',
    outcome: 'Revenue trajectory realigned. Operational foundations restructured.',
  },
  {
    type: 'Professional Services Firm',
    challenge: 'Guiding financial architecture and reporting capability during a period of rapid expansion and capital formation.',
    outcome: 'Governance systems redesigned. Growth capital secured.',
  },
  {
    type: 'National Social Enterprise',
    challenge: 'Advising leadership on impact measurement frameworks and stakeholder alignment in a regulated funding environment.',
    outcome: 'Institutional credibility strengthened. New funding realised.',
  },
];

export const CaseStudies = () => {
  return (
    <section id="impact" className="py-32 lg:py-40 border-t border-border/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Selected Engagements
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-2xl">
            A selection of advisory engagements illustrating the scope and complexity of our work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-px bg-border/30">
          {engagements.map((engagement, index) => (
            <motion.div
              key={engagement.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 lg:p-10 bg-background"
            >
              <span className="font-body text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {engagement.type}
              </span>
              
              <p className="font-body text-muted-foreground mt-6 mb-8 leading-relaxed">
                {engagement.challenge}
              </p>

              <p className="font-serif text-foreground leading-relaxed">
                {engagement.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

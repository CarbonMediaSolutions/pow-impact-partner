import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Diagnose',
    description: 'Understand the context, challenges, and opportunities.',
  },
  {
    title: 'Design',
    description: 'Develop strategy and solutions tailored to your situation.',
  },
  {
    title: 'Enable',
    description: 'Build capabilities and implement with your team.',
  },
  {
    title: 'Measure',
    description: 'Track progress against meaningful outcomes.',
  },
  {
    title: 'Refine',
    description: 'Iterate based on what we learn together.',
  },
];

export const Process = () => {
  return (
    <section id="approach" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Approach
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight mt-3">
            Our Way of Working
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="space-y-3">
                <span className="font-body text-sm text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

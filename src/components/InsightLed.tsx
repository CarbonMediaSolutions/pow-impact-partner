import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const insights = [
  {
    title: 'Strategy & Growth',
    insight: 'Clarity precedes growth. We help leaders define direction before accelerating pace.',
    href: '#services',
  },
  {
    title: 'Organisational Design',
    insight: 'Structure shapes outcomes. Align teams, incentives, and governance for scale.',
    href: '#services',
  },
  {
    title: 'Financial Intelligence',
    insight: 'Numbers inform decisions. Transform data into strategic advantage.',
    href: '#services',
  },
];

export const InsightLed = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="insights" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            How Leaders Create Impact
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-border/50">
          {insights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => scrollToSection(item.href)}
                className="group block w-full h-full p-8 lg:p-10 bg-background text-left hover:bg-muted/30 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {item.insight}
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

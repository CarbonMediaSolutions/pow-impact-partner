import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who do you typically work with?',
    answer: 'We work with founders, leadership teams, and boards of mission-driven organisations. Our clients range from growth-stage startups to established SMEs and social enterprises seeking strategic clarity and operational excellence.',
  },
  {
    question: 'How do engagements typically work?',
    answer: "Most engagements begin with a diagnostic phase to understand your context and priorities. From there, we design a tailored approach—whether that's a focused project or an ongoing advisory relationship. We work collaboratively with your team, not in isolation.",
  },
  {
    question: 'What makes Plexa Partners different?',
    answer: 'We combine strategic rigour with practical implementation. Many advisory firms deliver recommendations; we stay to help you execute. Our background spans finance, strategy, and operations—giving us a holistic view that pure strategists or accountants often lack.',
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 border-t border-border/50">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-foreground tracking-tight">
            Common Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-0 divide-y divide-border/50">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 py-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline text-left">
                  <span className="font-serif text-lg font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

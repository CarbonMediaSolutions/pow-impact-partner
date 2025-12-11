import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How quickly can we start working together?',
    answer: 'We typically begin with a discovery call within 48 hours of first contact. After our initial assessment, most clients are onboarded within 1-2 weeks, depending on complexity.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'We work primarily with mission-driven organizations: startups, SMEs, not-for-profits, and social enterprises. Our expertise spans technology, education, healthcare, and professional services sectors.',
  },
  {
    question: 'Can we work together remotely?',
    answer: 'Absolutely. We\'re a cloud-based practice designed for remote collaboration. We use modern tools for document sharing, video calls, and real-time financial dashboards—no geographic boundaries.',
  },
  {
    question: 'How is your pricing structured?',
    answer: 'We offer transparent, value-based pricing. Most clients work on a monthly retainer that covers ongoing support, compliance, and strategic advisory. We\'ll provide a clear proposal after understanding your specific needs.',
  },
  {
    question: 'What does onboarding look like?',
    answer: 'Our onboarding process includes a comprehensive financial health review, systems setup (cloud accounting, reporting dashboards), and a strategic planning session. Most onboarding completes within 2-4 weeks.',
  },
  {
    question: 'Are you regulated? What qualifications do you have?',
    answer: 'Yes, Pow Consulting is regulated by ICAEW (Institute of Chartered Accountants in England and Wales). Patric is a qualified Chartered Accountant with 15+ years of experience in finance and strategy.',
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer: 'We work with businesses at all stages. For early-stage startups, we focus on financial foundations and tax efficiency. For established businesses, we optimize existing structures and plan for scale.',
  },
  {
    question: 'Can you help with impact measurement for social enterprises?',
    answer: 'Yes, impact measurement is one of our specialties. We help you quantify social and environmental outcomes, create impact reports for stakeholders, and align your financial strategy with your mission.',
  },
  {
    question: 'What\'s your client retention rate?',
    answer: 'We\'re proud of our 95%+ client retention rate. Our clients stay because we deliver tangible value and build genuine partnerships—not just transactional relationships.',
  },
  {
    question: 'How do you ensure we stay compliant with regulations?',
    answer: 'We use cloud-based systems with automated compliance tracking, regular deadline management, and proactive communication. You\'ll never miss a filing or face unexpected penalties.',
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">Common Questions</h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about working with Pow Consulting.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-card transition-shadow"
              >
                <AccordionTrigger className="font-serif text-base font-medium text-primary hover:text-primary/80 py-5 [&[data-state=open]>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-5 leading-relaxed">
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

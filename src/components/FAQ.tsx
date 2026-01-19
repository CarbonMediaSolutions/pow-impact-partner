import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQ = () => {
  const { t } = useTranslation('home');

  const faqs = [
    {
      questionKey: 'faq.q1.question',
      answerKey: 'faq.q1.answer',
    },
    {
      questionKey: 'faq.q2.question',
      answerKey: 'faq.q2.answer',
    },
    {
      questionKey: 'faq.q3.question',
      answerKey: 'faq.q3.answer',
    },
  ];

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
            {t('faq.sectionTitle')}
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
                    {t(faq.questionKey)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="font-body text-muted-foreground pb-6 leading-relaxed">
                  {t(faq.answerKey)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

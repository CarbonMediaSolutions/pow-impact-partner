import { motion } from 'framer-motion';
import { HelpCircle, Clock, Users, Globe, CreditCard, Rocket, Shield, Heart, BarChart, Phone, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    icon: Clock,
    question: 'How quickly can we start working together?',
    preview: 'Get started within 48 hours',
    answer: 'We typically begin with a discovery call within 48 hours of first contact. After our initial assessment, most clients are onboarded within 1-2 weeks, depending on complexity.',
  },
  {
    icon: Users,
    question: 'What industries do you specialize in?',
    preview: 'Mission-driven organizations',
    answer: 'We work primarily with mission-driven organizations: startups, SMEs, not-for-profits, and social enterprises. Our expertise spans technology, education, healthcare, and professional services sectors.',
  },
  {
    icon: Globe,
    question: 'Can we work together remotely?',
    preview: 'Cloud-based, location independent',
    answer: 'Absolutely. We\'re a cloud-based practice designed for remote collaboration. We use modern tools for document sharing, video calls, and real-time financial dashboards—no geographic boundaries.',
  },
  {
    icon: CreditCard,
    question: 'How is your pricing structured?',
    preview: 'Transparent, value-based',
    answer: 'We offer transparent, value-based pricing. Most clients work on a monthly retainer that covers ongoing support, compliance, and strategic advisory. We\'ll provide a clear proposal after understanding your specific needs.',
  },
  {
    icon: Rocket,
    question: 'What does onboarding look like?',
    preview: '2-4 weeks to full integration',
    answer: 'Our onboarding process includes a comprehensive financial health review, systems setup (cloud accounting, reporting dashboards), and a strategic planning session. Most onboarding completes within 2-4 weeks.',
  },
  {
    icon: Shield,
    question: 'Are you regulated? What qualifications do you have?',
    preview: 'ICAEW regulated',
    answer: 'Yes, Pow Consulting is regulated by ICAEW (Institute of Chartered Accountants in England and Wales). Patric is a qualified Chartered Accountant with 15+ years of experience in finance and strategy.',
  },
  {
    icon: Users,
    question: 'Do you work with startups or only established businesses?',
    preview: 'All stages welcome',
    answer: 'We work with businesses at all stages. For early-stage startups, we focus on financial foundations and tax efficiency. For established businesses, we optimize existing structures and plan for scale.',
  },
  {
    icon: Heart,
    question: 'Can you help with impact measurement for social enterprises?',
    preview: 'Specialty service',
    answer: 'Yes, impact measurement is one of our specialties. We help you quantify social and environmental outcomes, create impact reports for stakeholders, and align your financial strategy with your mission.',
  },
  {
    icon: BarChart,
    question: 'What\'s your client retention rate?',
    preview: '95%+ retention',
    answer: 'We\'re proud of our 95%+ client retention rate. Our clients stay because we deliver tangible value and build genuine partnerships—not just transactional relationships.',
  },
  {
    icon: Shield,
    question: 'How do you ensure we stay compliant with regulations?',
    preview: 'Automated tracking & alerts',
    answer: 'We use cloud-based systems with automated compliance tracking, regular deadline management, and proactive communication. You\'ll never miss a filing or face unexpected penalties.',
  },
];

export const FAQ = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-card data-[state=open]:border-primary/30 transition-all"
                >
                  <AccordionTrigger className="py-5 hover:no-underline [&[data-state=open]>svg]:text-primary">
                    <div className="flex items-start gap-4 text-left">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-serif text-base font-semibold text-primary">
                          {faq.question}
                        </p>
                        <p className="font-body text-sm text-muted-foreground mt-0.5">
                          {faq.preview}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground pb-5 pl-14 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center p-8 bg-primary/5 rounded-2xl border border-primary/10"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Phone className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-xl font-bold text-primary">Still have questions?</h3>
          </div>
          <p className="font-body text-muted-foreground mb-6">
            Let's talk. Book a free discovery call and get answers tailored to your situation.
          </p>
          <Button
            onClick={() => scrollToSection('#contact')}
            className="btn-emerald font-body font-semibold px-8 py-6 text-base"
          >
            Book a Free Call
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 lg:py-32 border-t border-border/50">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground tracking-tight leading-tight">
            Let's discuss your next phase of growth.
          </h2>
          
          <Button
            onClick={() => scrollToSection('#contact')}
            className="font-body font-medium px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90"
            size="lg"
          >
            Start a Conversation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="container max-w-5xl">
        <div className="text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-foreground leading-[1.05] tracking-tight">
              From Strategy
              <br />
              <span className="text-primary">to Impact</span>
            </h1>
            
            <p className="font-body text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We partner with founders and leadership teams to design strategy, 
              enable growth, and deliver measurable impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button
              onClick={() => scrollToSection('#insights')}
              className="font-body font-medium px-8 py-6 text-base bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              Explore Our Thinking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => scrollToSection('#approach')}
              variant="outline"
              className="font-body font-medium px-8 py-6 text-base border-foreground/20 text-foreground hover:bg-foreground/5"
              size="lg"
            >
              How We Work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

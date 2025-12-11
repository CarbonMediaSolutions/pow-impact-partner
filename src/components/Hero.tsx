import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-body text-sm font-medium rounded-full">
                ICAEW Chartered Accountants
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-primary leading-[1.1] text-balance">
                From Strategy<br />
                <span className="text-foreground">to Impact</span>
              </h1>
              
              <p className="font-serif text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                We help mission-driven businesses grow their impact while mastering financial complexity.
              </p>
              
              <p className="font-body text-sm text-muted-foreground max-w-md">
                Tax planning, financial compliance, and growth strategy for startups, SMEs, and not-for-profits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('#assessment')}
                className="btn-emerald font-body font-medium px-8 py-6 text-base group"
              >
                Start Your Assessment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('#contact')}
                variant="outline"
                className="btn-outline-primary font-body font-medium px-8 py-6 text-base"
              >
                Schedule a Consultation
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span className="font-body text-sm text-muted-foreground">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-body text-sm text-muted-foreground">ICAEW Regulated</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative circles representing 3Ps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* People Circle */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center"
                  >
                    <span className="font-serif text-lg font-semibold text-primary">People</span>
                  </motion.div>
                  
                  {/* Planet Circle */}
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-8 left-4 w-32 h-32 rounded-full bg-emerald/10 border-2 border-emerald/30 flex items-center justify-center"
                  >
                    <span className="font-serif text-lg font-semibold text-emerald">Planet</span>
                  </motion.div>
                  
                  {/* Profit Circle */}
                  <motion.div
                    animate={{ y: [-3, 7, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-8 right-4 w-32 h-32 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center"
                  >
                    <span className="font-serif text-lg font-semibold text-secondary-foreground">Profit</span>
                  </motion.div>

                  {/* Center intersection */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-serif text-xs font-medium text-primary">Impact</span>
                  </div>

                  {/* Connecting lines */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <line x1="50" y1="20" x2="25" y2="70" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeOpacity="0.3" />
                    <line x1="50" y1="20" x2="75" y2="70" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeOpacity="0.3" />
                    <line x1="25" y1="70" x2="75" y2="70" stroke="hsl(var(--primary))" strokeWidth="0.3" strokeOpacity="0.3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

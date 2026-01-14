import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center pt-20">
      <div className="container max-w-5xl flex-1 flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.1] tracking-tight"
          >
            Shaping the Decisions
            <br />
            That Shape Systems
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto font-body text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            Strategy, governance, and finance architecture for mission-driven and regulated organisations.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto font-body text-sm sm:text-base text-muted-foreground/80 leading-relaxed"
          >
            Advising leaders, institutions, and organisations on choices with long-term economic, social, and regulatory consequences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild className="btn-emerald font-body px-8 py-6 text-base">
              <Link to="/book">
                Book a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-body px-8 py-6 text-base border-foreground/20 hover:bg-foreground hover:text-background">
              <Link to="/solutions">
                View Engagement Models
              </Link>
            </Button>
          </motion.div>

          {/* Credibility Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground/60 font-body"
          >
            <span>ICAEW Chartered Accountant</span>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            <span>Regulated by ICAEW</span>
            <span className="hidden sm:inline text-muted-foreground/30">•</span>
            <span>London, UK</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

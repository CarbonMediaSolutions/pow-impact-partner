import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import patricPortrait from '@/assets/patric-portrait.jpg';

const testimonials = [
  {
    quote: 'Patric has transformed the way we scale our impact. His strategic approach to tax planning means we can reinvest more into what matters most—our mission.',
    author: 'Jacob Hill',
    role: 'Managing Director',
    company: 'Offploy Group',
  },
  {
    quote: 'He is a very passionate and driven individual who genuinely cares about helping businesses succeed. His expertise goes far beyond numbers.',
    author: 'Kirstie Donnelly',
    role: 'CEO',
    company: 'City & Guilds Group',
  },
  {
    quote: 'Focused on making a positive difference in the world. Patric helps organizations increase their social and environmental footprint while maintaining financial health.',
    author: 'Marcia Asare',
    role: 'Executive Director',
    company: 'The Walcot Foundation',
  },
];

const credentials = [
  'ICAEW Chartered Accountant',
  'Regulated by ICAEW',
  '15+ years experience',
  '80+ businesses helped',
];

export const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10" />
              
              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
                <img
                  src={patricPortrait}
                  alt="Patric - Founder of Pow Consulting"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-body text-sm font-bold">ICAEW Chartered</span>
              </div>

              {/* Pull Quote */}
              <div className="absolute -top-6 -right-6 hidden lg:block bg-background p-4 rounded-xl shadow-lg max-w-[200px] border border-border">
                <p className="font-serif text-sm italic text-primary leading-relaxed">
                  "Financial excellence should serve your mission."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="section-title mb-4">Meet Patric</h2>
              <p className="font-serif text-xl text-foreground mb-6">
                "I started Pow because I believe the best businesses aren't built by optimizing profit alone—they're built by optimizing purpose."
              </p>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  After years in corporate finance, I saw that most accountants focus only on the numbers. But mission-driven businesses need more—they need a partner who understands that financial strategy should amplify impact, not constrain it.
                </p>
                <p>
                  Whether you're a startup founder, a scaling SME, or a not-for-profit leader, I'm here to help you master financial complexity while staying true to your values.
                </p>
              </div>
            </div>

            {/* Values - Shortened */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-body text-foreground">Financial excellence serves your mission</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald" />
                <span className="font-body text-foreground">Long-term impact over short-term gains</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-body text-foreground">Transparent, responsive, genuinely invested</span>
              </div>
            </div>

            {/* Credentials */}
            <div className="pt-4 border-t border-border">
              <div className="flex flex-wrap gap-3">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
                    <Award className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="font-body text-sm text-foreground font-medium">{credential}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="relative max-w-3xl mx-auto bg-secondary/10 rounded-2xl p-8 lg:p-12 border-l-4 border-secondary">
            <Quote className="absolute top-6 left-6 w-10 h-10 text-secondary/30" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <blockquote className="font-body text-lg lg:text-xl text-foreground leading-relaxed mb-6 pl-8">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <footer>
                  <p className="font-serif text-lg font-bold text-primary">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-primary" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-background border border-border hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
  '15+ years experience in strategy & finance',
  'Track record with 50+ mission-driven businesses',
];

export const About = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Decorative background */}
              <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10" />
              
              {/* Main visual */}
              <div className="relative h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-secondary/20" />
                <div className="absolute bottom-12 left-6 w-14 h-14 rounded-full bg-emerald/20" />
                
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <span className="font-serif text-4xl font-bold text-primary">P</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-primary mb-2">Patric</h3>
                  <p className="font-body text-sm text-muted-foreground">Founder & Principal Consultant</p>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-body text-sm font-medium">ICAEW Chartered</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="section-title mb-6">Meet Patric</h2>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
                Why I Started Pow
              </h3>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  After years working in corporate finance, I realized most accountants focus only on the numbers. But the best businesses aren't built by optimizing profit alone—they're built by optimizing purpose.
                </p>
                <p>
                  That's where Pow started. I wanted to create a practice that helps mission-driven businesses master financial complexity while staying true to their values. Whether you're a startup founder, a scaling SME, or a not-for-profit leader, I believe your financial strategy should amplify your impact, not constrain it.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-body text-foreground">We believe financial excellence serves your mission</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald" />
                <span className="font-body text-foreground">We prioritize long-term impact over short-term gains</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-body text-foreground">We're transparent, responsive, and genuinely invested</span>
              </div>
            </div>

            {/* Credentials */}
            <div className="pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-4">
                {credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{credential}</span>
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
          <div className="relative max-w-3xl mx-auto bg-secondary/10 rounded-2xl p-8 lg:p-12">
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
                  <p className="font-serif text-lg font-semibold text-primary">
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
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-border'
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

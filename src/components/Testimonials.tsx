import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: 'Patric transformed how we think about impact. Within weeks, we saw clarity and profit improvements we didn\'t think were possible.',
    author: 'Sarah Mitchell',
    role: 'Founder',
    company: 'GreenTech Solutions',
  },
  {
    quote: 'Finally, an accountant who understands that purpose and profit go hand in hand. Our financial clarity has never been better.',
    author: 'Michael Chen',
    role: 'CEO',
    company: 'Impact Ventures',
  },
  {
    quote: 'The assessment alone was worth its weight in gold. It showed us exactly where we were leaving money on the table.',
    author: 'Emma Thompson',
    role: 'Managing Director',
    company: 'Social Good Agency',
  },
  {
    quote: 'Working with Pow has been transformative. We\'ve optimized our tax position and can now reinvest significantly more into our mission.',
    author: 'David Williams',
    role: 'Director',
    company: 'Community First Foundation',
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Don't just take our word for it—hear from the businesses we've helped transform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-full p-8 bg-background rounded-2xl border border-border shadow-card hover:shadow-lift transition-shadow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10" />
                  <p className="font-body text-foreground leading-relaxed pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-lg font-bold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

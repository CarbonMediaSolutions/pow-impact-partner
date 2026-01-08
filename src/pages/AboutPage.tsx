import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, Quote, Users, Leaf, TrendingUp } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import patricPortrait from '@/assets/patric-portrait.jpg';

const testimonials = [
  {
    quote: 'The firm provided clarity on financial structure and governance at a critical stage of growth. Their approach was rigorous and aligned with long-term objectives.',
    author: 'Managing Director',
    role: '',
    company: 'Professional Services Firm',
  },
  {
    quote: 'A highly capable advisory partner. Their work on organisational strategy helped refine decision-making across the leadership team.',
    author: 'Chief Executive',
    role: '',
    company: 'National Skills Organisation',
  },
  {
    quote: 'Plexa Partners brought strategic and financial discipline to a complex transformation. The engagement delivered measurable outcomes.',
    author: 'Executive Director',
    role: '',
    company: 'Grant-Making Foundation',
  },
];

const credentials = [
  'ICAEW Chartered Accountant',
  'Regulated by ICAEW',
];

const values = [
  {
    icon: Users,
    title: 'People',
    description: 'Leadership effectiveness, organisational alignment, and decision quality.'
  },
  {
    icon: Leaf,
    title: 'Planet',
    description: 'Long-term resilience, responsible growth, and sustainable value creation.'
  },
  {
    icon: TrendingUp,
    title: 'Performance',
    description: 'Capital discipline, operational clarity, and measurable outcomes.'
  },
];

export default function AboutPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10" />
                <div className="relative overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
                  <img
                    src={patricPortrait}
                    alt="Patric - Founder, Plexa Partners"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-body text-sm font-medium">ICAEW Chartered</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                About Plexa Partners
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Plexa Partners is an independent advisory firm operating at the intersection of strategy, governance, and long-term performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {credentials.map((credential, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 bg-background px-5 py-3 rounded-lg border border-border"
              >
                <Award className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="font-body text-foreground font-medium">{credential}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Firm */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              The Firm
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Plexa Partners advises founders, leadership teams, and boards navigating growth, transformation, and strategic complexity.
              </p>
              <p>
                The firm works across organisational design, governance, and financial strategy, supporting decision-making where clarity, judgment, and long-term perspective matter most.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Think */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
              How We Think
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">{value.title}</h3>
                <p className="font-body text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Origins */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              Firm Origins
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Plexa Partners was established to address the growing gap between financial expertise and strategic decision-making in complex organisations.
              </p>
              <p>
                Many mission-driven, growth-stage, and professional services organisations face challenges that cannot be solved through compliance or transactional advice alone. The firm was created to provide senior-level strategic and financial counsel aligned with long-term objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Perspectives */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground">
              Client Perspectives
            </h2>
          </motion.div>

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
                  <p className="font-serif text-lg font-medium text-primary">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].company}
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>

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
        </div>
      </section>

      {/* Thought Leaders */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-divider" />
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-8">
              Thought Leaders
            </h2>
            <div className="font-body text-lg text-muted-foreground space-y-4 leading-relaxed">
              <p>
                Patric is the Founder and Principal Advisor at Plexa Partners.
              </p>
              <p>
                He advises founders, leadership teams, and boards on strategic finance, governance, and organisational decision-making. His work spans growth strategy, capital structure, and operational performance across a range of sectors.
              </p>
              <p>
                Patric is a Chartered Accountant and has advised organisations at various stages of scale and complexity.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-muted-foreground mb-4">
              For enquiries regarding advisory engagements, please contact the firm directly.
            </p>
            <a 
              href="mailto:hello@plexapartners.com" 
              className="font-body text-teal hover:underline underline-offset-2"
            >
              hello@plexapartners.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

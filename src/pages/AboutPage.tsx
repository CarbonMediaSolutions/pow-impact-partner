import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, ChevronLeft, ChevronRight, Quote, Users, Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
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

const values = [
  {
    icon: Users,
    title: 'People First',
    description: 'We believe the best businesses invest in their teams. Every decision we help you make considers the human impact.'
  },
  {
    icon: Leaf,
    title: 'Planet Conscious',
    description: 'Environmental responsibility is woven into our approach. We help you measure and amplify your positive footprint.'
  },
  {
    icon: TrendingUp,
    title: 'Purposeful Profit',
    description: 'Sustainable profit enables everything else. We ensure your financial health supports your mission long-term.'
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
                    alt="Patric - Founder of Pow Consulting"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-secondary text-secondary-foreground px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-body text-sm font-bold">ICAEW Chartered</span>
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
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Meet Patric
              </h1>
              <p className="font-serif text-xl text-primary mb-6">
                "I started Pow because I believe the best businesses aren't built by optimizing profit alone—they're built by optimizing purpose."
              </p>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed mb-8">
                <p>
                  After years in corporate finance, I saw that most accountants focus only on the numbers. But mission-driven businesses need more—they need a partner who understands that financial strategy should amplify impact, not constrain it.
                </p>
                <p>
                  Whether you're a startup founder, a scaling SME, or a not-for-profit leader, I'm here to help you master financial complexity while staying true to your values.
                </p>
              </div>
              <Link to="/contact">
                <Button className="btn-emerald font-body font-semibold px-8 py-6 text-lg">
                  Let's Talk
                </Button>
              </Link>
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

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Guiding Principles
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything we do is guided by the 3Ps: People, Planet, and Profit working in harmony.
            </p>
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
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="font-body text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              The Pow Story
            </h2>
            <div className="font-body text-lg text-foreground/80 space-y-6">
              <p>
                Pow Consulting was born from a simple observation: too many mission-driven businesses were getting generic financial advice that didn't account for their unique challenges and aspirations.
              </p>
              <p>
                Traditional accountants focus on compliance and cost reduction. But what about the startup that wants to offer living wages? The social enterprise that needs to measure impact alongside profit? The not-for-profit navigating complex funding requirements?
              </p>
              <p>
                These organizations needed a different kind of partner—one who could speak the language of purpose as fluently as the language of finance. That's why I created Pow.
              </p>
              <p>
                Today, we've helped over 80 businesses navigate financial complexity while staying true to their values. Every engagement is guided by the 3Ps: People, Planet, and Profit working in harmony.
              </p>
              <p>
                Whether you're a startup finding your footing, an SME ready to scale, or a not-for-profit seeking to amplify your impact, we're here to help you build something that matters.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
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
                  <p className="font-serif text-lg font-bold text-primary">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
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

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Work Together?
            </h2>
            <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how Pow Consulting can help your organization thrive.
            </p>
            <Link to="/contact">
              <Button className="bg-emerald hover:bg-emerald/90 text-emerald-foreground font-body font-semibold px-10 py-6 text-lg">
                Book Your Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

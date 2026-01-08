import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { caseStudies } from '@/data/caseStudies';

export default function CaseStudyPage() {
  const { id } = useParams();
  const study = caseStudies.find(s => s.id === id);
  
  if (!study) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <p className="font-body text-muted-foreground mb-8">The case study you're looking for doesn't exist.</p>
          <Link to="/impact">
            <Button className="btn-emerald font-body">View All Case Studies</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherStudies = caseStudies.filter(s => s.id !== study.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl">
          <Link to="/impact" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" />
            Back to Impact Stories
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="font-body mb-4">{study.type}</Badge>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {study.company}
            </h1>
            <p className="font-body text-xl text-muted-foreground">
              {study.challenge}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={study.image}
              alt={study.company}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {study.metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${
                  study.color === 'primary'
                    ? 'bg-primary/10'
                    : study.color === 'emerald'
                    ? 'bg-emerald/10'
                    : 'bg-secondary/20'
                }`}
              >
                <p
                  className={`font-serif text-2xl md:text-3xl font-bold ${
                    study.color === 'primary'
                      ? 'text-primary'
                      : study.color === 'emerald'
                      ? 'text-emerald'
                      : 'text-secondary'
                  }`}
                >
                  {metric.value}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-1">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The Challenge</h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              {study.challenge}
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Our Perspective</h2>
            <p className="font-body text-lg text-teal italic mb-8">
              "{study.perspective}"
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The Solution</h2>
            <p className="font-body text-lg text-muted-foreground mb-8">
              {study.solution}
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The Full Story</h2>
            <div className="font-body text-lg text-foreground/80 space-y-4 mb-8">
              {study.fullStory.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Key Results</h2>
            <ul className="space-y-3 mb-12">
              {study.results.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="font-body text-foreground">{result}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-secondary/10 rounded-2xl p-8 border-l-4 border-secondary relative"
          >
            <Quote className="absolute top-6 left-6 w-10 h-10 text-secondary/30" />
            <blockquote className="pl-8">
              <p className="font-body text-lg italic text-foreground mb-4">
                "{study.quote}"
              </p>
              <footer>
                <p className="font-serif font-bold text-primary">{study.author}</p>
                <p className="font-body text-sm text-muted-foreground">{study.role}, {study.company}</p>
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container max-w-3xl text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Want Similar Results?
          </h3>
          <p className="font-body text-primary-foreground/80 mb-6">
            Book a free consultation to discuss how we can help your organization achieve its goals.
          </p>
          <Link to="/book">
            <Button className="bg-emerald hover:bg-emerald/90 text-emerald-foreground font-body font-semibold px-8 py-6">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Other Case Studies */}
      {otherStudies.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">More Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherStudies.map((otherStudy, index) => (
                <motion.div
                  key={otherStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/case-studies/${otherStudy.id}`} className="block bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={otherStudy.image}
                      alt={otherStudy.company}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-6">
                      <Badge variant="outline" className="font-body mb-3">{otherStudy.type}</Badge>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {otherStudy.company}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground mb-4">{otherStudy.challenge}</p>
                      <span className="inline-flex items-center gap-2 font-body font-semibold text-primary">
                        Read Case Study
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

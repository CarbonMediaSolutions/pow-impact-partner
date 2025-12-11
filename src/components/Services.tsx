import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, Heart, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Tax Planning & Optimization',
    description: 'Maximize what you reinvest in your mission. We structure your taxes strategically so you keep more, give more, and grow more.',
    quote: 'We effectively tax planned to reinvest as much in our impact as possible.',
    author: 'Jacob Hill, Offploy Group',
    cta: 'Explore tax strategy',
  },
  {
    icon: Shield,
    title: 'Financial Compliance & Reporting',
    description: 'Navigate regulatory requirements with confidence. Our cloud-based systems keep you compliant while giving you real-time visibility into your finances.',
    quote: 'Removes worry, saves time, ensures accuracy.',
    author: '',
    cta: 'Learn about compliance',
  },
  {
    icon: Target,
    title: 'Growth & Scale Strategy',
    description: 'Take your business from surviving to thriving. We help you identify growth opportunities, structure scaling strategies, and plan financially for expansion.',
    quote: 'Patric helps organizations increase their social and environmental footprint.',
    author: 'Marcia Asare, The Walcot Foundation',
    cta: 'Discuss growth strategy',
  },
  {
    icon: Heart,
    title: 'Impact Measurement & Reporting',
    description: 'Prove your worth. We help you quantify and communicate your social and environmental impact to stakeholders, funders, and your team.',
    quote: 'Attracts investors, motivates staff, guides strategy.',
    author: '',
    cta: 'Measure your impact',
  },
];

export const Services = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">Our Services</h2>
          <p className="section-subtitle mx-auto">
            We combine financial expertise with strategic thinking to help your business grow intentionally.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-background border border-border rounded-2xl card-hover cursor-pointer">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-primary mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Quote */}
                  <div className="mb-6">
                    <p className="font-body text-sm italic text-foreground/70">
                      "{service.quote}"
                    </p>
                    {service.author && (
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        — {service.author}
                      </p>
                    )}
                  </div>

                  {/* CTA Link */}
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="inline-flex items-center font-body text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    {service.cta}
                    <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

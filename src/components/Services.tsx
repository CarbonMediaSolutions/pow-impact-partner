import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, Heart, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    icon: TrendingUp,
    title: 'Tax Planning & Optimization',
    headline: 'Keep more. Give more. Grow more.',
    description: 'We structure your taxes strategically so you can reinvest in your mission.',
    benefits: [
      'Minimize tax liability legally',
      'Maximize reinvestment capacity',
      'Strategic structure optimization',
      'Year-round proactive planning',
    ],
    quote: 'We effectively tax planned to reinvest as much in our impact as possible.',
    author: 'Jacob Hill, Offploy Group',
  },
  {
    icon: Shield,
    title: 'Financial Compliance & Reporting',
    headline: 'Never worry about deadlines again.',
    description: 'Cloud-based systems keep you compliant with real-time visibility.',
    benefits: [
      'Automated compliance tracking',
      'Real-time financial dashboards',
      'Deadline management',
      'Regulatory peace of mind',
    ],
    quote: 'Removes worry, saves time, ensures accuracy.',
    author: '',
  },
  {
    icon: Target,
    title: 'Growth & Scale Strategy',
    headline: 'Turn vision into scalable reality.',
    description: 'We help you identify opportunities and plan financially for expansion.',
    benefits: [
      'Growth opportunity analysis',
      'Scaling roadmap development',
      'Financial forecasting',
      'Investment readiness',
    ],
    quote: 'Patric helps organizations increase their social and environmental footprint.',
    author: 'Marcia Asare, The Walcot Foundation',
  },
  {
    icon: Heart,
    title: 'Impact Measurement & Reporting',
    headline: 'Prove your worth. Amplify your story.',
    description: 'Quantify and communicate your social and environmental impact.',
    benefits: [
      'Impact metrics framework',
      'Stakeholder reporting',
      'Funder-ready documentation',
      'Strategic impact alignment',
    ],
    quote: 'Attracts investors, motivates staff, guides strategy.',
    author: '',
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
            Financial expertise meets strategic thinking for intentional growth.
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
                  <div className="w-14 h-14 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-primary mb-2">
                    {service.title}
                  </h3>

                  {/* Bold Headline */}
                  <p className="font-body text-lg font-bold text-foreground mb-3">
                    {service.headline}
                  </p>

                  {/* Description */}
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2 mb-5">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald flex-shrink-0" />
                        <span className="font-body text-sm text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Quote */}
                  {service.quote && (
                    <div className="pt-4 border-t border-border/50 mb-4">
                      <p className="font-body text-sm italic text-muted-foreground">
                        "{service.quote}"
                      </p>
                      {service.author && (
                        <p className="font-body text-xs text-muted-foreground mt-1">
                          — {service.author}
                        </p>
                      )}
                    </div>
                  )}

                  {/* CTA Link */}
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="inline-flex items-center font-body text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    Learn more
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

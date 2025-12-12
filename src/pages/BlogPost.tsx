import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogPosts';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="font-body text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button className="btn-emerald font-body">Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-body">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="outline" className="font-body">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground font-body">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>
            
            <p className="font-body text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-body font-semibold text-foreground">{post.author}</p>
                <p className="font-body text-sm text-muted-foreground">Founder, Pow Consulting</p>
              </div>
            </div>
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
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none font-body"
          >
            <p>
              In today's rapidly evolving business landscape, mission-driven organizations face unique challenges when it comes to financial strategy. Balancing profit with purpose requires a thoughtful approach that considers both immediate needs and long-term sustainability.
            </p>
            
            <h2 className="font-serif">Understanding the Landscape</h2>
            <p>
              Whether you're a startup, SME, or not-for-profit, the principles of sound financial management remain consistent. However, the application of these principles must be tailored to your specific context and goals.
            </p>
            <p>
              Many organizations struggle to find the right balance between investing in growth and maintaining financial stability. This is where strategic planning becomes essential—not just as a theoretical exercise, but as a practical roadmap for achieving your mission.
            </p>

            <h2 className="font-serif">Key Considerations</h2>
            <ul>
              <li><strong>Clarity of Purpose:</strong> Understanding your organization's core mission helps inform every financial decision you make.</li>
              <li><strong>Stakeholder Alignment:</strong> Ensuring your financial strategy reflects the values and expectations of your stakeholders builds trust and long-term support.</li>
              <li><strong>Adaptive Planning:</strong> Building flexibility into your financial plans allows you to respond to changing circumstances without losing sight of your goals.</li>
              <li><strong>Impact Measurement:</strong> Quantifying your social and environmental impact demonstrates value beyond financial returns.</li>
            </ul>

            <h2 className="font-serif">Moving Forward</h2>
            <p>
              The most successful mission-driven organizations are those that view financial management not as a constraint, but as an enabler of their impact. By taking a strategic approach to finances, you can ensure that every pound, dollar, or euro is working toward your ultimate goals.
            </p>
            <p>
              Remember: sustainable impact requires sustainable finances. Investing time and resources into building strong financial foundations today will pay dividends—both financial and social—for years to come.
            </p>
          </motion.article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border">
            <h4 className="font-body font-semibold text-foreground mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="font-body">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
            Want to discuss these ideas further?
          </h3>
          <p className="font-body text-muted-foreground mb-6">
            Book a free consultation to explore how these strategies could work for your organization.
          </p>
          <Button className="btn-emerald font-body font-semibold px-8 py-6">
            Book Your Free Consultation
          </Button>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/blog/${relatedPost.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <Badge variant="outline" className="font-body text-xs mb-3">{relatedPost.category}</Badge>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-primary">
                        Read Article
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

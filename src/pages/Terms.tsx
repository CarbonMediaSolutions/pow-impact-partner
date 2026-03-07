import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container max-w-3xl py-32 lg:py-40">
        <p className="font-body text-sm text-muted-foreground mb-4">Last updated: 7 March 2025</p>
        <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-12">Terms of Service</h1>

        <div className="space-y-10 font-body text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing or using the Plexa Partners website ("the Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you should not use the Site. Plexa Partners reserves the right to modify these terms at any time, and continued use of the Site constitutes acceptance of any such modifications.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">2. Description of Services</h2>
            <p>Plexa Partners is an independent advisory firm operating at the intersection of strategy, governance, and impact. The Site provides information about our advisory services, published perspectives, research, and engagement models. Content on the Site is provided for general informational purposes and does not constitute professional advice.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">3. Professional Advice Disclaimer</h2>
            <p>Nothing on this Site constitutes financial, legal, tax, or other professional advice. Any reliance on the information provided is at your own risk. Organisations and individuals should seek independent professional counsel before making decisions based on content published on the Site.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">4. Intellectual Property</h2>
            <p>All content on the Site — including text, research, analyses, graphics, logos, and design elements — is the intellectual property of Plexa Partners or its contributors and is protected by applicable copyright and intellectual property laws. No content may be reproduced, distributed, or transmitted without prior written consent, except for brief quotations with appropriate attribution.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">5. User Submissions</h2>
            <p>By submitting perspectives, enquiries, or other content through the Site, you grant Plexa Partners a non-exclusive, royalty-free licence to use, reproduce, and publish such content in connection with our advisory and editorial activities. You represent that you have the right to submit such content and that it does not infringe upon the rights of any third party.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Plexa Partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or in connection with the use of the Site, including but not limited to loss of profits, data, or business opportunities. Our total aggregate liability shall not exceed the amount paid by you, if any, for accessing the Site.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">7. Third-Party Links</h2>
            <p>The Site may contain links to third-party websites or services. Plexa Partners does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Access to linked sites is at your own risk.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">8. Indemnification</h2>
            <p>You agree to indemnify and hold harmless Plexa Partners, its directors, officers, and employees from any claims, damages, losses, or expenses arising from your use of the Site or violation of these terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">9. Governing Law</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">10. Severability</h2>
            <p>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">11. Contact</h2>
            <p>For questions regarding these terms, please contact us at <a href="mailto:hello@plexapartners.com" className="text-foreground underline">hello@plexapartners.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

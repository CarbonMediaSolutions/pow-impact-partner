import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container max-w-3xl py-32 lg:py-40">
        <p className="font-body text-sm text-muted-foreground mb-4">Last updated: 7 March 2025</p>
        <h1 className="font-serif text-3xl lg:text-4xl font-medium mb-12">Privacy Policy</h1>

        <div className="space-y-10 font-body text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">1. Introduction</h2>
            <p>Plexa Partners ("we", "our", "us") is committed to protecting the privacy of individuals who interact with our website and services. This policy outlines how we collect, use, store, and protect personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">2. Data Controller</h2>
            <p>Plexa Partners, based in London, United Kingdom, is the data controller for information collected through this website. For enquiries regarding data protection, please contact us at <a href="mailto:hello@plexapartners.com" className="text-foreground underline">hello@plexapartners.com</a>.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">3. Information We Collect</h2>
            <p>We may collect the following categories of personal data:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email address, and organisation details provided through consultation request forms, newsletter sign-ups, or perspective submissions.</li>
              <li>Technical data such as IP address, browser type, operating system, and browsing behaviour collected automatically through cookies and similar technologies.</li>
              <li>Any additional information voluntarily provided in correspondence.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">4. How We Use Your Data</h2>
            <p>Personal data is processed for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responding to consultation and advisory enquiries.</li>
              <li>Distributing newsletters and research publications to subscribers.</li>
              <li>Improving website functionality and user experience.</li>
              <li>Complying with legal and regulatory obligations.</li>
            </ul>
            <p>The legal bases for processing include consent, legitimate interest, and contractual necessity.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">5. Cookies</h2>
            <p>This website uses essential cookies to ensure proper functionality. Analytics cookies may be used to understand how visitors interact with the site. You may control cookie preferences through your browser settings. Third-party services used on this site may set their own cookies in accordance with their respective privacy policies.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">6. Third-Party Services</h2>
            <p>We may use third-party service providers for hosting, analytics, and email delivery. These providers process data on our behalf and are contractually obligated to protect personal data in compliance with applicable data protection legislation.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">7. Data Retention</h2>
            <p>Personal data is retained only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Newsletter subscriber data is retained until the subscriber opts out. Consultation enquiry data is retained for a period of twenty-four months following the last interaction.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">8. Your Rights</h2>
            <p>Under the UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request data portability.</li>
              <li>Withdraw consent at any time where processing is based on consent.</li>
            </ul>
            <p>To exercise any of these rights, please contact <a href="mailto:hello@plexapartners.com" className="text-foreground underline">hello@plexapartners.com</a>.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">9. Data Security</h2>
            <p>We implement appropriate technical and organisational measures to protect personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">10. Changes to This Policy</h2>
            <p>We reserve the right to update this privacy policy at any time. Material changes will be reflected in the "Last updated" date at the top of this page. Continued use of the website following any changes constitutes acceptance of the revised policy.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-lg text-foreground">11. Contact</h2>
            <p>For any questions regarding this privacy policy or our data practices, please contact us at <a href="mailto:hello@plexapartners.com" className="text-foreground underline">hello@plexapartners.com</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

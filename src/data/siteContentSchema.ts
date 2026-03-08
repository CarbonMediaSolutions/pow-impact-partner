export interface ContentField {
  key: string;
  label: string;
  type: 'input' | 'textarea';
}

export interface ContentSection {
  label: string;
  fields: ContentField[];
}

export interface ContentPage {
  label: string;
  sections: Record<string, ContentSection>;
}

export type SiteContentSchema = Record<string, ContentPage>;

export const siteContentSchema: SiteContentSchema = {
  home: {
    label: 'Home',
    sections: {
      hero: {
        label: 'Hero Section',
        fields: [
          { key: 'hero.headline', label: 'Headline', type: 'input' },
          { key: 'hero.headlineLine2', label: 'Headline Line 2', type: 'input' },
          { key: 'hero.subheadline', label: 'Subheadline', type: 'textarea' },
          { key: 'hero.description', label: 'Description', type: 'textarea' },
        ],
      },
      pillars: {
        label: 'How We Work (Three Pillars)',
        fields: [
          { key: 'pillars.sectionTitle', label: 'Section Title', type: 'input' },
          { key: 'pillars.sectionDescription', label: 'Section Description', type: 'textarea' },
          { key: 'pillars.perspective.title', label: 'Perspective — Title', type: 'input' },
          { key: 'pillars.perspective.description', label: 'Perspective — Description', type: 'textarea' },
          { key: 'pillars.dataAnalysis.title', label: 'Data & Analysis — Title', type: 'input' },
          { key: 'pillars.dataAnalysis.description', label: 'Data & Analysis — Description', type: 'textarea' },
          { key: 'pillars.solutions.title', label: 'Solutions — Title', type: 'input' },
          { key: 'pillars.solutions.description', label: 'Solutions — Description', type: 'textarea' },
        ],
      },
      themes: {
        label: 'Strategic Themes',
        fields: [
          { key: 'themes.sectionTitle', label: 'Section Title', type: 'input' },
          { key: 'themes.growth.title', label: 'Growth — Title', type: 'input' },
          { key: 'themes.growth.description', label: 'Growth — Description', type: 'textarea' },
          { key: 'themes.organisation.title', label: 'Organisation — Title', type: 'input' },
          { key: 'themes.organisation.description', label: 'Organisation — Description', type: 'textarea' },
          { key: 'themes.capital.title', label: 'Capital — Title', type: 'input' },
          { key: 'themes.capital.description', label: 'Capital — Description', type: 'textarea' },
        ],
      },
      engagements: {
        label: 'Selected Engagements',
        fields: [
          { key: 'engagements.sectionTitle', label: 'Section Title', type: 'input' },
          { key: 'engagements.sectionDescription', label: 'Section Description', type: 'textarea' },
          { key: 'engagements.tech.sector', label: 'Tech — Sector', type: 'input' },
          { key: 'engagements.tech.situation', label: 'Tech — Situation', type: 'textarea' },
          { key: 'engagements.tech.outcome', label: 'Tech — Outcome', type: 'textarea' },
          { key: 'engagements.professional.sector', label: 'Professional — Sector', type: 'input' },
          { key: 'engagements.professional.situation', label: 'Professional — Situation', type: 'textarea' },
          { key: 'engagements.professional.outcome', label: 'Professional — Outcome', type: 'textarea' },
          { key: 'engagements.social.sector', label: 'Social — Sector', type: 'input' },
          { key: 'engagements.social.situation', label: 'Social — Situation', type: 'textarea' },
          { key: 'engagements.social.outcome', label: 'Social — Outcome', type: 'textarea' },
        ],
      },
      faq: {
        label: 'Common Questions',
        fields: [
          { key: 'faq.sectionTitle', label: 'Section Title', type: 'input' },
          { key: 'faq.q1.question', label: 'Q1 — Question', type: 'input' },
          { key: 'faq.q1.answer', label: 'Q1 — Answer', type: 'textarea' },
          { key: 'faq.q2.question', label: 'Q2 — Question', type: 'input' },
          { key: 'faq.q2.answer', label: 'Q2 — Answer', type: 'textarea' },
          { key: 'faq.q3.question', label: 'Q3 — Question', type: 'input' },
          { key: 'faq.q3.answer', label: 'Q3 — Answer', type: 'textarea' },
        ],
      },
    },
  },
  about: {
    label: 'About',
    sections: {
      hero: {
        label: 'Hero',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'hero.intro', label: 'Introduction', type: 'textarea' },
        ],
      },
      howWeThink: {
        label: 'How We Think (People/Planet/Performance)',
        fields: [
          { key: 'howWeThink.title', label: 'Section Title', type: 'input' },
          { key: 'howWeThink.people.title', label: 'People — Title', type: 'input' },
          { key: 'howWeThink.people.description', label: 'People — Description', type: 'textarea' },
          { key: 'howWeThink.planet.title', label: 'Planet — Title', type: 'input' },
          { key: 'howWeThink.planet.description', label: 'Planet — Description', type: 'textarea' },
          { key: 'howWeThink.performance.title', label: 'Performance — Title', type: 'input' },
          { key: 'howWeThink.performance.description', label: 'Performance — Description', type: 'textarea' },
        ],
      },
      theFirm: {
        label: 'The Firm',
        fields: [
          { key: 'theFirm.title', label: 'Section Title', type: 'input' },
          { key: 'theFirm.p1', label: 'Paragraph 1', type: 'textarea' },
          { key: 'theFirm.p2', label: 'Paragraph 2', type: 'textarea' },
          { key: 'theFirm.p3', label: 'Paragraph 3', type: 'textarea' },
        ],
      },
      leadershipTeam: {
        label: 'Leadership Team',
        fields: [
          { key: 'leadershipTeam.title', label: 'Section Title', type: 'input' },
          { key: 'leadershipTeam.members.patric.name', label: 'Patric — Name', type: 'input' },
          { key: 'leadershipTeam.members.patric.role', label: 'Patric — Role', type: 'input' },
          { key: 'leadershipTeam.members.patric.focus', label: 'Patric — Focus', type: 'input' },
          { key: 'leadershipTeam.members.rakesh.name', label: 'Rakesh — Name', type: 'input' },
          { key: 'leadershipTeam.members.rakesh.role', label: 'Rakesh — Role', type: 'input' },
          { key: 'leadershipTeam.members.rakesh.focus', label: 'Rakesh — Focus', type: 'input' },
          { key: 'leadershipTeam.members.pengLi.name', label: 'Peng-Li — Name', type: 'input' },
          { key: 'leadershipTeam.members.pengLi.role', label: 'Peng-Li — Role', type: 'input' },
          { key: 'leadershipTeam.members.pengLi.focus', label: 'Peng-Li — Focus', type: 'input' },
          { key: 'leadershipTeam.members.chiara.name', label: 'Chiara — Name', type: 'input' },
          { key: 'leadershipTeam.members.chiara.role', label: 'Chiara — Role', type: 'input' },
          { key: 'leadershipTeam.members.chiara.focus', label: 'Chiara — Focus', type: 'input' },
          { key: 'leadershipTeam.members.gabriel.name', label: 'Gabriel — Name', type: 'input' },
          { key: 'leadershipTeam.members.gabriel.role', label: 'Gabriel — Role', type: 'input' },
          { key: 'leadershipTeam.members.gabriel.focus', label: 'Gabriel — Focus', type: 'input' },
          { key: 'leadershipTeam.members.nicole.name', label: 'Nicole — Name', type: 'input' },
          { key: 'leadershipTeam.members.nicole.role', label: 'Nicole — Role', type: 'input' },
          { key: 'leadershipTeam.members.nicole.focus', label: 'Nicole — Focus', type: 'input' },
          { key: 'leadershipTeam.members.stephen.name', label: 'Stephen — Name', type: 'input' },
          { key: 'leadershipTeam.members.stephen.role', label: 'Stephen — Role', type: 'input' },
          { key: 'leadershipTeam.members.stephen.focus', label: 'Stephen — Focus', type: 'input' },
          { key: 'leadershipTeam.members.mandy.name', label: 'Mandy — Name', type: 'input' },
          { key: 'leadershipTeam.members.mandy.role', label: 'Mandy — Role', type: 'input' },
          { key: 'leadershipTeam.members.mandy.focus', label: 'Mandy — Focus', type: 'input' },
        ],
      },
      professionalStandards: {
        label: 'Professional Standards',
        fields: [
          { key: 'professionalStandards.title', label: 'Section Title', type: 'input' },
          { key: 'professionalStandards.items.icaew', label: 'ICAEW', type: 'input' },
          { key: 'professionalStandards.items.chartered', label: 'Chartered', type: 'input' },
          { key: 'professionalStandards.items.independent', label: 'Independent', type: 'input' },
          { key: 'professionalStandards.items.confidentiality', label: 'Confidentiality', type: 'input' },
        ],
      },
      clientPerspectives: {
        label: 'Client Perspectives',
        fields: [
          { key: 'clientPerspectives.title', label: 'Section Title', type: 'input' },
          { key: 'clientPerspectives.testimonials.t1.quote', label: 'Testimonial 1 — Quote', type: 'textarea' },
          { key: 'clientPerspectives.testimonials.t1.author', label: 'Testimonial 1 — Author', type: 'input' },
          { key: 'clientPerspectives.testimonials.t1.company', label: 'Testimonial 1 — Company', type: 'input' },
          { key: 'clientPerspectives.testimonials.t2.quote', label: 'Testimonial 2 — Quote', type: 'textarea' },
          { key: 'clientPerspectives.testimonials.t2.author', label: 'Testimonial 2 — Author', type: 'input' },
          { key: 'clientPerspectives.testimonials.t2.company', label: 'Testimonial 2 — Company', type: 'input' },
          { key: 'clientPerspectives.testimonials.t3.quote', label: 'Testimonial 3 — Quote', type: 'textarea' },
          { key: 'clientPerspectives.testimonials.t3.author', label: 'Testimonial 3 — Author', type: 'input' },
          { key: 'clientPerspectives.testimonials.t3.company', label: 'Testimonial 3 — Company', type: 'input' },
        ],
      },
      closingCTA: {
        label: 'Closing CTA',
        fields: [
          { key: 'closingCTA.independence', label: 'Independence Statement', type: 'textarea' },
          { key: 'closingCTA.text', label: 'CTA Text', type: 'textarea' },
          { key: 'closingCTA.button', label: 'Button Text', type: 'input' },
        ],
      },
    },
  },
  common: {
    label: 'Common',
    sections: {
      nav: {
        label: 'Navigation',
        fields: [
          { key: 'nav.home', label: 'Home', type: 'input' },
          { key: 'nav.about', label: 'About', type: 'input' },
          { key: 'nav.perspectives', label: 'Perspectives', type: 'input' },
          { key: 'nav.dataAnalysis', label: 'Data & Analysis', type: 'input' },
          { key: 'nav.solutions', label: 'Solutions', type: 'input' },
          { key: 'nav.requestConsultation', label: 'Request Consultation', type: 'input' },
          { key: 'nav.shareYourPerspective', label: 'Share Your Perspective', type: 'input' },
        ],
      },
      brand: {
        label: 'Brand',
        fields: [
          { key: 'brand.name', label: 'Brand Name', type: 'input' },
        ],
      },
      footer: {
        label: 'Footer',
        fields: [
          { key: 'footer.statement', label: 'Statement', type: 'textarea' },
          { key: 'footer.location', label: 'Location', type: 'input' },
          { key: 'footer.copyright', label: 'Copyright', type: 'input' },
          { key: 'footer.email', label: 'Email Address', type: 'input' },
          { key: 'footer.linkedinUrl', label: 'LinkedIn URL', type: 'input' },
        ],
      },
      cta: {
        label: 'CTAs',
        fields: [
          { key: 'cta.bookConsultation', label: 'Book Consultation', type: 'input' },
          { key: 'cta.viewEngagementModels', label: 'View Engagement Models', type: 'input' },
          { key: 'cta.readPerspectives', label: 'Read Perspectives', type: 'input' },
          { key: 'cta.exploreAnalysis', label: 'Explore Analysis', type: 'input' },
          { key: 'cta.viewSolutions', label: 'View Solutions', type: 'input' },
          { key: 'cta.forAdvisoryInquiries', label: 'For Advisory Inquiries', type: 'input' },
        ],
      },
      credentials: {
        label: 'Credentials',
        fields: [
          { key: 'credentials.regulatedByIcaew', label: 'Regulated By ICAEW', type: 'input' },
          { key: 'credentials.locations', label: 'Locations', type: 'input' },
        ],
      },
      clients: {
        label: 'Client Logos',
        fields: [
          { key: 'clients.label', label: 'Client Logos Label', type: 'input' },
        ],
      },
    },
  },
  solutions: {
    label: 'Solutions',
    sections: {
      page: {
        label: 'Page Header',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'pageDescription', label: 'Page Description', type: 'textarea' },
        ],
      },
      howWeWork: {
        label: 'How We Work With You',
        fields: [
          { key: 'howWeWork.title', label: 'Section Title', type: 'input' },
          { key: 'howWeWork.directAccess.title', label: 'Direct Access — Title', type: 'input' },
          { key: 'howWeWork.directAccess.description', label: 'Direct Access — Description', type: 'textarea' },
          { key: 'howWeWork.response.title', label: 'Response — Title', type: 'input' },
          { key: 'howWeWork.response.description', label: 'Response — Description', type: 'textarea' },
          { key: 'howWeWork.specialists.title', label: 'Specialists — Title', type: 'input' },
          { key: 'howWeWork.specialists.description', label: 'Specialists — Description', type: 'textarea' },
        ],
      },
    },
  },
  perspectives: {
    label: 'Perspectives',
    sections: {
      page: {
        label: 'Page Header',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'pageSubtitle', label: 'Page Subtitle', type: 'input' },
          { key: 'pageDescription', label: 'Page Description', type: 'textarea' },
          { key: 'introText', label: 'Intro Text', type: 'textarea' },
          { key: 'serviceCTA', label: 'Service CTA', type: 'textarea' },
          { key: 'footerNote', label: 'Footer Note', type: 'textarea' },
        ],
      },
      newsletter: {
        label: 'Newsletter',
        fields: [
          { key: 'newsletter.title', label: 'Title', type: 'input' },
          { key: 'newsletter.description', label: 'Description', type: 'textarea' },
          { key: 'newsletter.placeholder', label: 'Placeholder', type: 'input' },
          { key: 'newsletter.subscribe', label: 'Subscribe Button', type: 'input' },
          { key: 'newsletter.subscribedMessage', label: 'Subscribed Message', type: 'textarea' },
        ],
      },
      topics: {
        label: 'Topics',
        fields: [
          { key: 'topics.all', label: 'All', type: 'input' },
          { key: 'topics.governance', label: 'Governance', type: 'input' },
          { key: 'topics.growth', label: 'Growth', type: 'input' },
          { key: 'topics.impact', label: 'Impact', type: 'input' },
          { key: 'topics.risk', label: 'Risk', type: 'input' },
          { key: 'topics.strategy', label: 'Strategy', type: 'input' },
        ],
      },
    },
  },
  analysis: {
    label: 'Data & Analysis',
    sections: {
      page: {
        label: 'Page Header',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'pageSubtitle', label: 'Page Subtitle', type: 'input' },
          { key: 'pageDescription', label: 'Page Description', type: 'textarea' },
          { key: 'introText', label: 'Intro Text', type: 'textarea' },
          { key: 'footerNote', label: 'Footer Note', type: 'textarea' },
        ],
      },
      dataBenchmarks: {
        label: 'Data & Benchmarks',
        fields: [
          { key: 'dataBenchmarks.title', label: 'Section Title', type: 'input' },
          { key: 'dataBenchmarks.description', label: 'Section Description', type: 'textarea' },
          { key: 'dataBenchmarks.benchmark.title', label: 'Benchmark — Title', type: 'input' },
          { key: 'dataBenchmarks.benchmark.description', label: 'Benchmark — Description', type: 'textarea' },
          { key: 'dataBenchmarks.dataset.title', label: 'Dataset — Title', type: 'input' },
          { key: 'dataBenchmarks.dataset.description', label: 'Dataset — Description', type: 'textarea' },
          { key: 'dataBenchmarks.commission.title', label: 'Commission — Title', type: 'input' },
          { key: 'dataBenchmarks.commission.description', label: 'Commission — Description', type: 'textarea' },
          { key: 'dataBenchmarks.cta', label: 'CTA Button', type: 'input' },
        ],
      },
      categories: {
        label: 'Categories',
        fields: [
          { key: 'categories.all', label: 'All', type: 'input' },
          { key: 'categories.governance', label: 'Governance', type: 'input' },
          { key: 'categories.growth', label: 'Growth', type: 'input' },
          { key: 'categories.impact', label: 'Impact', type: 'input' },
          { key: 'categories.performance', label: 'Performance', type: 'input' },
          { key: 'categories.risk', label: 'Risk', type: 'input' },
          { key: 'categories.strategy', label: 'Strategy', type: 'input' },
        ],
      },
    },
  },
  book: {
    label: 'Consultation',
    sections: {
      page: {
        label: 'Page Header',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'pageDescription', label: 'Page Description', type: 'textarea' },
        ],
      },
      trustIndicators: {
        label: 'Trust Indicators',
        fields: [
          { key: 'trustIndicators.confidential', label: 'Confidential', type: 'input' },
          { key: 'trustIndicators.reviewed', label: 'Reviewed', type: 'input' },
          { key: 'trustIndicators.timezone', label: 'Timezone', type: 'input' },
          { key: 'reviewNote', label: 'Review Note', type: 'textarea' },
        ],
      },
      form: {
        label: 'Form Labels',
        fields: [
          { key: 'form.fullName', label: 'Full Name', type: 'input' },
          { key: 'form.email', label: 'Email Address', type: 'input' },
          { key: 'form.organisation', label: 'Organisation', type: 'input' },
          { key: 'form.role', label: 'Role / Position', type: 'input' },
          { key: 'form.challengeQuestion', label: 'Challenge Question', type: 'textarea' },
          { key: 'form.outcomeQuestion', label: 'Outcome Question', type: 'textarea' },
          { key: 'form.submit', label: 'Submit Button', type: 'input' },
        ],
      },
      success: {
        label: 'Success Messages',
        fields: [
          { key: 'success.title', label: 'Success Title', type: 'input' },
          { key: 'success.message', label: 'Success Message', type: 'textarea' },
          { key: 'toast.successTitle', label: 'Toast Title', type: 'input' },
          { key: 'toast.successMessage', label: 'Toast Message', type: 'textarea' },
        ],
      },
    },
  },
  submit: {
    label: 'Submit Perspective',
    sections: {
      page: {
        label: 'Page Header',
        fields: [
          { key: 'pageTitle', label: 'Page Title', type: 'input' },
          { key: 'pageDescription', label: 'Page Description', type: 'textarea' },
        ],
      },
      reward: {
        label: 'Monthly Reward',
        fields: [
          { key: 'reward.title', label: 'Reward Title', type: 'input' },
          { key: 'reward.description', label: 'Reward Description', type: 'textarea' },
        ],
      },
      form: {
        label: 'Form Labels',
        fields: [
          { key: 'form.sectionTitle', label: 'Section Title', type: 'input' },
          { key: 'form.name', label: 'Name', type: 'input' },
          { key: 'form.email', label: 'Email', type: 'input' },
          { key: 'form.organisation', label: 'Organisation', type: 'input' },
          { key: 'form.perspectiveLabel', label: 'Perspective Label', type: 'input' },
          { key: 'form.submit', label: 'Submit Button', type: 'input' },
        ],
      },
      guidelines: {
        label: 'Submission Guidelines',
        fields: [
          { key: 'guidelines.title', label: 'Guidelines Title', type: 'input' },
          { key: 'guidelines.g1', label: 'Guideline 1', type: 'input' },
          { key: 'guidelines.g2', label: 'Guideline 2', type: 'input' },
          { key: 'guidelines.g3', label: 'Guideline 3', type: 'input' },
          { key: 'guidelines.g4', label: 'Guideline 4', type: 'input' },
        ],
      },
      topics: {
        label: 'Topics',
        fields: [
          { key: 'topics.governance', label: 'Governance', type: 'input' },
          { key: 'topics.impact', label: 'Impact', type: 'input' },
          { key: 'topics.growth', label: 'Growth', type: 'input' },
          { key: 'topics.strategy', label: 'Strategy', type: 'input' },
          { key: 'topics.risk', label: 'Risk', type: 'input' },
          { key: 'topics.finance', label: 'Finance', type: 'input' },
          { key: 'topics.other', label: 'Other', type: 'input' },
        ],
      },
    },
  },
};

export interface Perspective {
  id: string;
  title: string;
  summary: string;
  topic: 'Governance' | 'Impact' | 'Growth' | 'Strategy' | 'Risk';
  featured?: boolean;
  image?: string;
  content: string[];
}

export const perspectives: Perspective[] = [
  {
    id: 'governance-as-strategic-lever',
    title: 'Governance as a Strategic Lever',
    summary: 'How board structures shape organisational capacity for long-term decision-making.',
    topic: 'Governance',
    featured: true,
    content: [
      "Governance is often treated as a compliance function—a set of structures designed to ensure accountability and mitigate risk. This framing, while not incorrect, understates the strategic potential of governance architecture. When designed with intention, governance becomes a lever for shaping how an organisation thinks, decides, and adapts over time.",
      "The composition of a board is not merely a matter of representation or expertise. It is a design choice that determines the range of perspectives available when consequential decisions arise. A board composed primarily of operational leaders will naturally gravitate toward efficiency and execution. A board weighted toward external perspectives may prioritise reputation and stakeholder relations.",
      "Meeting cadence and information flow are similarly consequential. Boards that meet infrequently and receive highly synthesised information are structurally positioned to ratify rather than interrogate. Those with more frequent touchpoints and access to granular data can engage more substantively—but risk becoming operational rather than strategic.",
      "Perhaps most importantly, governance structures determine how dissent is surfaced and processed. Organisations that treat disagreement as a signal of dysfunction will systematically suppress the information most valuable for course correction.",
      "The most effective governance architectures we have observed share a common characteristic: they are designed with explicit awareness of their own influence on organisational behaviour."
    ]
  },
  {
    id: 'impact-beyond-measurement',
    title: 'Impact Beyond Measurement',
    summary: 'Why the most significant outcomes often resist quantification—and what that means for strategy.',
    topic: 'Impact',
    content: [
      "The contemporary emphasis on measurement has yielded genuine benefits: greater accountability, more rigorous evaluation, and a common language for discussing outcomes. Yet the primacy of quantification has also created blind spots.",
      "Consider the concept of institutional strengthening. When an organisation invests in building the capacity of partner institutions—improving their governance, developing their leaders—the benefits compound over decades. But these contributions are extraordinarily difficult to attribute and quantify.",
      "Similar dynamics apply to prevention. Interventions that avert crises produce outcomes that are, by definition, non-events. We can estimate what might have occurred, but we cannot observe it directly.",
      "The implications for strategy are significant. Organisations that optimise primarily for measurable outcomes will naturally under-invest in activities whose returns are real but resistant to quantification.",
      "A more balanced approach requires holding measurement in productive tension with judgment. Metrics inform but do not determine strategic choice."
    ]
  },
  {
    id: 'risk-appetite-in-mission-driven-orgs',
    title: 'Risk Appetite in Mission-Driven Organisations',
    summary: 'Balancing institutional preservation with the imperative to create meaningful change.',
    topic: 'Risk',
    content: [
      "Mission-driven organisations occupy a distinctive position in the risk landscape. Unlike commercial enterprises, where risk-taking is instrumentally connected to financial returns, these institutions face a more complex calculus.",
      "The natural tendency is toward risk aversion. Institutional memory accumulates cautionary tales; governance structures emphasise fiduciary responsibility; stakeholders often reward stability over ambition.",
      "Yet excessive caution carries its own risks. Organisations that consistently avoid substantive bets may find themselves increasingly irrelevant—technically solvent but strategically marginal.",
      "Developing an appropriate risk appetite requires clarity about what the organisation is ultimately for. If the mission demands systemic change, then strategies capable of producing systemic outcomes must be on the table.",
      "The most effective leaders cultivate calibrated courage: the willingness to accept meaningful risk in service of important objectives, paired with the discipline to structure that risk-taking thoughtfully."
    ]
  },
  {
    id: 'the-long-view-on-growth',
    title: 'The Long View on Growth',
    summary: 'Sustainable expansion as a function of clarity, not ambition.',
    topic: 'Growth',
    content: [
      "Growth is frequently treated as an unambiguous good—a sign of organisational vitality, a validation of strategy. This framing contains truth but also significant peril.",
      "The most sustainable growth we have observed emerges not from ambition but from alignment. Organisations that expand effectively have achieved genuine clarity about what they do distinctively well.",
      "Clarity of this kind requires discipline. Many organisations struggle to articulate precisely what they do better than alternatives—or they offer lists of capabilities rather than a coherent account of distinctive value.",
      "The temporal dimension is equally important. Sustainable growth typically requires building capacity ahead of demand—investing in systems, people, and infrastructure before they are urgently needed.",
      "The long view on growth treats expansion not as a metric to be maximised but as a strategic choice to be made deliberately—in service of mission, grounded in clarity, and paced by capacity."
    ]
  },
  {
    id: 'strategic-patience',
    title: 'Strategic Patience',
    summary: 'The discipline of waiting for conditions to align before committing resources.',
    topic: 'Strategy',
    content: [
      "Contemporary strategy discourse often emphasises action: speed, agility, decisiveness. These qualities matter, but they represent only half of strategic capability.",
      "Strategic patience is not passivity. It is an active stance characterised by continuous monitoring, preparation, and readiness to act when circumstances shift.",
      "This posture is particularly valuable in complex systems where the relationship between action and outcome is non-linear. The timing of an intervention often matters as much as its substance.",
      "Cultivating strategic patience requires managing internal pressures that favour action. Stakeholders often expect visible activity; staff prefer the sense of momentum that comes with implementation.",
      "The most strategically adept organisations combine both capabilities: the agility to act swiftly when opportunity presents, and the patience to wait deliberately when conditions are unfavourable."
    ]
  },
  {
    id: 'institutional-memory',
    title: 'Institutional Memory and Continuity',
    summary: 'How organisations preserve wisdom across leadership transitions.',
    topic: 'Governance',
    content: [
      "Organisations face a fundamental challenge: the individuals who comprise them are transient, while the institution is intended to persist. This creates the problem of institutional memory.",
      "The conventional mechanisms are familiar: documentation, procedures, governance structures, and cultural transmission. Yet these mechanisms are often inadequate.",
      "The most consequential institutional memory is often tacit rather than explicit. It resides in the judgment of experienced practitioners—their sense of what works in this specific context.",
      "Leadership transitions represent moments of acute vulnerability. When senior leaders depart, they take with them not only explicit knowledge but also tacit understanding accumulated over years.",
      "Organisations that manage this challenge well invest intentionally in knowledge transfer during transitions, creating extended overlap periods and structured handover processes."
    ]
  },
];

export const perspectiveTopics = ['All', 'Governance', 'Impact', 'Growth', 'Strategy', 'Risk'] as const;

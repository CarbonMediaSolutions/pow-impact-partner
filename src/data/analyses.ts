export interface Analysis {
  id: string;
  title: string;
  summary: string;
  category: 'Capital Allocation' | 'Governance' | 'Performance' | 'Operations' | 'Impact';
  date?: string;
  featured?: boolean;
  content: {
    introduction: string;
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    methodology?: string;
    keyFindings?: string[];
    implications?: string[];
  };
}

export const analyses: Analysis[] = [
  {
    id: 'capital-allocation-frameworks',
    title: 'Capital Allocation Frameworks for Mission-Driven Organisations',
    summary: 'An examination of how leading institutions balance financial sustainability with programmatic investment, including trade-off matrices and decision protocols.',
    category: 'Capital Allocation',
    featured: true,
    date: '2024',
    content: {
      introduction: 'Capital allocation in mission-driven organisations presents a distinctive set of challenges. Unlike commercial enterprises, where return on capital provides a common denominator for investment decisions, these institutions must balance financial sustainability against programmatic objectives that often resist quantification. This analysis examines how leading organisations have developed frameworks for navigating these trade-offs.',
      sections: [
        {
          heading: 'The Core Tension',
          paragraphs: [
            'Every mission-driven organisation faces a fundamental tension: resources allocated to building financial reserves are resources not deployed toward current programmatic activity. The appropriate balance between these priorities depends on factors including time horizon, risk tolerance, and the specific nature of the mission.',
            'Our examination of 35 organisations across the philanthropic, social enterprise, and institutional sectors reveals significant variation in how this tension is resolved. Reserve ratios range from 3 months to 36 months of operating expenses; investment allocations span from entirely conservative to meaningfully aggressive portfolios.'
          ]
        },
        {
          heading: 'Framework Components',
          paragraphs: [
            'The most effective capital allocation frameworks we observed share several structural elements. First, they establish explicit principles that articulate the organisation\'s philosophy regarding financial sustainability and mission investment. These principles provide guidance for specific decisions while allowing for contextual judgment.',
            'Second, they create decision protocols that specify how different categories of allocation decisions are made—who is involved, what information is required, and what thresholds trigger escalation. These protocols reduce decision cost while maintaining appropriate oversight.',
            'Third, they incorporate scenario planning that stress-tests allocation strategies against plausible adverse conditions. This discipline helps organisations avoid the common failure mode of optimising for expected conditions while remaining vulnerable to downside scenarios.'
          ]
        },
        {
          heading: 'Trade-off Matrices',
          paragraphs: [
            'Several organisations have developed explicit trade-off matrices that make visible the opportunity costs of different allocation choices. These tools typically plot potential investments along dimensions such as mission impact, financial return, risk level, and time horizon.',
            'The value of such matrices lies not in the precision of their inputs—which are often uncertain—but in the discipline they impose on decision-making. By requiring explicit consideration of multiple dimensions, they reduce the tendency to optimise narrowly and surface trade-offs that might otherwise remain implicit.'
          ]
        }
      ],
      methodology: 'This analysis draws on structured interviews with 35 organisations, review of internal policy documents where available, and comparative analysis of public financial disclosures. Organisations span the philanthropic, social enterprise, and institutional non-profit sectors.',
      keyFindings: [
        'Organisations with explicit allocation frameworks demonstrate greater consistency in decision-making across leadership transitions',
        'Reserve ratios show no correlation with organisational age but significant correlation with board composition',
        'Scenario planning is present in fewer than 40% of organisations examined, despite its demonstrated value',
        'Decision protocols that specify escalation thresholds reduce time-to-decision by an average of 3 weeks'
      ],
      implications: [
        'Investment in developing explicit allocation frameworks yields returns in decision quality and institutional continuity',
        'Board education on capital allocation trade-offs merits greater attention than it typically receives',
        'Scenario planning should be treated as a core governance discipline rather than an occasional exercise'
      ]
    }
  },
  {
    id: 'board-effectiveness-study',
    title: 'Board Effectiveness in Complex Environments',
    summary: 'A structured review of governance practices across 40 organisations, identifying patterns that correlate with strategic clarity and execution.',
    category: 'Governance',
    date: '2024',
    content: {
      introduction: 'Governance effectiveness is frequently discussed but rarely measured with rigour. This study examines governance practices across 40 organisations operating in complex, dynamic environments, seeking to identify patterns that correlate with observable measures of strategic clarity and execution capability.',
      sections: [
        {
          heading: 'Defining Effectiveness',
          paragraphs: [
            'Governance effectiveness is not a single construct. Our analysis distinguishes between several dimensions: strategic oversight (the board\'s capacity to engage meaningfully with strategic choices), fiduciary stewardship (the discharge of legal and financial responsibilities), and generative contribution (the board\'s role in shaping organisational direction and culture).',
            'Different organisations weight these dimensions differently, depending on their circumstances. A mature organisation with established strategy may prioritise fiduciary stewardship; an organisation facing strategic discontinuity may require more generative contribution.'
          ]
        },
        {
          heading: 'Patterns of Effectiveness',
          paragraphs: [
            'Several patterns emerge from our analysis. First, board composition matters—but not in the ways commonly assumed. Diversity of perspective correlates more strongly with effectiveness than diversity of sector background. Boards composed of individuals who think differently outperform those composed of individuals from different industries who think similarly.',
            'Second, meeting structure proves surprisingly consequential. Boards that allocate meaningful time to substantive discussion—as opposed to information transmission—demonstrate higher engagement and more effective oversight. The ratio of presentation time to discussion time serves as a useful diagnostic.',
            'Third, the relationship between board chair and chief executive functions as a critical determinant. Relationships characterised by mutual respect, clear role boundaries, and regular informal communication correlate with higher effectiveness across all dimensions.'
          ]
        },
        {
          heading: 'Structural Enablers',
          paragraphs: [
            'Beyond composition and dynamics, several structural factors enable governance effectiveness. Regular board education—on sector trends, governance best practices, and organisational context—correlates with more substantive engagement. Thoughtful committee structures that align authority with expertise improve decision quality. And deliberate attention to board succession—treating it as strategically as executive succession—maintains institutional capability across transitions.'
          ]
        }
      ],
      methodology: 'The study employed a mixed-methods approach combining structured governance assessments, interviews with board chairs and chief executives, and analysis of board meeting documentation. Effectiveness measures included stakeholder assessments, strategic plan execution metrics, and comparative organisational performance indicators.',
      keyFindings: [
        'Cognitive diversity correlates more strongly with effectiveness than demographic or sectoral diversity',
        'Boards spending more than 60% of meeting time on presentations show systematically lower engagement',
        'Chair-CEO relationship quality predicts overall governance effectiveness with 0.72 correlation',
        'Organisations with formal board education programs demonstrate measurably higher strategic engagement'
      ],
      implications: [
        'Board recruitment should prioritise thinking style diversity alongside other considerations',
        'Meeting design warrants as much attention as meeting content',
        'Investment in Chair-CEO relationship development yields high returns in governance quality'
      ]
    }
  },
  {
    id: 'performance-metrics-social-sector',
    title: 'Performance Metrics in the Social Sector',
    summary: 'Evaluating the validity and utility of common performance indicators, with recommendations for more meaningful measurement approaches.',
    category: 'Performance',
    date: '2024',
    content: {
      introduction: 'The social sector has invested heavily in performance measurement over the past two decades. This analysis evaluates the validity and practical utility of commonly used metrics, identifying where measurement serves genuine accountability and where it may create distortions.',
      sections: [
        {
          heading: 'The Measurement Landscape',
          paragraphs: [
            'Contemporary social sector organisations typically track a hierarchy of metrics: outputs (activities completed, beneficiaries reached), outcomes (changes in condition or behaviour), and—less commonly—impact (longer-term, attributable effects). Each level presents distinct measurement challenges.',
            'Output metrics are relatively straightforward to collect but provide limited information about value creation. Outcome metrics offer greater insight but face challenges of attribution and timing. Impact metrics, while most meaningful, require methodological sophistication that exceeds most organisations\' capacity.'
          ]
        },
        {
          heading: 'Validity Concerns',
          paragraphs: [
            'Our review identifies several recurring validity concerns. First, many commonly used metrics suffer from weak construct validity—they measure something, but not necessarily what they purport to measure. Satisfaction surveys, for example, often capture politeness and accessibility rather than genuine service quality.',
            'Second, metrics frequently lack predictive validity. They describe past performance without reliably indicating future results. An organisation\'s output metrics may remain stable while its underlying effectiveness deteriorates, with the divergence becoming apparent only with delay.',
            'Third, the act of measurement itself creates distortions. When metrics become targets, organisations optimise for the metric rather than the underlying objective—a dynamic Goodhart\'s Law describes. This is particularly problematic when metrics capture only part of the value an organisation creates.'
          ]
        },
        {
          heading: 'Toward More Meaningful Measurement',
          paragraphs: [
            'More effective measurement approaches share several characteristics. They combine quantitative metrics with qualitative assessment, using stories and cases to illuminate what numbers cannot capture. They incorporate longer time horizons, accepting that meaningful outcomes often unfold over years rather than quarters. And they attend to negative indicators—tracking harms and failures as carefully as successes.'
          ]
        }
      ],
      methodology: 'This analysis synthesises a review of measurement practices across 50 social sector organisations, evaluation of metric validity through statistical analysis where data permitted, and structured interviews with evaluation professionals and organisational leaders.',
      keyFindings: [
        'Fewer than 25% of commonly used metrics demonstrate acceptable construct validity',
        'Organisations measuring impact typically allocate 8-12% of program budgets to evaluation',
        'Qualitative methods remain underutilised despite evidence of their explanatory value',
        'Metric-gaming behaviours are present in most organisations but rarely acknowledged'
      ],
      implications: [
        'Measurement portfolios should be reviewed for validity before expansion',
        'Investment in qualitative assessment capacity may yield higher returns than additional quantitative metrics',
        'Evaluation should be designed with metric-gaming risks explicitly considered'
      ]
    }
  },
  {
    id: 'operational-resilience',
    title: 'Operational Resilience Under Constraint',
    summary: 'How organisations maintain effectiveness during periods of resource scarcity, drawing on case evidence from the past decade.',
    category: 'Operations',
    date: '2023',
    content: {
      introduction: 'Resource constraints are endemic to mission-driven organisations. This analysis examines how organisations maintain operational effectiveness during periods of significant scarcity, identifying patterns that distinguish those that emerge strengthened from those that suffer lasting damage.',
      sections: [
        {
          heading: 'Patterns of Response',
          paragraphs: [
            'Organisations respond to resource constraints through several mechanisms: reducing scope (doing less), reducing quality (doing worse), reducing cost (doing more efficiently), or generating additional resources. Our analysis suggests that sequencing and combination of these responses significantly affects outcomes.',
            'Organisations that move immediately to scope reduction often sacrifice their most distinctive activities—those that justify their existence but resist simple efficiency improvement. Those that first exhaust efficiency gains and only then consider scope changes tend to preserve core capability while shedding peripheral activities.'
          ]
        },
        {
          heading: 'Structural Factors',
          paragraphs: [
            'Several structural factors correlate with resilience under constraint. First, financial reserves provide obvious buffer capacity—but their value depends on willingness to deploy them. Organisations with substantial reserves that treat them as untouchable gain little benefit; those that define clear conditions for reserve deployment maintain operational capacity when it matters.',
            'Second, cost structure flexibility matters. Organisations with high fixed costs face more severe adjustment challenges than those with variable cost structures. This argues for deliberate attention to cost structure design during periods of abundance.',
            'Third, relationship capital proves surprisingly important. Organisations with strong stakeholder relationships—funders, partners, beneficiaries—often find that these relationships become sources of resilience during scarcity, providing patience, flexibility, and sometimes additional resources.'
          ]
        },
        {
          heading: 'Leadership Behaviours',
          paragraphs: [
            'Leadership behaviours during constraint periods shape organisational trajectories. Leaders who communicate openly about challenges while maintaining focus on mission tend to preserve staff engagement. Those who oscillate between denial and alarm often trigger departures of key personnel.',
            'Decision-making processes also matter. Organisations that involve staff in identifying efficiency opportunities and prioritising scope reductions tend to implement changes more effectively than those that impose decisions from above. The quality of decisions may be similar, but implementation quality diverges significantly.'
          ]
        }
      ],
      methodology: 'This analysis draws on case studies of 18 organisations that experienced significant resource constraints (defined as 20%+ reduction in operating budget) between 2013 and 2023, supplemented by comparative analysis of organisations that maintained stability during the same period.',
      keyFindings: [
        'Organisations that prioritise efficiency before scope reduction show higher recovery rates',
        'Reserve deployment policies prove as important as reserve levels',
        'Variable cost structures provide resilience advantages averaging 15% in adjusted operational capacity',
        'Staff involvement in constraint decisions correlates with higher implementation quality'
      ],
      implications: [
        'Cost structure should be actively managed as a strategic variable',
        'Reserve policies should specify deployment conditions, not merely accumulation targets',
        'Constraint response should be treated as an organisational capability requiring development'
      ]
    }
  },
  {
    id: 'impact-attribution-methods',
    title: 'Impact Attribution Methods',
    summary: 'A comparative analysis of approaches to attributing outcomes to interventions, with attention to methodological rigour and practical applicability.',
    category: 'Impact',
    date: '2023',
    content: {
      introduction: 'Attributing observed outcomes to specific interventions remains one of the most challenging problems in social sector evaluation. This analysis compares available methodological approaches, assessing their rigour, feasibility, and appropriateness for different contexts.',
      sections: [
        {
          heading: 'The Attribution Problem',
          paragraphs: [
            'Attribution is challenging because outcomes are typically influenced by multiple factors, many of which are not under the organisation\'s control. A literacy program may operate alongside improving school quality, changing economic conditions, and shifting family dynamics. Disentangling the program\'s specific contribution requires methodological approaches that can isolate its effects from these confounding influences.',
            'The gold standard—randomised controlled trials—addresses this challenge through random assignment, ensuring that treatment and control groups differ only in their exposure to the intervention. But randomisation is often impractical, unethical, or prohibitively expensive in social sector contexts.'
          ]
        },
        {
          heading: 'Alternative Approaches',
          paragraphs: [
            'Several alternative approaches offer varying degrees of rigour. Quasi-experimental designs—including difference-in-differences, regression discontinuity, and instrumental variables—can approximate experimental conditions when natural variation exists in exposure to interventions. These methods require technical sophistication but can yield credible estimates when their assumptions are met.',
            'Theory-based evaluation offers a different approach, tracing causal chains from activities through outputs to outcomes and testing whether observed patterns match theoretical predictions. This method is less demanding in terms of data requirements but depends heavily on the quality of the underlying theory.',
            'Contribution analysis explicitly acknowledges that attribution with certainty is often impossible, instead building a case for contribution through systematic consideration of alternative explanations. This approach may be more honest about uncertainty but provides less precise estimates.'
          ]
        },
        {
          heading: 'Choosing Approaches',
          paragraphs: [
            'The appropriate choice among methods depends on several factors: the stakes involved (higher stakes warrant more rigorous methods), the nature of the intervention (some are more amenable to experimental evaluation than others), available resources, and the uses to which findings will be put.',
            'We observe that many organisations default to the methods most readily available—typically simple before-after comparisons—without considering whether these methods are appropriate for their questions. Investing in methodological capacity, or partnering with those who have it, typically yields more credible and useful findings.'
          ]
        }
      ],
      methodology: 'This analysis synthesises methodological literature, reviews of evaluation practice across 30 organisations, and structured interviews with evaluation specialists. Assessments of rigour draw on established standards from the evaluation field.',
      keyFindings: [
        'Fewer than 15% of organisations employ quasi-experimental methods capable of supporting attribution claims',
        'Theory-based approaches are underutilised despite their appropriateness for complex interventions',
        'Methodological choices often reflect capacity constraints rather than fit with evaluation questions',
        'Investment in evaluation partnerships offers superior returns to building internal capacity for most organisations'
      ],
      implications: [
        'Methodological choice should be driven by the nature of the question, not organisational habit',
        'Partnerships with evaluation specialists may be more efficient than building internal capacity',
        'Organisations should be explicit about the limits of their attribution claims given methods employed'
      ]
    }
  },
  {
    id: 'governance-transition-patterns',
    title: 'Governance Transition Patterns',
    summary: 'Examining how organisations navigate leadership succession and board renewal while preserving institutional continuity.',
    category: 'Governance',
    date: '2023',
    content: {
      introduction: 'Leadership transitions represent moments of both opportunity and vulnerability for organisations. This analysis examines patterns in how organisations navigate successions of chief executives and board members, identifying practices that correlate with successful transitions.',
      sections: [
        {
          heading: 'CEO Transitions',
          paragraphs: [
            'Chief executive transitions follow several distinct patterns. Planned successions—where the departure is anticipated and a search process conducted deliberately—yield different outcomes than emergency transitions triggered by unexpected departures. Our analysis suggests that the quality of the transition process matters more than whether the successor is internal or external.',
            'The transition period itself—from announcement through the first year of new leadership—is characterised by distinct phases. The interregnum (between announcement and arrival) requires particular attention to maintain momentum and prevent drift. The first 90 days establish patterns that prove difficult to change subsequently. And the period from 90 days to one year typically reveals whether the transition will ultimately succeed.'
          ]
        },
        {
          heading: 'Board Renewal',
          paragraphs: [
            'Board transitions are typically less dramatic than CEO changes but cumulatively as consequential. The composition of the board evolves through individual additions and departures, and the aggregate effect of these changes shapes governance capacity over time.',
            'Organisations that approach board renewal strategically—defining needed competencies, cultivating relationships with potential directors, managing term limits deliberately—maintain stronger governance capability than those that address vacancies reactively. Yet strategic board renewal remains surprisingly uncommon.'
          ]
        },
        {
          heading: 'Preserving Continuity',
          paragraphs: [
            'The challenge of transitions is preserving what matters while enabling what needs to change. Organisations that manage this balance effectively typically invest in explicit knowledge transfer—creating structured handover processes that go beyond document review. They maintain touchpoints with departing leaders during the transition period. And they distinguish between institutional commitments that should be honoured and inherited practices that may merit reconsideration.',
            'The role of the board during CEO transitions warrants particular attention. Boards must simultaneously provide stability for the organisation and support for the incoming leader, while maintaining appropriate oversight during a period of elevated risk. This requires a level of engagement that exceeds normal governance rhythms.'
          ]
        }
      ],
      methodology: 'This analysis draws on detailed case studies of 22 CEO transitions and structured review of board renewal practices across 35 organisations, supplemented by interviews with board chairs, chief executives, and executive search professionals.',
      keyFindings: [
        'Planned transitions show 40% higher success rates than emergency transitions',
        'Internal vs. external successor origin shows no correlation with transition success once process quality is controlled',
        'Organisations with formal board renewal processes maintain higher governance effectiveness scores',
        'Extended overlap periods (3+ months) correlate with smoother transitions but are present in fewer than 20% of cases'
      ],
      implications: [
        'Investment in succession planning yields measurable returns in transition quality',
        'Board renewal should be treated as strategically as executive succession',
        'Transition process design merits as much attention as candidate selection'
      ]
    }
  },
];

export const analysisCategories = [
  'All',
  'Capital Allocation',
  'Governance',
  'Performance',
  'Operations',
  'Impact',
] as const;

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

export const analyses: Analysis[] = [];

export const analysisCategories = ['All', 'Capital Allocation', 'Governance', 'Performance', 'Operations', 'Impact'] as const;

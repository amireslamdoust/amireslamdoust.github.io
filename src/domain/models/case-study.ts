export type CaseStudySlug =
  | 'shared-frontend-platform'
  | 'ai-agent-tooling'
  | 'saas-products';

export interface CaseStudySummary {
  readonly slug: CaseStudySlug;
  readonly title: string;
  readonly cardTitle: string;
  readonly context: string;
  readonly tags: readonly string[];
  readonly outcomeLine: string;
  readonly order: number;
}

export interface CaseStudyDetail extends CaseStudySummary {
  readonly pageTitle: string;
  readonly summary: string;
  readonly problem: string;
  readonly constraints: string;
  readonly approach: string;
  readonly outcome: string;
  readonly roleHonesty?: string;
  readonly limits?: string;
  readonly tech: readonly string[];
  readonly diagramId?: 'platform' | 'agents';
}

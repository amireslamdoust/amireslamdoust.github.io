import type { CaseStudyDetail, CaseStudySummary } from '../models/case-study';
import type {
  EducationEntry,
  ExperienceEntry,
  SkillGroup,
  SpeakingEntry,
} from '../models/experience';
import type { PersonIdentity } from '../models/identity';

export interface ContentQueryPort {
  identity(): PersonIdentity;
  caseStudySummaries(): readonly CaseStudySummary[];
  caseStudyBySlug(slug: string): CaseStudyDetail | undefined;
  experience(): readonly ExperienceEntry[];
  skills(): readonly SkillGroup[];
  speaking(): SpeakingEntry;
  education(): EducationEntry;
}

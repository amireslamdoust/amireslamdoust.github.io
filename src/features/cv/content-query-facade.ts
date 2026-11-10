import type { CaseStudyDetail, CaseStudySummary } from '@domain/models/case-study';
import type {
  EducationEntry,
  ExperienceEntry,
  SkillGroup,
  SpeakingEntry,
} from '@domain/models/experience';
import type { PersonIdentity } from '@domain/models/identity';
import type { ContentQueryPort } from '@domain/ports/content-query-port';
import {
  AMIR_IDENTITY,
  CASE_STUDIES,
  EDUCATION,
  EXPERIENCE,
  SKILLS,
  SPEAKING,
} from '@content/site-content';

/** Content access facade — pages depend on ContentQueryPort, not raw modules. */
export class ContentQueryFacade implements ContentQueryPort {
  identity(): PersonIdentity {
    return AMIR_IDENTITY;
  }

  caseStudySummaries(): readonly CaseStudySummary[] {
    return [...CASE_STUDIES]
      .sort((a, b) => a.order - b.order)
      .map(({ slug, title, cardTitle, context, tags, outcomeLine, order }) => ({
        slug,
        title,
        cardTitle,
        context,
        tags,
        outcomeLine,
        order,
      }));
  }

  caseStudyBySlug(slug: string): CaseStudyDetail | undefined {
    return CASE_STUDIES.find((study) => study.slug === slug);
  }

  experience(): readonly ExperienceEntry[] {
    return EXPERIENCE;
  }

  skills(): readonly SkillGroup[] {
    return SKILLS;
  }

  speaking(): SpeakingEntry {
    return SPEAKING;
  }

  education(): EducationEntry {
    return EDUCATION;
  }
}

export const contentQuery = new ContentQueryFacade();

export interface ExperienceEntry {
  readonly id: string;
  readonly title: string;
  readonly employer: string;
  readonly startLabel: string;
  readonly endLabel: string;
  readonly location: string;
  readonly blurb?: string;
  readonly bullets: readonly string[];
  readonly current?: boolean;
}

export interface SpeakingEntry {
  readonly title: string;
  readonly event: string;
  readonly year: number;
}

export interface EducationEntry {
  readonly degree: string;
  readonly school: string;
  readonly years: string;
}

export interface SkillGroup {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

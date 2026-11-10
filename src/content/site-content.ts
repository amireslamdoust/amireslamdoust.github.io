import type { CaseStudyDetail } from '@domain/models/case-study';
import type {
  EducationEntry,
  ExperienceEntry,
  SkillGroup,
  SpeakingEntry,
} from '@domain/models/experience';
import { AMIR_IDENTITY } from '@domain/models/identity';

export const ABOUT_PARAGRAPHS = [
  `I'm a Senior Frontend and Full-Stack engineer in Berlin, with about 12 years of work across the stack. At Kollex, a B2B beverage-ordering platform, I have been the technical lead for three frontends — Backoffice, Merchant Center, and a promotions micro frontend — and I built the shared platform packages behind six main applications, including a multi-theme component library with Storybook.`,
  `I also designed and built an internal AI-agent developer-tooling platform with MCP servers, agent roles, a skill system, and a recorded human review gate that CI and the installer both enforce. Alongside employed work, I have designed, built and shipped two SaaS products solo, including Stripe payments.`,
  `I speak English at a full professional level, German at an elementary level, and Persian natively. I presented “Micro Frontends: From Savior to Dragon — Our Journey” at Code Europe 2026.`,
] as const;

export const POSITIONING =
  "I'm a Senior Frontend and Full-Stack engineer in Berlin, with about 12 years across the stack. At Kollex I have been the technical lead for three frontends and the shared platform behind six applications — including a multi-theme design system — and I built an internal AI-agent developer-tooling platform with a human review gate before anything installs.";

export const CASE_STUDIES: readonly CaseStudyDetail[] = [
  {
    slug: 'shared-frontend-platform',
    order: 1,
    cardTitle: 'A shared frontend platform and multi-theme design system',
    title: 'Building the shared frontend platform behind six applications',
    pageTitle: 'Shared frontend platform — Amir Eslamdoust',
    context: 'Kollex · Senior Frontend Engineer · Apr 2021–present',
    tags: [
      'React',
      'TypeScript',
      'Design systems',
      'Storybook',
      'Micro frontends',
      'OpenAPI',
    ],
    outcomeLine:
      'Led the platform behind six main frontends, cut integration time by 60%, and raised delivery velocity by 25%.',
    summary:
      'At Kollex I was the technical lead for three frontends — Backoffice, Merchant Center, and the promotions micro frontend — and I built the shared packages those teams (and others) depend on. I made most of the architecture decisions and did the main implementation, with teams growing around the work. I worked with about five teams while the platform grew from 500 to 5,000+ active customers.',
    problem:
      'Several frontend applications needed to look and behave like one product, without blocking each other or rewriting everything at once. Duplicated UI, uneven quality, and contract drift would have made every integration slower and every visual change riskier.',
    constraints:
      'This was not a greenfield redesign. Teams had to keep shipping. The platform grew substantially during this period. Any architecture change had to be incremental and reversible enough to live with.',
    approach:
      'I invested in shared platform packages: a multi-theme component library with tests and documentation in Storybook, a shared JavaScript library for analytics and tracking, an OpenAPI-generated TypeScript client, and end-to-end test suites. I moved the API layer from GraphQL back to REST with OpenAPI contracts, and I introduced micro frontends with Module Federation and domain-driven packages. The point was not a rewrite. It was a clearer contract and a design system the products could actually adopt.',
    outcome:
      'Integration time fell by 60%, and delivery velocity rose by 25%. We cut support tickets by 30% by finding and fixing root causes rather than treating symptoms. On promotions, the team reached a 4-day median cycle time and 5.2 deploys per week in its first 12 weeks. I set a quality bar of 90%+ unit coverage, 100% integration coverage for endpoints, and Cypress tests in CI.',
    roleHonesty:
      'My official title is Senior Frontend Engineer. The lead scope is real — architecture decisions, main implementation, interviewing almost all frontend hires, and informal mentoring — but I do not present this as a formal Staff or Engineering Manager role.',
    limits:
      'I do not republish internal product UI. Architecture diagrams on this site are original schematics, not employer screenshots.',
    tech: [
      'React',
      'TypeScript',
      'Storybook',
      'Design tokens',
      'Module Federation',
      'OpenAPI',
      'REST',
      'Jest',
      'Cypress',
      'Datadog',
      'Sentry',
    ],
    diagramId: 'platform',
  },
  {
    slug: 'ai-agent-tooling',
    order: 2,
    cardTitle: 'An internal AI-agent platform with a human review gate',
    title: 'Making coding agents usable — and safe — for an engineering organisation',
    pageTitle: 'AI-agent tooling — Amir Eslamdoust',
    context: 'Kollex · Internal developer tooling',
    tags: ['MCP', 'Agent tooling', 'CI', 'Security', 'TypeScript', 'DX'],
    outcomeLine:
      'Designed and built the platform used across engineering teams that write code, with a recorded human review that CI and the installer both enforce.',
    summary:
      'I designed and built an internal AI-agent developer-tooling platform and rolled it out across the engineering organisation. It is not a chat demo. It is a set of contracts, roles, skills and install rules that let teams use coding agents without giving up review.',
    problem:
      'Coding agents are useful, and they are also good at making changes nobody can explain. The hard part is not calling a model. The hard part is giving an organisation shared context, clear roles, and a safety rule that still holds when someone is in a hurry.',
    constraints:
      'Credentials and third-party tools could not be handled casually. Install paths had to be enforceable in CI, not only in a wiki. Different teams would use different agent engines, so the contract had to sit above a single vendor.',
    approach:
      'The platform has two MCP servers: one for shared memory, and one with read-only integrations to Jira, Datadog, GitHub, Figma and Miro, with locked-down credential handling. Eight agent roles run across Claude Code, Codex, Copilot and Gemini, with policy-enforced read/write access per role. A tiered skill system and an AGENTS.md contract describe how agents are supposed to work. The most important rule is the reviewed-decision gate: nothing installs without a recorded human review, and both CI and the installer refuse to proceed without it. I ran this as an internal product, with a plugin marketplace, auto-update, and SHA-versioned releases.',
    outcome:
      'Engineering teams that write code use the skill-based platform. The safety rule is enforced in tooling, not only in documentation: CI and the installer both require a recorded human review before anything installs. I am not publishing an adoption percentage or a time-saved metric.',
    roleHonesty:
      'This is internal tooling. I cannot show private prompts, credentials, or customer data. The public write-up is an illustration of the idea, not a copy of the internal system.',
    limits:
      'No internal repo names, credentials, or proprietary prompts appear on this site.',
    tech: [
      'MCP',
      'Agent roles',
      'CI enforcement',
      'Plugin packaging',
      'GitHub',
      'Claude Code',
      'Codex',
      'Copilot',
      'Gemini',
    ],
    diagramId: 'agents',
  },
  {
    slug: 'saas-products',
    order: 3,
    cardTitle: 'SaaS products I designed and shipped solo',
    title: 'Designing, building and shipping SaaS products on my own',
    pageTitle: 'Solo SaaS products — Amir Eslamdoust',
    context: 'Independent',
    tags: ['Full-stack', 'Stripe', 'Product', 'TypeScript'],
    outcomeLine:
      'I built the backend, the frontend, and Stripe payments myself, and I shipped the products, not just prototypes.',
    summary:
      'Alongside my employed work, I have designed and built two SaaS products solo. For both, I owned the backend, the frontend, and Stripe payments, and I took them to a shipped state.',
    problem:
      'I wanted to own a product end to end, including the unglamorous parts — accounts, billing, and production operations — not only the interface.',
    constraints:
      'One person, so the stack and the scope had to stay small enough to operate. Payments had to be real, not a mocked checkout.',
    approach:
      'I designed and implemented the product surfaces and the backend, and I integrated Stripe for the payment flow (front and back). On one personal project I also built a small personalized assistant feature that recommended actions from a user’s profile and behavioural history. That feature is real, and it is a feature, not an AI platform.',
    outcome:
      'The products shipped with real payment flows. I am not publishing revenue, user counts, or product names.',
    limits:
      'Product names stay private. Diagrams stay generic on purpose.',
    tech: ['TypeScript', 'Node.js', 'React', 'Stripe', 'AWS'],
  },
] as const;

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'kollex',
    title: 'Senior Frontend Engineer',
    employer: 'Kollex',
    startLabel: 'Apr 2021',
    endLabel: 'present',
    location: 'Berlin, Germany',
    blurb:
      'B2B beverage-ordering platform (joint venture of Coca-Cola, Bitburger, Krombacher, Chef Culinar)',
    current: true,
    bullets: [
      'Technical lead for three frontends (Backoffice, Merchant Center, promotions) and the shared platform behind six applications, including a multi-theme component library.',
      'Built an internal AI-agent developer-tooling platform (MCP servers, agent roles, skill system) with a recorded human review gate enforced in CI and in the installer.',
      'Worked with about five teams while the platform grew from 500 to 5,000+ active customers.',
    ],
  },
  {
    id: 'lendis',
    title: 'Full Stack Engineer',
    employer: 'Lendis',
    startLabel: 'Aug 2019',
    endLabel: 'Mar 2021',
    location: 'Berlin, Germany',
    bullets: [
      'Full-stack work on a Laravel backend (Django alongside) and the React frontend, in a team of three.',
      'Salesforce integration, a backoffice app for Sales and Logistics, Algolia search with access levels, a WordPress-to-Gatsby marketing site, and the introduction of GCP.',
    ],
  },
  {
    id: 'bookingkit',
    title: 'Full Stack Engineer',
    employer: 'Bookingkit',
    startLabel: 'Oct 2018',
    endLabel: 'Jul 2019',
    location: 'Berlin, Germany',
    bullets: [
      'Raised SLA from below 70% to 100%.',
      'Italian VAT reporting and a SumUp POS integration on a PHP backend; kept the booking widget working down to IE6.',
    ],
  },
  {
    id: 'parand',
    title: 'Software Engineer, Team Lead',
    employer: 'Parand Tech Group',
    startLabel: 'May 2017',
    endLabel: 'Sep 2018',
    location: 'Tehran, Iran',
    bullets: [
      'Tech lead with 4–5 engineers across remote teams in Denmark and the UK, including 1:1s.',
      'Replaced a legacy MVC system with Laravel + Angular for a multi-lingual product.',
    ],
  },
  {
    id: 'laitec',
    title: 'Senior Full Stack Engineer',
    employer: 'Sharif University of Technology (LAITEC)',
    startLabel: 'Jun 2016',
    endLabel: 'Apr 2017',
    location: 'Tehran, Iran',
    bullets: [
      'Turned an offline university registration system into an online platform; introduced PHPUnit + phpmd quality checks and CI/CD.',
    ],
  },
  {
    id: 'anetwork',
    title: 'Software Engineer',
    employer: 'Anetwork',
    startLabel: 'Oct 2014',
    endLabel: 'May 2016',
    location: 'Tehran, Iran',
    bullets: [
      'Built HTML5 ads, migrated the platform to Laravel, and built a Socket.IO support chat.',
    ],
  },
] as const;

export const SKILLS: readonly SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Design systems',
      'Storybook',
      'Micro frontends',
      'TanStack Query',
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Node.js', 'NestJS', 'REST', 'OpenAPI', 'GraphQL', 'Socket.IO'],
  },
  {
    id: 'ai',
    label: 'AI tooling',
    items: [
      'MCP servers',
      'Agent roles & skills',
      'Review gates',
      'Claude Code / Codex / Copilot / Gemini',
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    items: ['AWS', 'Terraform', 'Docker Compose', 'GitHub Actions', 'CI/CD'],
  },
  {
    id: 'quality',
    label: 'Quality & observability',
    items: ['Jest', 'Cypress', 'Datadog', 'Sentry', 'PostHog'],
  },
  {
    id: 'payments',
    label: 'Payments',
    items: ['Mollie', 'SumUp', 'Stripe'],
  },
] as const;

export const SPEAKING: SpeakingEntry = {
  title: 'Micro Frontends: From Savior to Dragon — Our Journey',
  event: 'Code Europe',
  year: 2026,
};

export const EDUCATION: EducationEntry = {
  degree: 'BSc Information Technology (Multimedia)',
  school: 'University of Tabriz',
  years: '2010–2014',
};

export const LANGUAGES_LINE =
  'English (full professional) · German (elementary) · Persian (native)';

export { AMIR_IDENTITY };

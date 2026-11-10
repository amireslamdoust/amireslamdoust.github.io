export interface ContactLinks {
  readonly email: string;
  readonly linkedIn: string;
}

export interface PersonIdentity {
  readonly fullName: string;
  readonly monogram: string;
  readonly roleLine: string;
  readonly location: string;
  readonly experienceYearsLabel: string;
  readonly contact: ContactLinks;
}

export const AMIR_IDENTITY = {
  fullName: 'Amir Eslamdoust',
  monogram: 'AE',
  roleLine: 'Senior Frontend / Full-Stack Engineer',
  location: 'Berlin, Germany',
  experienceYearsLabel: '12 years experience',
  contact: {
    email: 'amireslamdoust@gmail.com',
    linkedIn: 'https://linkedin.com/in/amireslamdoust',
  },
} as const satisfies PersonIdentity;

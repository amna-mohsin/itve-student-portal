export type Course = {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  pricePerMonth: number;
  durationMonths: number;
  venue: string;
  progressPercent: number;
  coverImage: string;
};

export const COURSES: Course[] = [
  {
    id: 'python-ai',
    category: 'Science',
    title: 'Python for AI',
    subtitle: 'Very good course for beginners…',
    pricePerMonth: 5000,
    durationMonths: 2,
    venue: 'NED University of Eng & Tech',
    progressPercent: 8.33,
    coverImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=60',
  },
  {
    id: 'quantum-physics',
    category: 'Science',
    title: 'Quantum Physics',
    subtitle: 'Theoretical | 4 chapters',
    pricePerMonth: 150,
    durationMonths: 3,
    venue: 'Main Campus',
    progressPercent: 0,
    coverImage:
      'https://images.unsplash.com/photo-1520975693411-b535d4b774f2?auto=format&fit=crop&w=1600&q=60',
  },
  {
    id: 'advanced-math',
    category: 'Math',
    title: 'Advanced Math',
    subtitle: 'Visual Calculus',
    pricePerMonth: 120,
    durationMonths: 3,
    venue: 'Online',
    progressPercent: 0,
    coverImage:
      'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1600&q=60',
  },
  {
    id: 'ml-intro',
    category: 'AI Engineering',
    title: 'Intro to Machine Learning',
    subtitle: 'Beginner track',
    pricePerMonth: 250,
    durationMonths: 2,
    venue: 'Lab 3',
    progressPercent: 0,
    coverImage:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=60',
  },
];



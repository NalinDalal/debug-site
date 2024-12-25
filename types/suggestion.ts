export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'certification' | 'note' | 'event';
  link: string;
}


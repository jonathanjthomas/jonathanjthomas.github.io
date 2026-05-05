import type { Education } from '@/lib/types'

export const educationData: Education = {
  id: 'heriot-watt',
  university: 'Heriot-Watt University Dubai',
  degree: 'BSc (Hons)',
  field: 'Computer Science (Artificial Intelligence)',
  year: 'Graduated',
  achievements: [
    {
      id: 'university-prizes',
      title: 'University Prizes',
      description:
        'Academic distinction awards recognizing top performance across key stages of the degree program.',
      icon: 'award',
    },
    {
      id: 'systems-consultants-prize',
      title: 'Systems Consultants Ltd. Prize',
      description:
        'Industry-sponsored prize awarded for excellence in practical systems thinking and impactful technical delivery.',
      icon: 'trophy',
    },
  ],
  position: { x: -2.2, y: 0.2, z: -4.8 },
}

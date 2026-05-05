import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'agentic-search',
    title: 'Agentic Search Assistant',
    description:
      'A multi-agent retrieval and synthesis assistant that combines semantic search, tool routing, and grounded responses.',
    technologies: ['TypeScript', 'LangGraph', 'Vector DB', 'Next.js'],
    github: 'https://github.com/jonathanjthomas/agentic-search-assistant',
    position: { x: -3.2, y: 1.1, z: -8.4 },
  },
  {
    id: 'ranking-lab',
    title: 'Ranking Experiment Lab',
    description:
      'Offline and online experimentation suite for ranking models with evaluation pipelines, feature stores, and model diagnostics.',
    technologies: ['Python', 'XGBoost', 'PyTorch', 'Airflow'],
    github: 'https://github.com/jonathanjthomas/ranking-lab',
    position: { x: 1.8, y: 1.9, z: -10.6 },
  },
  {
    id: 'vision-inspector',
    title: 'Vision QA Inspector',
    description:
      'Computer-vision powered quality-inspection workflow with weak supervision and active-learning assisted labeling.',
    technologies: ['PyTorch', 'OpenCV', 'FastAPI', 'Docker'],
    github: 'https://github.com/jonathanjthomas/vision-qa-inspector',
    position: { x: 4.3, y: -0.1, z: -9.3 },
  },
  {
    id: 'real-time-features',
    title: 'Real-Time Feature Fabric',
    description:
      'Low-latency feature pipeline architecture for personalization and decisioning workloads in high-throughput systems.',
    technologies: ['Kafka', 'Flink', 'Redis', 'Go'],
    github: 'https://github.com/jonathanjthomas/realtime-feature-fabric',
    position: { x: -0.8, y: -1.4, z: -11.4 },
  },
]

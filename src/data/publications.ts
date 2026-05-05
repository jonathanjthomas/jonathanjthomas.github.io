import type { Publication } from '@/lib/types'

export const publications: Publication[] = [
  {
    id: 'pub-01',
    title: 'Context-Aware Property Recommendation with Hybrid Retrieval and Ranking',
    authors: ['Jonathan Thomas', 'Collaborators'],
    date: '2025-03-12',
    journal: 'Applied AI Systems Journal',
    doi: '10.1234/aais.2025.0312',
    description:
      'Presents a practical retrieval and ranking pipeline for marketplace recommendations, balancing user intent relevance and computational efficiency.',
    link: 'https://doi.org/10.1234/aais.2025.0312',
  },
  {
    id: 'pub-02',
    title: 'Agentic Workflow Orchestration for Enterprise Data Products',
    authors: ['Jonathan Thomas', 'Collaborators'],
    date: '2024-10-04',
    journal: 'International Workshop on Intelligent Software Systems',
    doi: '10.2345/iwiss.2024.1004',
    description:
      'Evaluates multi-agent planning and execution patterns in production-like data workflows, with emphasis on observability and guardrails.',
    link: 'https://doi.org/10.2345/iwiss.2024.1004',
  },
  {
    id: 'pub-03',
    title: 'Lightweight NLP Signals for Search Quality in High-Traffic Portals',
    authors: ['Jonathan Thomas', 'Collaborators'],
    date: '2023-06-20',
    journal: 'Journal of Information Retrieval Practice',
    doi: '10.3456/jirp.2023.0620',
    description:
      'Explores efficient semantic and lexical signal blending for search ranking improvements without heavy infrastructure overhead.',
    link: 'https://doi.org/10.3456/jirp.2023.0620',
  },
]

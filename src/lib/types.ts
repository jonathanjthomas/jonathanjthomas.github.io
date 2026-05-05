/**
 * Core TypeScript types and interfaces for the portfolio
 */

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  position: {
    x: number
    y: number
    z: number
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon?: string
}

export interface Education {
  id: string
  university: string
  degree: string
  field: string
  year: string
  achievements: Achievement[]
  position?: {
    x: number
    y: number
    z: number
  }
}

export interface Publication {
  id: string
  title: string
  authors: string[]
  date: string
  journal: string
  doi: string
  pdfThumbnail?: string
  description: string
  link?: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  thumbnail?: string
  position: {
    x: number
    y: number
    z: number
  }
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export type Section = 'hero' | 'experience' | 'education' | 'publications' | 'projects' | 'footer'
